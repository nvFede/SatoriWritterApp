import React from 'react';

const Toolbar = ({ onBold, onItalic, onUnderline }) => {
  return (
    <div className="editor-toolbar mb-4">
      <button onClick={onBold}>B</button>
      <button onClick={onItalic}>I</button>
      <button onClick={onUnderline}>U</button>
    </div>
  );
};

export default Toolbar;
