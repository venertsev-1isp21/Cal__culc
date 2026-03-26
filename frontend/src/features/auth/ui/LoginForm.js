// src/features/auth/ui/LoginForm.jsx
import React from "react";

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  loading,
  handleLogin
}) => {
  return (
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
    </div>
  );
};

export default LoginForm;