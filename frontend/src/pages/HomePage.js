import React from 'react';
import { Link } from 'react-router-dom';

import Contact from './ContactPage.js';
import Login from '../features/auth/pages/LoginPage';
import Register from '../features/auth/pages/RegisterPage.js';
import '../styles/home.css';
import Img1 from '../assets/img1.png';
import Img2 from '../assets/img2.png';

const Home = () => {
  return (
    <div>
      {/* Header */}
      <header>
        <Link to="/contact">Контакты</Link>
        <h1 className="home_title">Добро пожаловать!</h1>
        <div>
          <Link to="/login">Войти </Link>
          <Link to="/register">Регистрация</Link>
        </div>
      </header>

      {/* Main Content */}
      <section>
        <div className="text1">
          <h2>О сервисе</h2>
          <p>
            Добро пожаловать в <b>CalCul</b> - ваш личный помощник для управления
            Питание и отслеживание калорий! Мы создали этот сервис, чтобы сделать
            Контроль вашей диеты прост, удобен и эффективен. Вот, ты
            можно отслеживать калорийность продуктов, рассчитать баланс
            Белки, жиры и углеводы и планируйте свои блюда в соответствии с
            вашими целями - будь то потеря веса, увеличение мышц или вес.
          </p>
        </div>

        <div className="img1_box">
          <img src={Img1} alt="Healthy Food" className="img1" />
        </div>
      </section>

      {/* Images and Features */}
      <div className="section2">
        <div className="img2_box">
          <img src={Img2} alt="Balanced Meal" className="img2" />
        </div>
        <div className="text2">
          <ul>
            <li>
              <span>🔷</span> Легкое отслеживание калорий - просто добавьте продукты, и мы
              рассчитаем все за вас.
            </li>
            <li>
              <span>🔷</span> Анализ диеты - следите за своим питанием.
            </li>
            <li>
              Наш сервис поможет вам осознанно подойти к питанию, построить
              здоровые привычки и достижение желаемых результатов. Начните сегодня -
              ваше путешествие к здоровому образу жизни начинается здесь! 🚀
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
