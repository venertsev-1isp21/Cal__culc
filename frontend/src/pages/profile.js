import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import profDefault from "../assets/prof_img.png";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    height: "",
    weight: "",
    age: "",
    gender: "",
    calorie_norm: 0
  });

  const token = localStorage.getItem("access_token");

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
  };

  const refreshToken = async () => {
    try {
      const refresh = localStorage.getItem("refresh_token");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/api/token/refresh/",
        { refresh }
      );
      localStorage.setItem("access_token", response.data.access);
      return response.data.access;
    } catch {
      handleLogout();
    }
  };

  const fetchUserInfo = async () => {
    try {
      let access = token;
      const res = await axios.get("http://127.0.0.1:8000/api/user_info/", {
        headers: { Authorization: `Bearer ${access}` }
      });
      setUserInfo(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        const newAccess = await refreshToken();
        if (newAccess) {
          const res = await axios.get("http://127.0.0.1:8000/api/user_info/", {
            headers: { Authorization: `Bearer ${newAccess}` }
          });
          setUserInfo(res.data);
        }
      } else {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

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
