import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { 
  FaReact, 
  FaNodeJs, 
  FaRegHandshake 
} from 'react-icons/fa';
import { AiFillApi } from 'react-icons/ai';
import { 
  SiRedux, 
  SiMaterialdesign, 
  SiPostgresql 
} from 'react-icons/si';


// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div style={{ padding: 'var(--spacing-lg)', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header Section */}
      <div className="apple-card" style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--apple-dark-gray)',
          margin: '0 0 var(--spacing-md) 0',
          letterSpacing: '-1px'
        }}>
          About What's For Dinner
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: 'var(--apple-gray)',
          lineHeight: 1.6,
          margin: 0
        }}>
          A modern recipe and ingredient management application
        </p>
      </div>

      {/* Future Considerations */}
      <div className="apple-card">
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--apple-dark-gray)',
          margin: '0 0 var(--spacing-md) 0'
        }}>
          Future Considerations
        </h2>
        <p style={{
          fontSize: '1rem',
          color: 'var(--apple-gray)',
          lineHeight: 1.6,
          margin: 0
        }}>
          Add a shopping list function that will create a shopping list of
          ingredients that you are missing after planning the menu for the
          week.
        </p>
      </div>

      {/* Technologies */}
      <div className="apple-card">
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--apple-dark-gray)',
          margin: '0 0 var(--spacing-lg) 0'
        }}>
          Technologies Used
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: 'var(--spacing-md)' 
        }}>
          {[
            { icon: <FaReact color="#61DAFB" />, name: 'React' },
            { icon: <SiRedux color="#764ABC" />, name: 'Redux Saga' },
            { icon: <FaNodeJs color="#339933" />, name: 'Node.js' },
            { icon: <FaRegHandshake color="#007AFF" />, name: 'Axios' },
            { icon: <SiMaterialdesign color="#0081CB" />, name: 'Material UI' },
            { icon: <SiPostgresql color="#336791" />, name: 'PostgreSQL' },
            { icon: <AiFillApi color="#FF9500" />, name: 'Spoonacular API' }
          ].map((tech, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              padding: 'var(--spacing-sm)',
              background: 'rgba(0, 122, 255, 0.05)',
              borderRadius: 'var(--border-radius-sm)',
              transition: 'all 0.2s ease'
            }}>
              <div style={{ 
                fontSize: '1.2rem', 
                marginRight: 'var(--spacing-sm)',
                display: 'flex',
                alignItems: 'center'
              }}>
                {tech.icon}
              </div>
              <span style={{
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--apple-dark-gray)'
              }}>
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Acknowledgments */}
      <div className="apple-card">
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--apple-dark-gray)',
          margin: '0 0 var(--spacing-lg) 0'
        }}>
          Acknowledgments
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
          {[
            'Prime Digital Academy',
            'Dane my Instructor', 
            'The Butler Cohort',
            'My family and my wife'
          ].map((person, index) => (
            <div key={index} style={{
              padding: 'var(--spacing-sm)',
              color: 'var(--apple-gray)',
              fontSize: '1rem'
            }}>
              {person}
            </div>
          ))}
        </div>
      </div>

      {/* Developer Info */}
      <div className="apple-card" style={{ textAlign: 'center' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--apple-dark-gray)',
          margin: '0 0 var(--spacing-lg) 0'
        }}>
          Developed by Jason Inouye
        </h2>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 'var(--spacing-md)',
          marginBottom: 'var(--spacing-lg)'
        }}>
          <a
            href="https://www.linkedin.com/in/jason-inouye-9744938a/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: 'var(--spacing-sm) var(--spacing-md)',
              background: '#0077B5',
              color: 'white',
              textDecoration: 'none',
              borderRadius: 'var(--border-radius-sm)',
              transition: 'all 0.2s ease',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            <LinkedInIcon style={{ marginRight: 'var(--spacing-xs)' }} />
            LinkedIn
          </a>
          <a
            href="https://github.com/JasonInouye"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: 'var(--spacing-sm) var(--spacing-md)',
              background: '#333',
              color: 'white',
              textDecoration: 'none',
              borderRadius: 'var(--border-radius-sm)',
              transition: 'all 0.2s ease',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            <GitHubIcon style={{ marginRight: 'var(--spacing-xs)' }} />
            GitHub
          </a>
        </div>

        <p style={{
          color: 'var(--apple-gray)',
          fontSize: '0.9rem',
          margin: 0
        }}>
          © 2022 Jason Inouye
        </p>
      </div>
    </div>
  );
}

export default AboutPage;