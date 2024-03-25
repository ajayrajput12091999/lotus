import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav m-auto">
              <li className="nav-item">
                <p>© Copyright, Ecommerce App</p>
              </li> 
          </ul>

        </div>
      </div>
    </nav>

  )
}
