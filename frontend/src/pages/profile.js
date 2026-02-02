import React from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import profDefault from "../assets/prof_img.png";

const API = "http://127.0.0.1:8000/api";

const Profile = () => {
  const token = localStorage.getItem("access_token");

  // =============================
  // LOGOUT
  // =============================
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
  };

  // =============================
  // QUERY: USER INFO
  // =============================
  const {
    data: userInfo,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const res = await axios.get(
        `${API}/user_info/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    enabled: !!token, // 🔥 dependent query
    retry: 1,
    onError: (err) => {
      if (err.response?.status === 401) {
        handleLogout();
      }
    }
  });

  if (isLoading) {
    return <div className="Lroot">Загрузка профиля...</div>;
  }

  if (isError) {
    return <div className="Lroot">Ошибка: {error.message}</div>;
  }

  return (
    <div className="Lroot">

      <div className="Lleft_box">
        <Link to="/main" className="Lbutton_back">⬅️ Back</Link>
      </div>

      <div className="Lcenter_box">
        <p className="Lbig_login">Profile</p>

        <div className="Lcenter_box_child">
          <img
            className="Lpic_prof"
            src={profDefault}
            alt="Извините, изображения нет"
          />

          <p className="Lenter_y_data">{userInfo.username}</p>

          <div className="Lcenter_inbox">

            <div className="LProf_box">
              <p className="Llogin_text">Height:</p>
              <p className="Llogin_text">{userInfo.height} cm</p>
            </div>

            <div className="LProf_box">
              <p className="Llogin_text">Weight:</p>
              <p className="Llogin_text">{userInfo.weight} kg</p>
            </div>

            <div className="LProf_box">
              <p className="Llogin_text">Age:</p>
              <p className="Llogin_text">{userInfo.age}</p>
            </div>

            <div className="LProf_box">
              <p className="Llogin_text">Gender:</p>
              <p className="Llogin_text">{userInfo.gender}</p>
            </div>

            <div className="LProf_box">
              <p className="Llogin_text">Calorie Norm:</p>
              <p className="Llogin_text">{userInfo.calorie_norm} kcal</p>
            </div>

          </div>
        </div>
      </div>

      <div className="Lright_box">
        <div className="Mlogout_zone" onClick={handleLogout}>
          <div className="Mlogout_button">↪</div>
          <p className="Mlogout_text">Log out</p>
        </div>
      </div>

    </div>
  );
};

export default Profile;
