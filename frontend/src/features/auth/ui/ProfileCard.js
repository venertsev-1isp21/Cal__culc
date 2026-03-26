import React from 'react';

import profDefault from '../../../assets/prof_img.png';

const ProfileCard = ({ userInfo }) => {
  return (
    <div className="Lcenter_box_child">
      <img className="Lpic_prof" src={profDefault} alt="profile" />

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
  );
};

export default ProfileCard;
