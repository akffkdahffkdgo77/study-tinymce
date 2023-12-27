<img src="https://capsule-render.vercel.app/api?section=header&type=waving&height=300&text=Study%20Editor&color=timeGradient&fontSize=90" alt="" />

## 프로젝트 실행
**node** 18.17.1

```
yarn install
yarn start
```

## 프로젝트 데모

<img width="1500" alt="데모" src="https://github.com/akffkdahffkdgo77/study-tinymce/assets/52883505/59573440-85b5-4241-ba47-f0772eb8e151">

## TIL

### Editor 기본 스타일

#### Editor Content Style

1. **`content_css`** 설정   
   public 폴더에 content.css 파일을 추가한 다음 css 작성
   
```json
{
    "content_css": "/content.css",
}
```

```css
/* Editor Content CSS */
body {
    width: 728px;
    padding-left: 0px !important;
    padding-right: 0px !important;
    margin: 20px 20px 0;
    font-family: Arial, Helvetica, sans-serif;
}
```

2. **`content_style`** 사용

```json
{
    "content_style": "body { margin: 20px; font-family: Helvetica,Arial,sans-serif; font-size: 16px; line-height: 20px; }"
}
```

#### Editor 높이 설정

고정된 높이를 사용하고 싶지 않으면 **`plugins`** 에 **`autoresize`** 추가해야 함

```json
{
    "plugins": ["autoresize"],
    "height": "100%",
    "min_height": 500,
    "autoresize_min_height": 500,
    "autoresize_bottom_margin": 80
}
```

### Editor Toolbar

#### Sticky Toolbar

sticky header가 있는 경우 **`toolbar_sticky_offset`** 을 header height만큼 주면 됨

```json
{
    "toolbar_sticky": true,
    "toolbar_sticky_offset": 0
}
```

#### Mobile Toolbar Configuration

**`toolbar_mode`** 를 `floating`으로 설정할 경우 overflow 아이콘이 노출됨

```json
{
    "mobile": {
        "toolbar_mode": "floating",
        "toolbar_sticky": true
    }
}
```

### Font

#### Font Size

폰트 사이즈 변경을 지원해야 한다면 toolbar에 **`fontsize`** 추가한 다음 **`font_size_formats`** 옵션 수정   
`px`를 사용하고 싶다면 **`font_size_input_default_unit`** 을 `px`로 변경

```json
{
    "toolbar": "fontsize",
    "font_size_formats": "8px 12px 16px 18px 20px",
    "font_size_input_default_unit": "px"
}
```

#### Font Family

서체 변경 옵션은 **`font_family_formats`** 을 사용

```json
{
    "toolbar": "fontfamily",
    "font_family_formats": "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats"
}
```

#### Block Formats

텍스트 스타일 변경 기능을 지원할 경우 toolbar에 **`blocks`** 추가   

formats의 `styles`를 사용하면 inline style이 적용됨   
반응형이라면 inline style이 적용되지 않도록 formats을 설정해야 함   
styles를 사용하지 않고 formats의 `preview`와 attributes의 `class`를 사용

**preview 적용했을 경우**   
<img width="172" alt="스크린샷 2023-08-20 오후 6 20 38" src="https://github.com/akffkdahffkdgo77/study-tinymce/assets/52883505/df007a56-da58-44cf-abc3-eedcc103fc4b">


```json
{
    "toolbar": "blocks",
    "block_formats": "제목=h3; 본문=body; 캡션=caption; 인용=quote;",
    "formats": {
        "h3": {
            "preview": "font-family:Helvetica,Arial,sans-serif;font-size:28px;font-weight:700;line-height:32px;letter-spacing:0px;",
            "block": "h3",
            "attributes": { "class": "tinymce-editor-title" }
        },
        "body": {
            "preview": "font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:20px;letter-spacing:0px;",
            "block": "p",
            "attributes": { "class": "tinymce-editor-contents" }
        },
        "caption": {
            "preview": "font-family:Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;line-height:14px;letter-spacing:0px;",
            "block": "div",
            "attributes": { "class": "tinymce-editor-caption" }
        },
        "quote": {
            "preview": "font-family:Helvetica,Arial,sans-serif;font-size:32px;font-weight:800;line-height:48px;letter-spacing:0px;",
            "block": "div",
            "attributes": { "class": "tinymce-editor-quote" }
        }
    }
}
```

### Image / Media

#### Image

**`plugins`** 에 **`image`** 가 추가되어 있어야 함   
File Picker를 사용한다면 **`file_picker_callback`** 설정해줘야 함 ([참고](https://www.tiny.cloud/docs/tinymce/6/file-image-upload/#interactive-example))

```json
{
    "plugins": ["image"],
    "file_picker_types": "image",
    "images_file_types": "jpeg jpg png",
    "image_caption": false,
    "image_dimensions": false,
    "image_description": false,
    "object_resizing": false
}
```

```jsx
<Editor
    init={{
        file_picker_callback: (callback, _filePickerValue, meta) => {
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
        }
    }}
/>
```

#### Media (Embed)

**`plugins`** 에 **`media`** 가 추가되어 있어야 함   
`링크 embed`만 지원하고 싶을 경우 **`file_picker_types`** 에 `image`만 추가   
고정된 사이즈만 지원할 경우 **`object_resizing`** 을 `false`로 설정

```json
{
    "plugins": ["media"],
    "media_live_embeds": true,
    "media_alt_source": false,
    "media_poster": false,
    "media_dimensions": false,
    "file_picker_types": "image",
    "object_resizing": false
}
```

### Mobile <-> PC

mount된 상태에서 화면 사이즈에 맞게 options를 변경하고 싶을 경우 컴포넌트가 새로 생성될 수 있도록 key 변경 ([참고](https://react.dev/reference/react/useState#resetting-state-with-a-key))

```jsx
<Editor
    tinymceScriptSrc={`${process.env.PUBLIC_URL}/tinymce/tinymce.min.js`}
    key={isMobile ? 'editor-mobile' : 'editor'}
/>
```

### Plugins

#### 링크

**`plugins`** 에 **`link`** 가 추가되어 있어야 함   
**`link_target_list`** 를 `false`로 설정하면 **`link_default_target`** 에서 설정한 방식으로 링크 생성

```json
{
    "plugins": ["link"],
    "link_target_list": false,
    "link_default_target": "_blank",
    "link_title": false
}
```

#### 글자 수 제한

**`plugins`** 에 **`wordcount`** 가 추가되어 있어야 함 ([참고](https://www.tiny.cloud/docs/tinymce/6/wordcount/#api))

```json
{
    "plugins": ["wordcount"]
}
```

```jsx
<Editor
    value={value}
    onEditorChange={(editorValue, editor) => {
        // 글자 수 제한
        if (maxLength) {
            const wordCount = editor.plugins.wordcount.body.getCharacterCount();
            if (wordCount <= maxLength) {
                setValue(editorValue);
            }
        }
    }}
    onBeforeAddUndo={(event, editor) => {
        // 글자 수 제한
        if (maxLength) {
            const wordCount = editor.plugins.wordcount.body.getCharacterCount();
            if (wordCount > maxLength) {
                event.preventDefault();
            }
        }
    }}
/>
```

## TinyMCE Documentations

-  [Installation](https://www.tiny.cloud/docs/tinymce/6/react-pm-host/)
-  [Content Formatting](https://www.tiny.cloud/docs/tinymce/6/user-formatting-options/#block_formats)
-  [File Picker Callback](https://www.tiny.cloud/docs/tinymce/6/file-image-upload/#interactive-example)
-  [onBeforeAddUndo](https://www.tiny.cloud/docs/tinymce/6/react-ref/#example-limited-length-controlled-component)
