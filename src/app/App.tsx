import { useRef, useState } from 'react';
import { Editor as TinyEditor } from 'tinymce';
import TinyMCEEditor from 'TinyMCEEditor';
import parse from 'html-react-parser';

function App() {
    const editorRef = useRef<TinyEditor | null>(null);
    const [editorValue, setEditorValue] = useState('');
    const [isDirty, setIsDirty] = useState(false);

    const handleClick = () => {
        if (editorRef.current) {
            setEditorValue(editorRef.current.getContent());
        }
    };

    const handleDirty = (isEditorDirty: boolean) => {
        if (isEditorDirty !== isDirty) {
            setIsDirty(isEditorDirty);
        }
    };

    return (
        <div className="mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center gap-5">
            <TinyMCEEditor
                className="w-full max-w-3xl"
                onInit={(editor) => {
                    editorRef.current = editor;
                }}
                isMobile={false}
                initialValue="Hello!"
                isDisabled={false}
                maxLength={100}
                onDirty={handleDirty}
            />
            <div className="flex flex-col">
                <button type="button" className="h-12 w-[250px] rounded-md border" onClick={handleClick}>
                    Submit
                </button>
                <div className="h-full min-h-[450px] flex-1 p-5">{parse(editorValue)}</div>
            </div>
        </div>
    );
}

export default App;
