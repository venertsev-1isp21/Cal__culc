
import React, { useEffect } from "react";
import "../styles/popup.css"

const Popup = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        {message}
      </div>
    </div>
  );
};

export default Popup;
