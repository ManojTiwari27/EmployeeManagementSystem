import React, { useContext } from 'react';
import './AdminLogin.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from './logo.png';
import { SearchContext } from "../context/SearchState";

export default function Navbar({ handleAdminLogout }) {
  const context = useContext(SearchContext)
  const { searchQuery, setSearchQuery } = context
  let location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    handleAdminLogout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-coral" style={{ height: '75px' }}>
      <div className="container mx-3">
        <Link className="navbar-brand" to="/">
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', marginRight: '10px' }}>
            <img src={logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <h5>
            Employee Management
            <br />
            <center>System</center>
          </h5>
        </Link>
        <div>
          <input
            type="text"
            className="form-control"
            id="searchQuery"
            value={searchQuery}
            placeholder="Search employee here"
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ height: '45px' }}
          />
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item buttonbgcolor">
            <Link
              className={`nav-link btn btn-outline-light ${location.pathname === '/' ? 'active' : ''
                }`}
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link btn btn-outline-light ${location.pathname === '/add' ? 'active' : ''
                }`}
              to="/add"
            >
              Add
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link btn btn-outline-light ${location.pathname === '/projects' ? 'active' : ''
                }`}
              to="/projects"
            >
              Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link btn btn-outline-light ${location.pathname === '/leaves' ? 'active' : ''
                }`}
              to="/leaves"
            >
              Leaves
            </Link>
          </li>
          <li className="nav-item">
            <button
              className="nav-link btn btn-outline-light custom-margin py-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
