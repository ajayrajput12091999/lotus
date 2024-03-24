import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link text-white btn btn-danger" to="/profile"></Link>
              </li> 
          </ul>

        </div>
      </div>
    </nav>

  )
}
