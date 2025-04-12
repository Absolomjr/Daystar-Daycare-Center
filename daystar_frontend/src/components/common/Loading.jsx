import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="quick-loader">
        <div className="loader-content">
          <img src="/logo.png" alt="Daystar Daycare" className="loader-logo" />
          <div className="loader-spinner"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading; 