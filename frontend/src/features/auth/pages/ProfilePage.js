import React from 'react';
import { Link } from 'react-router-dom';

import { useProfile } from '../model/hooks/useProfile';
import ProfileCard from '../ui/ProfileCard';

const ProfilePage = () => {
  const {
    data: userInfo,
    isLoading,
    isError,
    error,
    handleLogout,
  } = useProfile();

  if (isLoading) {
    return <div className="Lroot">Загрузка профиля...</div>;
  }

  if (isError) {
    return <div className="Lroot">Ошибка: {error.message}</div>;
  }

  return (
    <div className="Lroot">
      <div className="Lleft_box">
        <Link to="/main" className="Lbutton_back">
          ⬅️ Назад
        </Link>
      </div>

      <div className="Lcenter_box">
        <p className="Lbig_login">Профиль</p>

        <ProfileCard userInfo={userInfo} />
      </div>

      <div className="Lright_box">
        <div className="Mlogout_zone" onClick={handleLogout}>
          <div className="Mlogout_button">↪</div>
          <p className="Mlogout_text">Выйти</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
