import React, {useRef}from 'react';
import JoditEditor from 'jodit-react';

const TextEditor = ({setText}) => {
    const editor = useRef(null);
    return <JoditEditor 
    ref={editor} onChange={(content) =>setText(content)} />
}

export default TextEditor;