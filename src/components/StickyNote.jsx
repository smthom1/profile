import React from 'react';
import { motion } from 'framer-motion';

export default function StickyNote({ theme, onClose, zIndex = 999, onFocus }) {
  const isWin11 = theme === 'win11';

  return (
    <motion.div
      drag
      dragMomentum={false}
      onPointerDown={onFocus}
      initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
      animate={{ opacity: 1, scale: 1, rotate: isWin11 ? 1 : -1.5 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', damping: 15 }}
      style={{
        position: 'absolute',
        top: 100,
        right: 60,
        width: 250,
        zIndex: zIndex,
        cursor: 'grab',
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        transformOrigin: 'top center',
        ...(isWin11 ? {
          // Windows 11 Styling
          background: 'linear-gradient(135deg, #FFF9D4 0%, #FFEFA6 100%)',
          borderRadius: '12px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)',
          padding: '14px 16px',
          fontFamily: '"Segoe UI Variable", "Segoe UI", sans-serif',
          color: '#2b2b2b',
        } : {
          // Windows 98 Styling
          background: '#FFFCA8',
          border: '1px solid #C5B058',
          boxShadow: '5px 5px 0px rgba(0, 0, 0, 0.2)',
          padding: '16px 12px 12px 12px',
          fontFamily: '"Comic Sans MS", "ari-w9500", Tahoma, sans-serif',
          color: '#000000',
        })
      }}
    >
      {/* Tape Effect for Windows 98 */}
      {!isWin11 && (
        <div
          style={{
            position: 'absolute',
            top: -12,
            left: '50%',
            transform: 'translateX(-50%) rotate(0.5deg)',
            width: 75,
            height: 20,
            background: 'rgba(248, 248, 235, 0.55)',
            borderLeft: '1px dashed rgba(0,0,0,0.15)',
            borderRight: '1px dashed rgba(0,0,0,0.15)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            backdropFilter: 'blur(1px)',
            pointerEvents: 'none',
            zIndex: 10
          }}
        />
      )}

      {/* Header with drag area and Close button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
          width: '100%',
        }}
      >
        {/* Decorative elements representing push pin / header info */}
        {isWin11 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.4)' }}>Sticky Note</span>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 11, fontWeight: 'bold', color: '#8b7a32' }}>📌 Update Info</span>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          style={isWin11 ? {
            // Win11 close style
            background: 'transparent',
            border: 'none',
            borderRadius: '50%',
            width: 20,
            height: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'rgba(0,0,0,0.4)',
            transition: 'background 0.2s, color 0.2s',
          } : {
            // Win98 close style
            background: '#DFDFDF',
            borderTop: '1px solid #FFF',
            borderLeft: '1px solid #FFF',
            borderRight: '1px solid #808080',
            borderBottom: '1px solid #808080',
            boxShadow: 'inset -0.5px -0.5px 0px #404040, inset 0.5px 0.5px 0px #DFDFDF',
            width: 14,
            height: 14,
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 9,
            fontWeight: 'bold',
            fontFamily: 'Tahoma, sans-serif',
            cursor: 'pointer',
            color: '#000',
          }}
          onMouseEnter={(e) => {
            if (isWin11) {
              e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.06)';
              e.currentTarget.style.color = '#000';
            }
          }}
          onMouseLeave={(e) => {
            if (isWin11) {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'rgba(0,0,0,0.4)';
            }
          }}
          title="Close note"
        >
          {isWin11 ? (
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            "x"
          )}
        </button>
      </div>

      {/* Note Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          lineHeight: 1.4,
          textAlign: 'left',
          ...(isWin11 ? {
            fontSize: 14,
            fontWeight: 500,
          } : {
            fontSize: 13,
          })
        }}
      >
        <div style={{ fontWeight: 'bold', fontSize: isWin11 ? 16 : 14, marginBottom: 2 }}>
          Updates coming soon!
        </div>

        <div style={{ height: 1, background: isWin11 ? 'rgba(0,0,0,0.06)' : 'rgba(197, 176, 88, 0.4)', margin: '2px 0' }} />

        <div>
          Stay tuned! I am currently working on rolling out major upgrades to this website:
        </div>

        <ul style={{ margin: '4px 0', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <li>Interactive themes & custom palettes</li>
          <li>More classic retro mini-games</li>
          <li>Additional projects and write-ups</li>
        </ul>

        <div style={{
          marginTop: 8,
          textAlign: 'right',
          fontSize: isWin11 ? 12 : 11,
          fontStyle: 'italic',
          opacity: 0.8,
          fontWeight: isWin11 ? 600 : 'normal'
        }}>
          — S. Thompson
        </div>
      </div>
    </motion.div>
  );
}
