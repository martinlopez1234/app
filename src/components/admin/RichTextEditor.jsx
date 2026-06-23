import React, { useEffect, useRef, useState } from 'react';

const fonts = ['Arial', 'Georgia', 'Calibri', 'Times New Roman', 'Verdana'];
const alignmentCommands = {
  justifyLeft: 'left',
  justifyCenter: 'center',
  justifyRight: 'right',
  justifyFull: 'justify',
};

export function RichTextEditor({ value, onChange, minHeight = 140 }) {
  const editorRef = useRef(null);
  const savedRangeRef = useRef(null);
  const [selectedFont, setSelectedFont] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== (value || '')) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const editorContainsRange = (range) => {
    if (!editorRef.current || !range) return false;
    return editorRef.current.contains(range.commonAncestorContainer);
  };

  const saveSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    if (editorContainsRange(range)) {
      savedRangeRef.current = range.cloneRange();
    }
  };

  const hasSelectedText = () =>
    editorContainsRange(savedRangeRef.current) && !savedRangeRef.current.collapsed;

  const ensureBlockContent = () => {
    const editor = editorRef.current;
    if (!editor || !editor.innerHTML.trim()) return;

    const hasBlock = Array.from(editor.children).some((child) =>
      ['DIV', 'P', 'UL', 'OL', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(child.tagName)
    );

    if (!hasBlock) {
      editor.innerHTML = `<div>${editor.innerHTML}</div>`;
    }
  };

  const restoreOrSelectContent = () => {
    const editor = editorRef.current;
    if (!editor) return;

    const selection = window.getSelection();
    selection.removeAllRanges();

    if (hasSelectedText()) {
      selection.addRange(savedRangeRef.current);
      return;
    }

    const range = document.createRange();
    range.selectNodeContents(editor);
    selection.addRange(range);
    savedRangeRef.current = range.cloneRange();
  };

  const emitChange = () => {
    onChange(editorRef.current?.innerHTML || '');
  };

  const applyAlignmentToEditor = (align) => {
    ensureBlockContent();
    const editor = editorRef.current;
    const blocks = Array.from(editor.children);

    if (blocks.length) {
      blocks.forEach((block) => {
        block.style.textAlign = align;
      });
    } else {
      editor.style.textAlign = align;
    }

    emitChange();
  };

  const runCommand = (command, commandValue = null) => {
    if (alignmentCommands[command] && !hasSelectedText()) {
      applyAlignmentToEditor(alignmentCommands[command]);
      return;
    }

    if (alignmentCommands[command]) {
      ensureBlockContent();
    }

    restoreOrSelectContent();
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    saveSelection();
    emitChange();
  };

  const onFontChange = (font) => {
    if (!font) return;
    setSelectedFont(font);
    runCommand('fontName', font);
  };

  const onSizeChange = (size) => {
    if (!size) return;
    setSelectedSize(size);
    runCommand('fontSize', size);
  };

  const toolbarButtonProps = (command) => ({
    type: 'button',
    className: 'btn btn-sm btn-outline-secondary',
    onMouseDown: (event) => event.preventDefault(),
    onClick: () => runCommand(command),
  });

  return (
    <div className="rich-editor">
      <div className="rich-editor-toolbar" aria-label="Herramientas de texto">
        <select
          className="form-select form-select-sm rich-editor-select"
          value={selectedFont}
          onChange={(event) => onFontChange(event.target.value)}
        >
          <option value="">Tipografía</option>
          {fonts.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
        <select
          className="form-select form-select-sm rich-editor-select"
          value={selectedSize}
          onChange={(event) => onSizeChange(event.target.value)}
        >
          <option value="">Tamaño</option>
          <option value="2">Pequeño</option>
          <option value="3">Normal</option>
          <option value="4">Grande</option>
          <option value="5">Más grande</option>
        </select>
        <button {...toolbarButtonProps('bold')}>B</button>
        <button {...toolbarButtonProps('italic')}>I</button>
        <button {...toolbarButtonProps('underline')}>U</button>
        <button {...toolbarButtonProps('insertUnorderedList')}>Lista</button>
        <button {...toolbarButtonProps('justifyLeft')}>Izq.</button>
        <button {...toolbarButtonProps('justifyCenter')}>Centro</button>
        <button {...toolbarButtonProps('justifyRight')}>Der.</button>
        <button {...toolbarButtonProps('justifyFull')}>Justificar</button>
      </div>
      <div
        ref={editorRef}
        className="form-control rich-editor-surface"
        contentEditable
        suppressContentEditableWarning
        onInput={emitChange}
        onKeyUp={saveSelection}
        onMouseUp={saveSelection}
        onBlur={emitChange}
        style={{ minHeight }}
        role="textbox"
        aria-multiline="true"
      />
    </div>
  );
}
