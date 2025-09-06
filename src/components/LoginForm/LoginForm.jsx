import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  };

  return (
    <div className="apple-card" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <form onSubmit={login}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--apple-dark-gray)',
            margin: '0 0 var(--spacing-sm) 0',
            letterSpacing: '-0.5px'
          }}>
            Welcome Back
          </h2>
          <p style={{
            color: 'var(--apple-gray)',
            fontSize: '1rem',
            margin: 0
          }}>
            Sign in to your account
          </p>
        </div>

        {errors.loginMessage && (
          <div style={{
            background: 'rgba(255, 59, 48, 0.1)',
            border: '1px solid rgba(255, 59, 48, 0.3)',
            borderRadius: 'var(--border-radius-sm)',
            padding: 'var(--spacing-md)',
            marginBottom: 'var(--spacing-lg)',
            color: 'var(--apple-red)',
            fontSize: '0.9rem',
            textAlign: 'center'
          }}>
            {errors.loginMessage}
          </div>
        )}

        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
          <label style={{
            display: 'block',
            fontSize: '0.95rem',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--apple-dark-gray)',
            marginBottom: 'var(--spacing-sm)'
          }}>
            Username
          </label>
          <input
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="apple-input"
            style={{
              fontSize: '1rem',
              padding: 'var(--spacing-md)',
              marginBottom: 0
            }}
            placeholder="Enter your username"
          />
        </div>

        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
          <label style={{
            display: 'block',
            fontSize: '0.95rem',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--apple-dark-gray)',
            marginBottom: 'var(--spacing-sm)'
          }}>
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="apple-input"
            style={{
              fontSize: '1rem',
              padding: 'var(--spacing-md)',
              marginBottom: 0
            }}
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="apple-button"
          style={{
            width: '100%',
            padding: 'var(--spacing-md) var(--spacing-lg)',
            fontSize: '1rem',
            fontWeight: 'var(--font-weight-semibold)'
          }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
