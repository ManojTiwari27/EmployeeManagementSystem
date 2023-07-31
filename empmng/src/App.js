import React, { useEffect, useState } from 'react';
import AddEmployee from './components/AddEmployee';
import Home from './components/Home';
import Navbar from './components/Navbar';
import UpdateEmployee from './components/UpdateEmployee';
import Project from './components/Project';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import { CookiesProvider } from 'react-cookie';
import EmployeeInfo from './components/EmployeeInfo';
import Calendar from './components/Calendar'
import Cookies from 'js-cookie';
import axios from 'axios';
import EmployeeLeaveRequest from './components/EmployeeLeaveRequest';
import AdminLeaveRequest from './components/AdminLeaveRequest';
//import EmployeeLogin from './components/EmployeeLogin';

export default function App() {
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [isEmployeeLogin, setIsEmployeeLogin] = useState(false);
  const [empinfo, setempInfo] = useState('')
  const [empprojectinfo, setempprojectInfo] = useState('')
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const savedAdminToken = Cookies.get('adminToken');
    if (savedAdminToken === 'adminloggedin'){
      setIsAdminLogin(true);
    }
    const savedEmployeeToken = Cookies.get('employeeToken');

    const savedEmployeeTokenone = Cookies.get('employeeTokenone');
    if (savedEmployeeToken || savedEmployeeTokenone) {
      setIsEmployeeLogin(true);
      fetchdata()
      // const storedEmployeeInfo = localStorage.getItem('employeeInfo');
      // const storedEmployeeProjectInfo = localStorage.getItem('employeeProjectInfo');
      // if (storedEmployeeInfo && storedEmployeeProjectInfo) {
      //   setempInfo(JSON.parse(storedEmployeeInfo));
      //   setempprojectInfo(JSON.parse(storedEmployeeProjectInfo));
      // }
    }
  }, []);

  const fetchdata = async () => {
    const employeeId = Cookies.get('employeeToken');
    try {
      const response = await axios.get(`http://localhost:5000/api/get/employee-info/${employeeId}`);
      setempInfo(response.data.employeeData);
      setempprojectInfo(response.data.matchingEmployees);
    } catch (error) {
      console.log('Error fetching employee info:', error);
      setempprojectInfo([]);
    }

  }


  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line
  }, [projects])

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/get/getprojects');
      if (JSON.stringify(response.data) !== JSON.stringify(projects)) setProjects(response.data);
    } catch (error) {
      console.log('Error fetching projects:', error)
    }
  }

  const updateProjects = (updatedProjects) => {
    setProjects(updatedProjects);
  };

  const handleAdminLogin = (login) => {
    setIsAdminLogin(login);
    if (login) {
      Cookies.set('adminToken', 'adminloggedin', { expires: 1 });
    }
  };

  const handleEmployeeLogin = async (employeeData, employeeprojectinfo) => {
    setIsEmployeeLogin(true);
    setempInfo(employeeData);
    setempprojectInfo(employeeprojectinfo);
    // // Store employee info in local storage
    // localStorage.setItem('employeeInfo', JSON.stringify(employeeData));
    // localStorage.setItem('employeeProjectInfo', JSON.stringify(employeeprojectinfo));

    Cookies.set('employeeToken', employeeData.id, { path: '/' });
    Cookies.set('employeeTokenone', 'employeeLoggedinOne', { path: '/' });
  };

  const updateEmployeeInfo = (updatedEmployee) => {
    setempInfo(updatedEmployee);
    localStorage.setItem('employeeInfo', JSON.stringify(updatedEmployee))
  };

  const handleAdminLogout = () => {
    setIsAdminLogin(false);
    Cookies.remove('adminToken', { path: '/' });
  };

  const handleEmployeeLogout = () => {
    setIsEmployeeLogin(false);
    Cookies.remove('employeeToken', { path: '/' });
    Cookies.remove('employeeTokenone', { path: '/' });
    // localStorage.removeItem('employeeInfo');
    // localStorage.removeItem('employeeProjectInfo');
  };

  return (
    <CookiesProvider>
      <Router>
        {/* {console.log(isAdminLogin)} */}
        {!isAdminLogin && !isEmployeeLogin && (
          <>
            <Routes>
              <Route exact path="/" element={<AdminLogin handleAdminLogin={handleAdminLogin} handleEmployeeLogin={handleEmployeeLogin} />} />
              {/* <Route
                path="/employee-login"
                element={<EmployeeLogin handleEmployeeLogin={handleEmployeeLogin}/>}
              />*/}
            </Routes>
          </>
        )}
        {
          isEmployeeLogin && (
            <>
              <Routes>
                <Route exact path='/' element={<EmployeeInfo empInfo={empinfo} empprojectinfo={empprojectinfo} handleEmployeeLogout={handleEmployeeLogout} />} />
                <Route exact path="/update/:id" element={<UpdateEmployee projects={projects} updateEmployeeInfo={updateEmployeeInfo} empinfo={empinfo} isEmployeeLogin={isEmployeeLogin} />} />
                <Route exact path='/leaverequest' element={ <EmployeeLeaveRequest empInfo={empinfo} setempInfo={setempInfo}/>}/>
              </Routes>
            </>
          )
        }
        {isAdminLogin && (
          <>
            <Navbar handleAdminLogout={handleAdminLogout} />
            <Routes>
           
              <Route exact path="/" element={<Home/>} />
              <Route
                exact path="/add"
                element={<AddEmployee projects={projects} setProjects={setProjects} />}
              />
              <Route exact path="/update/:id" element={<UpdateEmployee projects={projects} />} />
              <Route
                exact
                path="/attendance/:id"
                element={<Calendar />}
              />

              <Route
                exact path="/projects"
                element={<Project projects={projects} setProjects={setProjects} updateProjects={updateProjects} />}
              />
              
              <Route
                exact path="/leaves"
                element={<AdminLeaveRequest/>}
              />
            </Routes>
          </>
        )}
      </Router>
    </CookiesProvider>
  );
}
