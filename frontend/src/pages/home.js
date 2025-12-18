import React from "react";
import { Link } from 'react-router-dom';
import Contact from "./contact.js"
import Login from "./login.js"
import Register from "./register.js"
import "../styles/home.css";
import Img1 from "../assets/img1.png";
import Img2 from "../assets/img2.png";


const Home = () => {
  return (
    <div>
      {/* Header */}
      <header>
        <Link to="/contact">Contact us</Link>
        <h1 className="home_title">Welcome!</h1>
        <div>
          <Link to="/login">Log in </Link>
          <Link to="/register">Sign in</Link>
        </div>
      </header>

      {/* Main Content */}
      <section>
        <div className="text1">
          <h2>About the Service</h2>
          <p>
            Welcome to <b>CalCul</b> - your personal assistant for managing nutrition and calorie tracking!
            We created this service to make controlling your diet simple, convenient, and effective. Here,
            you can track the calorie content of foods, calculate the balance of proteins, fats, and
            carbohydrates, and plan your meals according to your goals—whether it's weight loss,
            muscle gain, or weight maintenance.
          </p>
        </div>

        <div className="img1_box">
          <img
            src={Img1}
            alt="Healthy Food"
            className="img1"
          />
        </div>
      </section>

      {/* Images and Features */}
      <div className="section2">
        <div className="img2_box">
            <img
              src={Img2}
              alt="Balanced Meal"
              className="img2"
            />
        </div>
        <div className="text2">
          <ul>
            <li >
              <span>🔷</span> Easy calorie tracking - just add foods, and we’ll calculate everything for you.
            </li>
            <li>
              <span>🔷</span> Diet analysis - monitor your nutritional balance and receive recommendations.
            </li>
            <li>
              Our service helps you take a mindful approach to nutrition, build healthy habits, and
              achieve your desired results. Start today - your journey to a healthier lifestyle begins here!
              🚀
            </li>
          </ul>
        </div>
    </div>  
  </div>
  );
};

export default Home;
