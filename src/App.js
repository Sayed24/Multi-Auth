import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { FirstStep } from './components/FirstStep';
import SecondStep from './components/SecondStep';
import ThirdStep from './components/ThirdStep';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState({});

  const updateUser = (data) => {
    setUser((previousState) => ({ ...previousState, ...data }));
  };

  const resetUser = () => {
    setUser({});
  };

  return (
    <Router>
      <div className='container'>
        <Header />
        <Routes>
          <Route
            exact
            path='/'
            element={<FirstStep user={user} updateUser={updateUser} />}
          />
          <Route
            path='/second'
            element={<SecondStep user={user} updateUser={updateUser} />}
          />
          <Route
            path='/third'
            element={
              <ThirdStep
                user={user}
                updateUser={updateUser}
                resetUser={resetUser}
              />
            }
          />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
