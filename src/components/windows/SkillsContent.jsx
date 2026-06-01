import React from 'react';

export default function SkillsContent() {
  const groups = [
    {
      title: 'Languages',
      items: ['Python', 'JavaScript', 'SQL', 'Java', 'R', 'C++']
    },
    {
      title: 'Data Science & ML',
      items: ['Machine Learning', 'AI (Gemini API)', 'Data Visualization', 'Predictive Modeling', 'Statistics', '(YOLO, CVAT)']
    },
    {
      title: 'Tools & Concepts',
      items: ['Git & GitHub', 'Figma', 'React', 'Streamlit', 'MongoDB', 'PostgreSQL', 'HCI']
    }
  ];

  return (
    <div style={{ display: 'flex', gap: 20, justifyContent: 'space-between', height: '100%', padding: 4 }}>
      {groups.map((g, i) => (
        <div key={i} style={{ flex: 1 }}>
          <h4 style={{ margin: '0 0 8px 0', paddingBottom: 4, borderBottom: '1px solid var(--bevel-dark)', color: 'var(--title-left)' }}>
            {g.title}
          </h4>
          <ul style={{ margin: 0, paddingLeft: 20, listStyleType: 'disc' }}>
            {g.items.map((item, j) => (
              <li key={j} style={{ marginBottom: 6, fontSize: 14 }}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
