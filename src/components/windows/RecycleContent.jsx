import React, { useState } from 'react';

export default function RecycleContent() {
  const [items, setItems] = useState([]);

  const simulateDelete = () => {
    setItems([...items, `file-${Math.floor(Math.random() * 900) + 100}.txt`]);
  };

  const emptyRecycle = () => {
    setItems([]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontSize: 14 }}>
      <div 
        style={{ 
          flex: 1, 
          background: '#fff', 
          border: '2px inset var(--bevel-dark)', 
          padding: 8,
          overflowY: 'auto'
        }}
      >
        {items.length === 0 ? (
          <div style={{ color: '#666', fontStyle: 'italic' }}>The Recycle Bin is empty.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{items.length} item(s)</div>
            {items.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 16 }}>📄</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button className="win98-button" onClick={simulateDelete}>Simulate Delete File</button>
        <button className="win98-button" onClick={emptyRecycle} disabled={items.length === 0}>Empty Recycle Bin</button>
      </div>
    </div>
  );
}
