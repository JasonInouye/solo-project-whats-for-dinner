import React, { useEffect } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import SideBar from '../SideBar/SideBar';
import MainContainer from '../MainContainer/MainContainer';
import WeeklySchedule from '../WeeklySchedule/WeeklySchedule';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import './App.css';

import { Box, Stack } from '@mui/material';
import SideBarNo from '../SideBarNo/SideBarNo';

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div className='bg-image'>
        <Nav />
        <div style={{ 
          display: 'flex', 
          minHeight: 'calc(100vh - 88px)',
          marginTop: '88px'
        }}>
          {/* Left Sidebar */}
          <aside style={{
            width: '280px',
            flexShrink: 0,
            padding: 'var(--spacing-lg)',
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(10px)',
            borderRight: '1px solid rgba(0, 0, 0, 0.1)'
          }}>
            {user.id ? <SideBar /> : <SideBarNo />}
          </aside>

          {/* Main Content Area */}
          <main style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100%'
          }}>
            <div style={{
              flex: 1,
              padding: 'var(--spacing-lg)',
              maxWidth: '800px',
              margin: '0 auto',
              width: '100%'
            }}>
              <MainContainer />
            </div>
            
            {/* Weekly Schedule at Bottom */}
            {user.id && (
              <section style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid rgba(0, 0, 0, 0.1)',
                padding: 'var(--spacing-lg)'
              }}>
                <WeeklySchedule />
              </section>
            )}
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
