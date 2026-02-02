import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useMutation } from '@tanstack/react-query';

import "../styles/reg.css";

const API = "http://127.0.0.1:8000/api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    height: "",
    weight: "",
    age: "",
    gender: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // =============================
  // MUTATION: REGISTER
  // =============================
  const registerMutation = useMutation({
    mutationFn: async (data) => {
      await axios.post(`${API}/register/`, data);
    },
    onSuccess: () => {
      window.showErrorPopup("Успешная регистрация!");
      navigate("/login");
    },
    onError: () => {
      window.showErrorPopup("Ошибка регистрации!");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  return (
    <div className="Lroot">

      <div className="Lleft_box">
        <Link to="/contact" className="Lbutton_back">⬅️ Back</Link>
      </div>

      <div className="Lcenter_box">
        <p className="Lbig_login">Register</p>

        <div className="Rcenter_box_child">
          <div className="Rcenter_inbox">

            <form className="Lform" onSubmit={handleSubmit}>

              {["username", "password", "height", "weight", "age", "gender"].map((field) => (
                <div key={field}>
                  <p className="Rlogin_text">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </p>

                  <input
                    name={field}
                    placeholder={`Enter ${field}`}
                    className="Linput"
                    type={field === "password" ? "password" : "text"}
                    value={formData[field]}
                    onChange={handleChange}
                  />
                </div>
              ))}

              <button
                type="submit"
                className="Lenter_button"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? "Registering..." : "➡️ Register"}
              </button>

            </form>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Register;
