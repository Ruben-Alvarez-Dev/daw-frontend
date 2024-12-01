import React, { useEffect } from 'react';
import './Alert.css';

const Alert = ({ 
  type = 'info', 
  message, 
  onClose, 
  autoClose = true,
  duration = 3000 
}) => {
  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  if (!message) return null;

  return (
    <div className={`alert alert-${type}`}>
      <span className="alert-message">{message}</span>
      {onClose && (
        <button className="alert-close" onClick={onClose}>
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;
