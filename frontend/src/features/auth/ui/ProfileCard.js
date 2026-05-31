import React from 'react';

import profDefault from '../../../assets/prof_img.png';

const ProfileCard = ({ userInfo }) => {
  return (
    <div className="Lcenter_box_child">
      <img className="Lpic_prof" src={profDefault} alt="profile" />

      <p className="Lenter_y_data">{userInfo.username}</p>

      <div className="Lcenter_inbox">
        <div className="LProf_box">
          <p className="Llogin_text">рост:</p>
          <p className="Llogin_text">{userInfo.height} cm</p>
        </div>

        <div className="LProf_box">
          <p className="Llogin_text">Вес:</p>
          <p className="Llogin_text">{userInfo.weight} kg</p>
        </div>

        <div className="LProf_box">
          <p className="Llogin_text">Возраст:</p>
          <p className="Llogin_text">{userInfo.age}</p>
        </div>

        <div className="LProf_box">
          <p className="Llogin_text">Пол:</p>
          <p className="Llogin_text">{userInfo.gender}</p>
        </div>

        <div className="LProf_box">
          <p className="Llogin_text">Норма калорий:</p>
          <p className="Llogin_text">{userInfo.calorie_norm} ккал</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
