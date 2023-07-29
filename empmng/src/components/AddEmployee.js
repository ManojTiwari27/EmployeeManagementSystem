import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { departmentContext } from '../context/DepartmentState';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AddEmployee.css';


export default function AddEmployee({ projects }) {
    const context = useContext(departmentContext);
    // eslint-disable-next-line 
    const { department, setDepartment } = context
    const [fname, setfName] = useState('');
    const [lname, setlName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [fnameError, setFnameError] = useState('');
    const [lnameError, setLnameError] = useState('');
    const [emailError, setEmailError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventdefault();
    }

    useEffect(() => {
        setTimeout(() => {
            setFnameError('');
            setLnameError('');
            setEmailError('');
        }, 1500);

    }, [fnameError, lnameError, emailError]);

    const handleAdd = async () => {
        let isValid = true;
        if (fname.length === 0) {
            setFnameError('* First Name Cannot be Empty');
            isValid = false;
        }
        if (lname.length === 0) {
            setLnameError('* Last Name Cannot be Empty');
            isValid = false;
        }
        if (email.length === 0) {
            setEmailError('* Email Cannot be Empty');
            isValid = false;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setEmailError('Enter Valid Email Address');
                isValid = false;
            }
        }

        if (!isValid) {
            return;
        }

        const employee = {
            fName: fname,
            lName: lname,
            mail: email,
            password: password,
            project: selectedProject,
            department: selectedDepartment,
            date_of_joining: selectedDate
        };


        try {
            const response = await axios.post("http://localhost:5000/api/post/insertempdata", employee);
            if (response.data.success) {
                setfName('');
                setlName('');
                setEmail('');
                setSelectedProject('');
                setPassword('');
                navigate('/');
            } else {
                if (response.data.message === 'Email already exists') {
                    setEmailError('Email already exists');
                } else {
                    setEmailError('Error adding employee');
                }
            }
        } catch (error) {
            console.log(error);
            setEmailError('Error adding employee');
        }

    };

    const containerStyle = {
        backgroundColor: '#ccf5ff',
    };




    return (
        <div className="container my-5 shadow-lg p-3 mb-5 rounded" style={containerStyle}>
            <form onSubmit={handleSubmit}>
                <div className="row ">
                    <div className="col">
                        <input
                            style={containerStyle}
                            onChange={(e) => setfName(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="First name"
                            required
                        />
                        {fnameError ? <div className="my-2" style={{ color: 'red' }}>{fnameError}</div> : null}
                    </div>
                    <div className="col">
                        <input
                            style={containerStyle}
                            onChange={(e) => setlName(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Last name"
                            required
                        />
                        {lnameError ? <div className="my-2" style={{ color: 'red' }}>{lnameError}</div> : null}
                    </div>
                </div>
                <div className="row">
                    <div className="col my-3">
                        <input
                            style={containerStyle}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            required
                        />
                        {emailError ? <div style={{ color: 'red' }}>{emailError}</div> : null}
                    </div>
                    <div className="col my-3">
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            placeholderText="Select a date"
                            className="form-control datepicker"
                            dateFormat="yyyy-MM-dd"
                            calendarClassName="custom-datepicker-calendar"
                            showYearDropdown
                            showMonthDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <input
                        style={containerStyle}
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                </div>
                <div className="form-group my-3">
                    <select
                        style={{ backgroundColor: '#ccf5ff' }}
                        className="form-control"
                        value={selectedProject}
                        onChange={(e) => setSelectedProject(e.target.value)}
                    >
                        <option value="">Select a Project</option>
                        {projects.map((project) => (
                            <option key={project.id} value={project.name}>
                                {project.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group my-3">
                    <select
                        style={containerStyle}
                        className="form-control"
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                        <option value="">Select a Department</option>
                        {department.map((department) => (
                            <option key={department.id} value={department.name}>
                                {department.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="button" className="btn" onClick={handleAdd} style={{ backgroundColor: '#194a82', color: 'white' }}>
                        Add
                    </button>
                </div>
            </form>
        </div>

    );
}
