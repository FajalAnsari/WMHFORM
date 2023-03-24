import React from 'react';
import logo from "../../images/Logo-header.png";
import '../Navbar/Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand" >
            <img src={logo} alt="logo" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <ul className='navbar-nav'>
                <li className='"nav-item'>
                  <Link to={"/"} className='nav-link m-2 Home'>Home</Link>
                </li>
                <li className='"nav-item'>
                  <Link to={"/admin"} className='nav-link m-2'>Admin</Link>
                </li>
                <li className='"nav-item'>
                  <Link to={"/"}  className='nav-link m-2'>Digital</Link>
                </li>
                <li className='"nav-item'>
                  <Link to={"/"} className='nav-link m-2'>Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
