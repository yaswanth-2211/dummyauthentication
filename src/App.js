import React, { useState } from 'react';
import Login from './Login';
import Profile from './Profile';
import './App.css';

const App = () => {
  const [isLogged, setIsLogged] = useState(null);

  const handleLogin = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setIsLogged(user);
  };

  return (
    <div className='App'>
      {isLogged ? <Profile user={isLogged}/> : <Login onLogin={handleLogin}/>}
    </div>
  );
};

export default App;
