import React, { useState } from 'react';

export default function NotepadContent() {
  const [text, setText] = useState('Welcome to my notepad. Jot notes here.');

  const handleSave = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'note.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          flex: 1,
          resize: 'none',
          fontFamily: "'FSEX300', 'ari-w9500', monospace",
          fontSize: 16,
          border: '2px inset #808080',
          padding: 8,
          background: '#fff',
          outline: 'none'
        }}
      />
      <div style={{ marginTop: 10 }}>
        <button className="win98-button" onClick={handleSave}>Save As .txt</button>
      </div>
    </div>
  );
}
