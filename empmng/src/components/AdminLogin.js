import React, { useState } from 'react';
import './AdminLogin.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export default function AdminLogin({ handleAdminLogin, handleEmployeeLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberme, setRememberme] = useState(false);

  useEffect(() => {
    let getusername = Cookies.get('Setusername');
    let getpassword = Cookies.get('Setpassword');
    if (getusername && getpassword) {
      setUsername(getusername);
      setPassword(getpassword);
      setRememberme(true);
    }
  }, [])

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login/admin-login', {
        username,
        password,
      });

      if (response.data.success) {

        if (rememberme) {
          Cookies.set('Setusername', username, { expires: 1 });  // To remove cookies in 60 seconds use this line {new Date(Date.now() + 60000)}
          Cookies.set('Setpassword', password, { expires: 1 });
        } else {
          Cookies.remove('Setusername');
          Cookies.remove('Setpassword');
        }

        setUsername('');
        setPassword('');

        if (response.data.isAdmin) {
          handleAdminLogin(true);
        } else {
          handleEmployeeLogin(response.data.employeeData, response.data.matchingEmployees);
        }
      } else {
        setError(response.data.message);
        console.log(response.data.message)
      }
    } catch (error) {
      console.log(error);
      setError('Error logging in');
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="login-container">
        <div className="login-content">
          <div className="login-form">
            <h2 className="login-heading">Welcome to our organization</h2>
            <div className="form-group">
              <label htmlFor="username">
                <b>Username</b>
              </label>
              <input
                type="text"
                id="username"
                className="form-control input-field"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                <b>Password</b>
              </label>
              <input
                type="password"
                id="password"
                className="form-control input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                id='rememberme'
                checked={rememberme}
                onChange={(e) => setRememberme(e.target.checked)}
              />
              <label htmlFor="rememberme">
                <b className='mx-2'>Remember Me</b>
              </label>
            </div>
            {error && <div className="error-message">{error}</div>}
            <button className="btn btn-primary login-button" onClick={handleLogin}>
              Login
            </button>
          </div>
          {/* <div className="login-image">
          <img
            src="https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4"
            alt="Login"
            className="circle-image"
          />
        </div> */}
        </div>

      </div>
    </form>
  );
}
