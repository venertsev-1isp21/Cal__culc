import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useMutation } from '@tanstack/react-query';
import "../styles/log.css";

const API = "http://127.0.0.1:8000/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // =============================
  // LOGIN MUTATION
  // =============================
  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post(`${API}/login/`, {
        username,
        password
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        localStorage.setItem("isAuthenticated", "true");
        navigate("/main");
      } else {
        window.showErrorPopup("Неверный логин или пароль!");
      }
    },
    onError: () => {
      window.showErrorPopup("Ошибка соединения с сервером!");
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation.mutate();
  };

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
                disabled={loginMutation.isLoading}
              />

              <p className="Llogin_text">Password</p>
              <input
                type="password"
                placeholder="Enter password"
                className="Linput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loginMutation.isLoading}
              />

              <button
                type="submit"
                className="Lenter_button"
                disabled={loginMutation.isLoading}
              >
                {loginMutation.isLoading ? "Logging in..." : "Log in ➡️"}
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
