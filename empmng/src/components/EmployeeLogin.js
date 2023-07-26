import React, { useState } from 'react';
// import { useCookies } from 'react-cookie';
import axios from 'axios';

export default function EmployeeLogin({ handleEmployeeLogin }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  // eslint-disable-next-line
  // const [cookies] = useCookies(['employeeToken']);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/employee-login', {
        email,
      });
      if (response.data.success) {
        setEmail('');
        handleEmployeeLogin(response.data.employeeData);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setError('Error logging in');
    }
  };

  return (
    <div className="container-fluid login-container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-lg-4 col-md-6">
          <div className="card login-card">
            <div className="card-header">Employee Login</div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="email">
                  <b>Email</b>
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control my-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error && <div className="error-message">{error}</div>}
              <button className="btn btn-primary login-button"  onClick={handleLogin} >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
