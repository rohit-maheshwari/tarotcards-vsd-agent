import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-light text-center">
      <div className="container">
        <p className="mb-0">© 2024 The PEACE Initiative at University of Washington. All rights reserved.</p>
        <p className="mb-0">
          Contact: 
          <a href="mailto:katharina@example.com" className="footer-link"> Katharina Reinecke</a> | 
          <a href="mailto:rock@example.com" className="footer-link"> Rock Pang</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;