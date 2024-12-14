import React from 'react';
import './Card.css';

const Card = ({ header, body, footer }) => {
  return (
    <div className="card">
      {header && (
        <div className="card-header">
          {header}
          <hr />
        </div>
      )}
      
      <div className="card-body">
        {body}
      </div>

      {footer && (
        <>
          <hr />
          <div className="card-footer">
            {footer}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
