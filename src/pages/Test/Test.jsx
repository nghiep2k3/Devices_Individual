import React, { useState } from 'react'
import './Test.css';
const Test = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Hàm xử lý hiển thị dòng chữ "Welcome Dev" và áp dụng hiệu ứng
  const showWelcomeText = () => {
    setIsVisible(true);
  };

  return (
    <div className="welcome-container">
      <button onClick={showWelcomeText}>Show Welcome</button>
      {isVisible && (
        <div className="welcome-text">
          <h1>Welcome Dev</h1>
        </div>
      )}
    </div>
  );
};

export default Test;
