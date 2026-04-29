import React, { useState } from 'react';

const projectsData = {
  healthAI: {
    title: 'Health & Accessibility AI (HackDavis, Best Medical Hack Winner)',
    desc: 'Developed HAPPI, a platform for Alzheimer\'s/dementia patients using digitized SAGE exams. Won "Best Medical Hack".',
    stack: ['Streamlit', 'Gemini API', 'MongoDB', 'Firebase'],
    link: 'https://github.com/smthom1/alz-data'
  },
  intelliConverse: {
    title: 'IntelliConverse (HackDavis, Best MongoDB Winner)',
    desc: 'Accessibility-focused web app for individuals with learning differences, using voice/text comprehension.',
    stack: ['React', 'Next.js', 'Azure Speech', 'Milvus', 'MongoDB'],
    link: 'https://github.com/IdkwhatImD0ing/study-assistant' 
  },
  pistachioML: {
    title: 'Pistachio Image Recognition',
    desc: 'Built Python-based ML models (YOLO, CVAT) for automated pistachio classification and sorting. Reduced sorting errors.',
    stack: ['Python', 'Machine Learning', 'YOLO'],
    link: 'https://github.com/smthom1/Pistachio-Split-Recognition'
  },
  urbanForestry: {
    title: 'Edible Trees Database',
    desc: 'Designed a scalable PostgreSQL/PostGIS database to catalog edible urban tree species.',
    stack: ['PostgreSQL', 'PostGIS', 'Java', 'Leaflet']
  },
  agentModel: {
    title: 'Agent-Based Model of Infection Dynamics',
    desc: 'Developed a Java-based simulation (MASONplus9) to model SIR infectious disease dynamics with an GUI.',
    stack: ['Java', 'MASONplus9', 'SIR Modeling']
  },
  olympicViz: {
    title: 'Interactive Olympic Data Visualization',
    desc: 'Built an interactive D3.js dashboard to explore correlations between Olympic medal counts, GDP, population, and host status.',
    stack: ['D3.js', 'JavaScript', 'HTML', 'CSS'],
    link: 'https://github.com/cassiehopkin/ECS163-FinalProject'
  }
};

export default function ProjectsContent() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ display: 'flex', gap: 12, height: '100%' }}>
      <div style={{ width: 160, borderRight: '2px solid var(--bevel-dark)', paddingRight: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {Object.keys(projectsData).map(key => (
          <div
            key={key}
            onClick={() => setSelected(key)}
            style={{
              padding: 8,
              border: '2px solid transparent',
              borderRadius: 3,
              cursor: 'pointer',
              background: selected === key ? 'var(--title-left)' : 'transparent',
              color: selected === key ? 'white' : 'black',
              fontSize: 13,
            }}
          >
            {projectsData[key].title.split(' (')[0]}
          </div>
        ))}
      </div>
      
      <div style={{ flex: 1, paddingLeft: 12 }}>
        {!selected ? (
          <div style={{ background: '#dcdcdc', border: '2px inset var(--bevel-dark)', padding: 10 }}>
            <b>Select a project</b>
            <p style={{ color: '#333', fontSize: 13 }}>Click a project on the left to see details, tech stack and a demo link.</p>
          </div>
        ) : (
          <div style={{ background: '#dcdcdc', border: '2px inset var(--bevel-dark)', padding: 10 }}>
            <b style={{ fontSize: 15 }}>{projectsData[selected].title}</b>
            <p style={{ fontSize: 14 }}>{projectsData[selected].desc}</p>
            <p style={{ fontSize: 13, color: '#333' }}>Tech: {projectsData[selected].stack.join(', ')}</p>
            {projectsData[selected].link && (
              <p style={{ marginTop: 8 }}>
                <a href={projectsData[selected].link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--title-left)', fontWeight: 'bold' }}>View Repository</a>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
