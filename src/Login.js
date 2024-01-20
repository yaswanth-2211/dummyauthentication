import React, { useState } from 'react';
import './Login.css'


function Login({onLogin}) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userName,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      const token = data.token;

      console.log('Token:', token);

      onLogin({ id:data.id, token });

    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  

  return (
    <div>

      <div className="welcome-back">
        <span>Welcome back! 👋</span>
      </div>

      <header>
        <span>Sign in to your account</span>
      </header>

      <form>
        <div className="form-group">
          <label htmlFor="username">User Name</label>
          <input 
              type="text" 
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleLogin}>CONTINUE</button>
      </form>

    </div>
  );
}

export default Login;
