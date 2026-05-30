import React, { useEffect, useRef } from 'react';

const fonts = ['Arial', 'Georgia', 'Helvetica', 'Times New Roman', 'Verdana'];

export function RichTextEditor({ value, onChange, minHeight = 140 }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== (value || '')) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const emitChange = () => {
    onChange(editorRef.current?.innerHTML || '');
  };

  const runCommand = (command, commandValue = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    emitChange();
  };

  return (
    <div className="rich-editor">
      <div className="rich-editor-toolbar" aria-label="Herramientas de texto">
        <select
          className="form-select form-select-sm rich-editor-select"
          defaultValue=""
          onChange={(e) => {
            if (e.target.value) runCommand('fontName', e.target.value);
            e.target.value = '';
          }}
        >
          <option value="">Tipografia</option>
          {fonts.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
        <select
          className="form-select form-select-sm rich-editor-select"
          defaultValue=""
          onChange={(e) => {
            if (e.target.value) runCommand('fontSize', e.target.value);
            e.target.value = '';
          }}
        >
          <option value="">Tamano</option>
          <option value="2">Pequeño</option>
          <option value="3">Normal</option>
          <option value="5">Grande</option>
          <option value="7">Titulo</option>
        </select>
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => runCommand('bold')}>
          B
        </button>
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => runCommand('italic')}>
          I
        </button>
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => runCommand('underline')}>
          U
        </button>
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => runCommand('insertUnorderedList')}>
          Lista
        </button>
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => runCommand('justifyLeft')}>
          Izq.
        </button>
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => runCommand('justifyCenter')}>
          Centro
        </button>
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => runCommand('justifyRight')}>
          Der.
        </button>
      </div>
      <div
        ref={editorRef}
        className="form-control rich-editor-surface"
        contentEditable
        suppressContentEditableWarning
        onInput={emitChange}
        onBlur={emitChange}
        style={{ minHeight }}
        role="textbox"
        aria-multiline="true"
      />
    </div>
  );
}
