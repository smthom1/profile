import React, { useState, useEffect } from 'react';
import { getIcon } from '../utils/icons';

const icons = [
  { id: 'comp', label: 'My Computer' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'resume', label: 'Resume' },
  { id: 'about', label: 'About Me' },
  { id: 'recycle', label: 'Recycle Bin' },
];

const rightIcons = [
  { id: 'github', label: 'GitHub' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'minesweeper', label: 'Minesweeper' },
];

function DesktopIcon({ icon, label, onClick, theme }) {
  const isWin11 = theme === 'win11';
  return (
    <div
      onClick={onClick}
      style={{
        width: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        gap: 6
      }}
      className="desktop-icon-container"
    >
      <img
        src={icon}
        alt={label}
        style={{ 
          width: 38, 
          height: 38, 
          objectFit: 'contain', 
          filter: isWin11 ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))' : 'drop-shadow(2px 2px 1px rgba(0,0,0,0.5))',
          imageRendering: isWin11 ? 'auto' : 'pixelated'
        }}
      />
      <span
        style={{
          color: 'white',
          fontSize: isWin11 ? 13 : 12,
          textAlign: 'center',
          textShadow: isWin11 ? '0 1px 3px rgba(0,0,0,0.8)' : '1px 1px 1px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black',
          padding: '2px 4px',
          fontWeight: isWin11 ? 500 : 'normal'
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function Desktop({ onOpen, theme, onThemeToggle }) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setTimeout(() => setOpacity(1), 600);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '20px',
        display: 'flex',
        flexDirection: 'row',
        gap: '28px',
        opacity,
        transition: 'opacity 0.6s ease',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {icons.map(item => (
          <DesktopIcon key={item.id} {...item} icon={getIcon(item.id, theme)} onClick={() => onOpen(item.id)} theme={theme} />
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        <DesktopIcon 
          icon={getIcon('start', theme)} 
          label={theme === 'win98' ? 'Upgrade to Win11' : 'Downgrade to Win98'} 
          onClick={onThemeToggle} 
          theme={theme} 
        />
        {rightIcons.map(item => (
          <DesktopIcon key={item.id} {...item} icon={getIcon(item.id, theme)} onClick={() => onOpen(item.id)} theme={theme} />
        ))}
      </div>
    </div>
  );
}
