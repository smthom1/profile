import React from 'react';

export default function AboutContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
      <p style={{ fontWeight: 'bold', fontSize: 16 }}>Hi — I’m Sophia Thompson.</p>
      
      <p>
        I'm a Master of Data Science student at UC Irvine, passionate about applying 
        computational tools to environmental, social, and healthcare challenges.
      </p>
      
      <p>
        I bridge technical innovation with a human-centered understanding to build 
        impactful, data-driven solutions.
      </p>
      
      <p style={{ marginTop: 12, color: '#333', fontSize: 13 }}>
        Interests: Machine Learning, AI, Data Visualization, Human-Computer Interaction (HCI), and Sustainable Systems.
      </p>
    </div>
  );
}
