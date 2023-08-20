import { RawEditorOptions } from 'tinymce';

export type EditorInitOptions =
    | (RawEditorOptions & {
          selector?: undefined;
          target?: undefined;
      })
    | undefined;

export const defaultOptions: EditorInitOptions = {
    height: 500,
    plugins: [
        'advlist',
        'autolink',
        'lists',
        'link',
        'image',
        'charmap',
        'anchor',
        'searchreplace',
        'visualblocks',
        'code',
        'fullscreen',
        'insertdatetime',
        'media',
        'table',
        'preview',
        'help',
        'wordcount'
    ],
    toolbar: 'undo redo | blocks | ' + 'bold italic forecolor | alignleft aligncenter ' + 'alignright alignjustify | bullist numlist outdent indent | ' + 'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }'
};

export const customOptions: EditorInitOptions = {
    mobile: {
        toolbar_mode: 'floating',
        toolbar_sticky: true
    },
    toolbar_sticky: true,
    toolbar_sticky_offset: 0,
    height: '100%',
    min_height: 500,
    autoresize_min_height: 500,
    autoresize_bottom_margin: 80,
    placeholder: '내용을 입력해 주세요',
    toolbar: 'fontfamily | blocks | bold italic underline forecolor |' + 'image media link hr | ' + 'alignleft aligncenter alignright alignjustify',
    menubar: false,
    resize: false,
    statusbar: true,
    elementpath: false,
    plugins: ['wordcount', 'autoresize', 'autolink', 'link', 'image', 'media'],
    content_css: '/content.css',
    content_style: 'body { margin: 20px; font-family: Helvetica,Arial,sans-serif; font-size: 16px; line-height: 20px; }',
    forced_root_block_attrs: { class: 'tinymce-editor-content' },
    font_size_input_default_unit: 'px',
    font_family_formats:
        'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats',
    block_formats: '제목=h3; 본문=body; 캡션=caption; 인용=quote;',
    formats: {
        h3: {
            preview: 'font-family:Helvetica,Arial,sans-serif;font-size:28px;font-weight:700;line-height:32px;letter-spacing:0px;',
            block: 'h3',
            attributes: { class: 'tinymce-editor-title' }
        },
        body: {
            preview: 'font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:20px;letter-spacing:0px;',
            block: 'p',
            attributes: { class: 'tinymce-editor-contents' }
        },
        caption: {
            preview: 'font-family:Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;line-height:14px;letter-spacing:0px;',
            block: 'div',
            attributes: { class: 'tinymce-editor-caption' }
        },
        quote: {
            preview: 'font-family:Helvetica,Arial,sans-serif;font-size:32px;font-weight:800;line-height:48px;letter-spacing:0px;',
            block: 'div',
            attributes: { class: 'tinymce-editor-quote' }
        }
    },
    style_formats_merge: false,
    color_cols: 5,
    color_map: ['000000', 'Black', '808080', 'Gray', 'FFFFFF', 'White', 'FF0000', 'Red', 'FFFF00', 'Yellow', '008000', 'Green', '0000FF', 'Blue'],
    media_live_embeds: true,
    media_alt_source: false,
    media_poster: false,
    media_dimensions: false,
    file_picker_types: 'image',
    images_file_types: 'jpeg jpg png',
    image_caption: false,
    image_dimensions: false,
    image_description: false,
    object_resizing: false,
    link_target_list: false,
    link_default_target: '_blank',
    link_title: false
};
