import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer bg-light">
      <div className="container py-3">
        <div className="text-center">
          <p className="mb-0">Math Solver App &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;