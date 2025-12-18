import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "../styles/log.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        { username, password }
      );

      if (response.data.success) {
        // Сохраняем JWT токены
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        localStorage.setItem("isAuthenticated", "true");
        navigate("/main");
      } else {
        window.showErrorPopup("Неверный логин или пароль!");
      }
    } catch (err) {
      console.error(err);
      window.showErrorPopup("Ошибка соединения с сервером!");
    }
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
              />
              <p className="Llogin_text">Password</p>
              <input
                type="password"
                placeholder="Enter password"
                className="Linput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="Lenter_button">Log in ➡️</button>
            </form>
          </div>
          <Link className="singin" to="/register">👉Sing in👈</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
