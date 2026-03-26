import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../styles/log.css";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginThunk } from "../store/thunks/authThunks";
import { clearError } from "../store/slices/authSlice";

const Login = () => {
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

        <div className="Lcenter_box_child">
          <p className="Lenter_y_data">Enter your data:</p>

          <div className="Lcenter_inbox">
            <form className="Lform" onSubmit={handleLogin}>

              <p className="Llogin_text">Name</p>
              <input
                placeholder="Enter name"
                className="Linput"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />

              <p className="Llogin_text">Password</p>
              <input
                type="password"
                placeholder="Enter password"
                className="Linput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />

              <button
                type="submit"
                className="Lenter_button"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log in ➡️"}
              </button>

            </form>
          </div>

          <Link className="singin" to="/register">
            👉Sing in👈
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;