import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import "../styles/reg.css"

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    height: "",
    weight: "",
    age: "",
    gender: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/register/", formData);
      window.showErrorPopup("Успешная регистрация!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      window.showErrorPopup("Ошибка регистрации!");
      return;
    }
  }

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
                  <p className="Rlogin_text">{field.charAt(0).toUpperCase() + field.slice(1)}</p>
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
              <button type="submit" className="Lenter_button">➡️ Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
