import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/reg.css';

import RegisterForm from '../ui/RegisterForm';
import { useRegister } from '../hooks/useRegister';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    height: '',
    weight: '',
    age: '',
    gender: '',
  });

  const { handleRegister, isLoading } = useRegister();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(formData);
  };

  return (
    <div className="Lroot">
      <div className="Lleft_box">
        <Link to="/contact" className="Lbutton_back">
          ⬅️ Back
        </Link>
      </div>

      <div className="Lcenter_box">
        <p className="Lbig_login">Register</p>

        <RegisterForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
