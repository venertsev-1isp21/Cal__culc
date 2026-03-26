import React from "react";
import { Link } from 'react-router-dom';
import Tg from "../assets/tg_icon.png"
import Vk from "../assets/vk_icon.png"
import Wp from "../assets/wp_icon.png"
import Yt from "../assets/yt_icon.png"
import "../styles/contact.css";

const Contact = () => {
  return (
    <div className="contact_root">
      <div className='header'>
        <Link to="/main">Main</Link>
        <Link to="/"><h1 className="home_title" >Welcome!</h1></Link>
        <div>
          <Link to="/login">Log in </Link>
          <Link to="/register">Sign in</Link>
        </div>
      </div>

      <div className="contact_section">
        <div className="main_box">
          <div className="sm_main_box">
		    <div className='sm_box'>
              <img
                src={Tg}
                alt="Balanced Meal"
                className="img_tg"
              />
            </div>
			      <p>Telegram</p>
		    </div>
		  
          <div className="sm_main_box">
			    <div className='sm_box'>
                    <img
                        src={Vk}
                        alt="Balanced Meal"
                        className="img_tg"
                    />
                  </div>
			      <p>VK</p>
		      </div>
		  
		      <div className="sm_main_box">
			      <div className='sm_box'>
                    <img
                        src={Wp}
                        alt="Balanced Meal"
                        className="img_tg"
                    />
                  </div>
			      <p>Whatsapp</p>
		      </div>
		  
		      <div className="sm_main_box">
			      <div className='sm_box'>
                    <img
                        src={Yt}
                        alt="Balanced Meal"
                        className="img_tg"
                    />
                  </div>
			      <p>YouTube</p>
		      </div>
		  
        </div>
      </div>        
	</div>
  );
};

export default Contact;
