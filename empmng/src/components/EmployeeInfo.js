import React from 'react';
import './EmployeeInfo.css'
import { Link } from 'react-router-dom';

export default function EmployeeInfo({ empInfo, empprojectinfo, handleEmployeeLogout }) {
    const calculateWorkExperience = () => {
        const currentDate = new Date();
        const joiningDate = new Date(empInfo.date_of_joining);


        const yearDiff = currentDate.getFullYear() - joiningDate.getFullYear();
        const monthDiff = currentDate.getMonth() - joiningDate.getMonth();
        const dayDiff = currentDate.getDate() - joiningDate.getDate();


        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            return `${yearDiff - 1} years ${12 - joiningDate.getMonth() + currentDate.getMonth()} months and ${currentDate.getDate()} days`;
        } else {
            return `${yearDiff} years ${monthDiff} months and ${dayDiff} days`;
        }
    };
    return (

        <div className='bgcolor'>

            <div className="container page">
                <div className="d-flex justify-content-end mb-3">
                    <Link to="/leaverequest" className="button mt-5 mr-3 mx-2">
                        Leave Request
                    </Link>
                    <button className="button mt-5 mx-2" onClick={handleEmployeeLogout}>
                        Logout
                    </button>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-header bg-dark text-white">
                                <h1 className="mb-0 ">Your Information!</h1>
                            </div>
                            <div className="card-body cardbgcolor">
                                <div className="card cardbgcolor text-dark">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <p><strong>First Name:</strong> {empInfo.fName}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <p><strong>Last Name:</strong> {empInfo.lName}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <p><strong>Email:</strong> {empInfo.mail}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <p><strong>Password:</strong> {empInfo.password}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-12">
                                                <p>
                                                    <strong>Date of joining:</strong>{" "}
                                                    {new Date(empInfo.date_of_joining).toLocaleDateString("en-GB")}
                                                </p>
                                                <p className='my-2'>
                                                    <strong>Work Experience:</strong> {calculateWorkExperience()} of work Experience
                                                </p>
                                            </div>
                                            <div className="col-md-12 my-2">
                                                <p><strong>Project:</strong> {empInfo.project}</p>
                                            </div>
                                            <div className="col-md-12 my-1">
                                                <p><strong>Department:</strong> {empInfo.department}</p>
                                            </div>
                                            <div className="col-md-12">
                                                <p><strong>Leaves:</strong> {empInfo.holiday}</p>
                                                <p>You have <b>{empInfo.holiday} </b> leaves remaining out of <b>21</b>, and your salary will not be deducted for this.</p>
                                            </div>
                                            <div className="col-md-24 d-flex justify-content-center">
                                                <Link to={`/update/${empInfo.id}`} className="btn btn-dark" role="button">
                                                    Update
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card mt-2 shadow">
                            <div className="card-header bg-dark text-white">
                                <h3 className="mb-0">Your Team Members working on the same project:</h3>
                            </div>
                            <div className="card-body cardbgcolor">
                                <table className="table table-bordered table-striped table-hover bg-light">
                                    <thead className="thead-light cardbgcolor">
                                        <tr>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th>Project</th>
                                        </tr>
                                    </thead>
                                    <tbody className="cardbgcolor">
                                        {empprojectinfo ? (
                                            empprojectinfo.map((employee) => (
                                                <tr key={employee.id}>
                                                    <td>{employee.fName}</td>
                                                    <td>{employee.lName}</td>
                                                    <td>{employee.mail}</td>
                                                    <td>{employee.project}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4">Loading...</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
