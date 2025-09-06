import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Favorite,
  DinnerDining,
  Kitchen,
  MeetingRoom,
  Grain,
} from '@mui/icons-material';


function AppleNavLink({ to, icon, text, isActive }) {
  return (
    <RouterLink 
      to={to}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: 'var(--spacing-sm) var(--spacing-md)',
        margin: 'var(--spacing-xs) 0',
        borderRadius: 'var(--border-radius-sm)',
        textDecoration: 'none',
        color: isActive ? 'var(--apple-blue)' : 'var(--apple-dark-gray)',
        background: isActive ? 'rgba(0, 122, 255, 0.1)' : 'transparent',
        fontWeight: isActive ? 'var(--font-weight-medium)' : 'var(--font-weight-regular)',
        fontSize: '0.95rem',
        transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.target.style.background = 'rgba(0, 0, 0, 0.05)';
          e.target.style.transform = 'translateX(4px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.target.style.background = 'transparent';
          e.target.style.transform = 'translateX(0)';
        }
      }}
    >
      <div style={{ 
        marginRight: 'var(--spacing-sm)', 
        display: 'flex', 
        alignItems: 'center',
        color: isActive ? 'var(--apple-blue)' : 'var(--apple-gray)'
      }}>
        {icon}
      </div>
      {text}
    </RouterLink>
  );
}

function SideBar() {
  return (
    <nav style={{
      width: '100%',
      height: '100%'
    }}>
      {/* Navigation Header */}
      <div style={{
        marginBottom: 'var(--spacing-lg)',
        paddingBottom: 'var(--spacing-md)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{
          color: 'var(--apple-dark-gray)',
          fontSize: '1.1rem',
          fontWeight: 'var(--font-weight-semibold)',
          margin: '0 0 var(--spacing-xs) 0'
        }}>
          Kitchen Manager
        </h3>
        <p style={{
          color: 'var(--apple-gray)',
          fontSize: '0.85rem',
          margin: 0,
          lineHeight: 1.4
        }}>
          Organize ingredients and discover recipes
        </p>
      </div>

      {/* Hero Feature - What's For Dinner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--apple-blue), var(--apple-purple))',
        borderRadius: 'var(--border-radius-lg)',
        padding: 'var(--spacing-md)',
        marginBottom: 'var(--spacing-xl)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.3
        }} />
        
        <RouterLink 
          to="/search"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'white',
            position: 'relative',
            zIndex: 1
          }}
        >
          <div style={{
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            padding: 'var(--spacing-sm)',
            marginRight: 'var(--spacing-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <DinnerDining sx={{ fontSize: '1.5rem', color: 'white' }} />
          </div>
          <div>
            <div style={{
              fontSize: '1.1rem',
              fontWeight: 'var(--font-weight-bold)',
              marginBottom: '2px'
            }}>
              What's For Dinner?
            </div>
            <div style={{
              fontSize: '0.8rem',
              opacity: 0.9,
              fontWeight: 'var(--font-weight-regular)'
            }}>
              🍽️ Find your next meal
            </div>
          </div>
        </RouterLink>
      </div>

      {/* Navigation Links */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <AppleNavLink
          to="/favorite"
          icon={<Favorite sx={{ fontSize: '1.1rem' }} />}
          text="Favorite Recipes"
        />
        
        {/* Ingredients Section */}
        <div style={{
          margin: 'var(--spacing-lg) 0 var(--spacing-sm) 0',
          padding: '0 var(--spacing-md)'
        }}>
          <h4 style={{
            color: 'var(--apple-gray)',
            fontSize: '0.8rem',
            fontWeight: 'var(--font-weight-semibold)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            margin: 0
          }}>
            Ingredients
          </h4>
        </div>
        
        <AppleNavLink
          to="/ingredients/refrigerator"
          icon={<Kitchen sx={{ fontSize: '1.1rem' }} />}
          text="Refrigerator"
        />
        <AppleNavLink
          to="/ingredients/pantry"
          icon={<MeetingRoom sx={{ fontSize: '1.1rem' }} />}
          text="Pantry"
        />
        <AppleNavLink
          to="/ingredients/spices"
          icon={<Grain sx={{ fontSize: '1.1rem' }} />}
          text="Spices"
        />
      </div>
    </nav>
  );
}

export default SideBar;
