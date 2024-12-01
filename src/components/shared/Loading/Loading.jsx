import React from 'react';
import './Loading.css';

const Loading = ({ size = 'medium', fullScreen = false }) => {
  return (
    <div className={`loading-container ${fullScreen ? 'loading-fullscreen' : ''}`}>
      <div className={`loading-spinner loading-${size}`}></div>
    </div>
  );
};

export default Loading;
