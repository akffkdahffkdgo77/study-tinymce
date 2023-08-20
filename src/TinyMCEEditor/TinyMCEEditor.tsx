import { useEffect, useState } from 'react';

import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyEditor } from 'tinymce';

import { customOptions, defaultOptions } from './options';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    onInit: (editor: TinyEditor) => void;
    isMobile: boolean;
    isDisabled: boolean;
    initialValue: string;
    maxLength?: number;
    onDirty?: (isDirty: boolean) => void;
}

export default function TinyMCEEditor(props: Props) {
    const { isMobile, isDisabled, initialValue = '', maxLength, onInit, onDirty, ...rest } = props;
    const [disabled, setDisabled] = useState(false);
    const [value, setValue] = useState('');

    // 에디터 mount / unmount를 하지 않는 경우 disabled 상태가 변경되지 않음
    // 내부 상태로 사용해서 props로 받아오는 isDisabled값이 변경되었을 경우 업데이트하도록 useEffect로 관리
    useEffect(() => {
        if (!isDisabled && disabled) {
            setDisabled(false);
        }
    }, [isDisabled, disabled]);

    return (
        <div {...rest}>
            <Editor
                tinymceScriptSrc={`${process.env.PUBLIC_URL}/tinymce/tinymce.min.js`}
                // 같은 페이지에서 화면 사이즈에 맞게 options를 변경하고 싶을 경우
                // 컴포넌트가 새로 생성되도록 key 변경
                key={isMobile ? 'editor-mobile' : 'editor'}
                disabled={disabled}
                init={{
                    ...(isMobile ? defaultOptions : customOptions),
                    file_picker_callback: (callback, _filePickerValue, meta) => {
                        // file picker callback을 정의해야 이미지 업로드 기능 사용 가능
                        const input = document.createElement('input') as HTMLInputElement;
                        input.setAttribute('type', 'file');
                        if (meta.filetype === 'image') {
                            input.setAttribute('accept', '.jpeg,.jpg,.png');
                        }
                        input.onchange = () => {
                            const { files } = input;
                            if (files) {
                                const reader = new FileReader();
                                reader.onloadend = async () => {
                                    const formData = new FormData();
                                    formData.append('file', files[0]);
                                    // TODO: file upload API
                                    // FIXME: callback(file url, {alt : files[0].name})
                                    callback(reader.result as string, { alt: files[0].name });
                                };
                                reader.readAsDataURL(files[0]);
                            }
                        };
                        input.click();
                    },
                    setup(editor) {
                        // 영상 - 링크 embed만 가능하도록 Embed 탭 없애기
                        editor.on('ExecCommand', (event) => {
                            const { command } = event;
                            if (command === 'mceMedia') {
                                const tabElements = document.querySelectorAll('div[role="tablist"] .tox-tab');
                                tabElements.forEach((tab) => {
                                    const element = tab as HTMLElement;
                                    if (element.innerText === 'Embed') {
                                        element.style.display = 'none';
                                    }
                                });
                            }
                        });
                    }
                }}
                initialValue={initialValue}
                onInit={(_evt, editor) => {
                    onInit(editor);
                    // Editor load 후에 disabled 상태 처리
                    if (isDisabled) {
                        setDisabled(true);
                    }
                }}
                value={value}
                onEditorChange={(editorValue, editor) => {
                    // 최대 글자 수 설정하는 방법
                    if (maxLength) {
                        const wordCount = editor.plugins.wordcount.body.getCharacterCount();
                        if (wordCount <= maxLength) {
                            setValue(editorValue);
                            // 에디터 값 변경 여부
                            if (onDirty) {
                                onDirty(Boolean(editorValue.length > 0));
                            }
                        }
                    } else if (onDirty) {
                        setValue(editorValue);
                        onDirty(Boolean(editorValue.length > 0));
                    }
                }}
                onBeforeAddUndo={(event, editor) => {
                    // 최대 글자수 설정
                    if (maxLength) {
                        const wordCount = editor.plugins.wordcount.body.getCharacterCount();
                        if (wordCount > maxLength) {
                            event.preventDefault();
                        }
                    }
                }}
            />
        </div>
    );
}
