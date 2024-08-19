import React, { useState, useCallback } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

const SatoriEditor = ({ content, onChange }) => {
  const [editorState, setEditorState] = useState(EditorState.createWithContent(content));

  const handleChange = useCallback((state) => {
    setEditorState(state);
    onChange(state.getCurrentContent().getPlainText());
  }, [onChange]);

  const handleKeyCommand = useCallback((command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }, [handleChange]);

  const toggleInlineStyle = useCallback((style) => {
    handleChange(RichUtils.toggleInlineStyle(editorState, style));
  }, [editorState, handleChange]);

  return (
    <div className="flex-grow p-4">
      <div className="mb-4">
        <button onClick={() => toggleInlineStyle('BOLD')} className="mr-2">B</button>
        <button onClick={() => toggleInlineStyle('ITALIC')} className="mr-2">I</button>
        <button onClick={() => toggleInlineStyle('UNDERLINE')}>U</button>
      </div>
      <Editor
        editorState={editorState}
        onChange={handleChange}
        handleKeyCommand={handleKeyCommand}
      />
    </div>
  );
};

export default SatoriEditor;
