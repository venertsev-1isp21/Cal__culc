import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/log.css';

import LoginForm from '../ui/LoginForm';
import { useLogin } from '../model/hooks/useLogin';

const LoginPage = () => {
  const { username, setUsername, password, setPassword, loading, handleLogin } =
    useLogin();

  return (
    <div className="Lroot">
      <div className="Lleft_box">
        <Link to="/contact" className="Lbutton_back">
          ⬅️ Назад
        </Link>
      </div>

      <div className="Lcenter_box">
        <p className="Lbig_login">👋Авторизация</p>

        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          loading={loading}
          handleLogin={handleLogin}
        />
      </div>
    </div>
  );
};

export default LoginPage;
