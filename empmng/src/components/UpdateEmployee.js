import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { departmentContext } from '../context/DepartmentState';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AddEmployee.css'

export default function UpdateEmployee({ projects, updateEmployeeInfo, empinfo, isEmployeeLogin }) {
    const { id } = useParams()
    const context = useContext(departmentContext);
    // eslint-disable-next-line 
    const { department, setDepartment } = context
    const navigate = useNavigate();
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [holiday, setHoliday] = useState(0);
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('')
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/get/getuser/${id}`);
                const employeeData = response.data;
                setFName(employeeData.fName);
                setLName(employeeData.lName);
                setEmail(employeeData.mail);
                setPassword(employeeData.password)
                setSelectedProject(employeeData.project);
                setHoliday(employeeData.holiday);
                setSelectedDepartment(employeeData.department);
                setSelectedDate(new Date(employeeData.date_of_joining))


            } catch (error) {
                console.error('Error fetching employee data:', error);
            }

        };

        fetchEmployeeData();
    }, [id]);
    const handleUpdate = async () => {
        try {
            const updatedEmployee = {
                ...empinfo,
                fName: fName,
                lName: lName,
                mail: email,
                password: password,
                project: selectedProject,
                holiday: holiday,
                department: selectedDepartment,
                date_of_joining: selectedDate,
            };
            await axios.put(`http://localhost:5000/api/update/updateuser/${id}`, updatedEmployee);
            updateEmployeeInfo(updatedEmployee);

        } catch (error) {
            console.error('Error updating employee data:', error);
        }
        navigate('/')

    };

    const containerStyle = {
        backgroundColor: '#ccf5ff',
    };



    return (
        <div className="container my-5 shadow-lg p-3 mb-5 rounded" style={containerStyle}>
            <form style={containerStyle}>
                <div className="row" >
                    <div className="col">
                        <input
                            style={containerStyle}
                            onChange={(e) => setFName(e.target.value)}
                            type="text"
                            value={fName}
                            className="form-control"
                            placeholder="First name"
                            required
                        />
                    </div>
                    <div className="col">
                        <input
                            style={containerStyle}
                            onChange={(e) => setLName(e.target.value)}
                            type="text"
                            value={lName}
                            className="form-control"
                            placeholder="Last name"
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col my-3" >
                        <input
                            style={containerStyle}
                            disabled={isEmployeeLogin ? true : false}
                            onChange={(e) => setHoliday(e.target.value)}
                            type="number"
                            value={holiday}
                            className="form-control"
                            id="holiday"
                            placeholder="Enter number of leaves remaining"
                            required
                        />
                    </div>
                    <div className="col my-3">
                        <DatePicker
                            disabled={isEmployeeLogin ? true : false}
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            placeholderText="Select a date"
                            className="form-control datepicker"
                            dateFormat="yyyy-MM-dd"
                            calendarClassName="custom-datepicker-calendar"
                            showYearDropdown
                            scrollableYearDropdown
                            showMonthDropdown

                        />
                    </div>
                </div>


                <div className="form-group">
                    <input
                        style={containerStyle}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        value={email}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        required
                    />

                </div>

                <div className="form-group">
                    <input style={containerStyle} type="password" className="form-control" id="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <select disabled={isEmployeeLogin ? true : false} style={containerStyle} className="form-control" value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
                        <option value="">Select a Project</option>
                        {projects.map((project) => (
                            <option key={project.id} value={project.name}>
                                {project.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <select disabled={isEmployeeLogin ? true : false} style={containerStyle} className="form-control" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
                        <option value="">Select a Department</option>
                        {department.map((department) => (
                            <option key={department.id} value={department.name}>
                                {department.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="row mt-5">
                    <div className="col-md-12 d-flex justify-content-center">
                        <button type="button" className="btn btn-dark" onClick={handleUpdate}>
                            Update
                        </button>
                    </div>
                </div>
            </form >
        </div>


    );
}
