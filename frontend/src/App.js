import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';

import Home from './pages/HomePage.js';
import Contact from './pages/ContactPage.js';
import Login from './features/auth/pages/LoginPage';
import Main from './pages/MainPage.js';
import Register from './features/auth/pages/RegisterPage.js';
import Profile from './features/auth/pages/ProfilePage.js';
import PrivateRoute from './PrivateRoute';
import Popup from './components/Popup';

function App() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('access')
  );

  // глобальная функция для вызова всплывающего окна
  window.showErrorPopup = (message) => {
    setPopupMessage(message);
    setPopupVisible(true);
  };

  return (
    <>
      {/* Всплывающее окно */}
      <Popup
        message={popupMessage}
        isVisible={popupVisible}
        onClose={() => setPopupVisible(false)}
      />

      {/* Маршруты */}
      <Routes>
        <Route
          path="/"
          element={<Home onLogin={() => setIsLoggedIn(true)} />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/main"
          element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={<Login onLogin={() => setIsLoggedIn(true)} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
