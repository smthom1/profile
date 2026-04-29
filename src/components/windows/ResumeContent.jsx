import React from 'react';

export default function ResumeContent() {
  return (
    <div style={{ height: '100%', width: '100%', border: '1px solid var(--bevel-dark)' }}>
      <iframe 
        src="public_resume.pdf" 
        width="100%" 
        height="100%" 
        style={{ border: 'none' }}
        title="Resume"
      />
    </div>
  );
}
