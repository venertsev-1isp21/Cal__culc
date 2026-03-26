// src/features/auth/pages/LoginPage.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../../../styles/log.css";

import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { loginThunk } from "../../../app/store/thunks/authThunks";
import { clearError } from "../../../app/store/slices/authSlice";
import LoginForm from "../ui/LoginForm";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useAppSelector(state => state.auth);

  // =============================
  // LOGIN
  // =============================
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginThunk({ username, password }));
  };

  // =============================
  // REDIRECT AFTER LOGIN
  // =============================
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/main");
    }
  }, [isAuthenticated, navigate]);

  // =============================
  // ERROR HANDLING
  // =============================
  useEffect(() => {
    if (error) {
      window.showErrorPopup(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <div className="Lroot">
      <div className="Lleft_box">
        <Link to="/contact" className="Lbutton_back">⬅️ Back</Link>
      </div>

      <div className="Lcenter_box">
        <p className="Lbig_login">👋Log in</p>

        {/* UI компонент */}
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