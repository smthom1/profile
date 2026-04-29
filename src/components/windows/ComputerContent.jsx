import React from 'react';
import { getIcon } from '../../utils/icons';

export default function ComputerContent({ theme = 'win98' }) {
  return (
    <div style={{ fontSize: 13, display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
      <div>
        <b style={{ fontSize: 14 }}>Drives</b>
        <ul style={{ paddingLeft: 24, marginTop: 6, marginBottom: 0 }}>
          <li style={{ marginBottom: 4 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <img src={getIcon('comp', theme)} alt="C" style={{ width: 16 }} />
              C:\ (System)
            </span>
          </li>
          <li style={{ marginBottom: 4 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <img src={getIcon('comp', theme)} alt="D" style={{ width: 16 }} />
              D:\ (Data)
            </span>
          </li>
          <li style={{ marginBottom: 4 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 16, display: 'inline-block' }}>💾</span>
              A:\ (Floppy) <span style={{ color: '#666' }}>(virtual)</span>
            </span>
          </li>
        </ul>
      </div>
      
      <div style={{ flex: 1 }}></div>

      <div style={{ borderTop: '1px solid var(--bevel-dark)', paddingTop: 8 }}>
        <b style={{ fontSize: 14 }}>System Info</b>
        <div style={{ color: '#333', marginTop: 4 }}>S. Thompson — Windows 98 (React Edition)</div>
        <div style={{ color: '#333', marginTop: 4 }}>Memory: 64MB RAM</div>
        <div style={{ color: '#333', marginTop: 4 }}>Processor: GenuineIntel Pentium(r) II</div>
      </div>
    </div>
  );
}
