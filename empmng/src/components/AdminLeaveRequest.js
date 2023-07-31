import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa';

const AdminLeaveRequest = () => {
    const [leavesData, setLeavesData] = useState([])
    useEffect(() => {
        fetchLeavesData();
        // eslint-disable-next-line 
    }, [])

    const fetchLeavesData = async () => {
        const response = await axios.get("http://localhost:5000/api/get/getleaverequests")
        setLeavesData(response.data)
        console.log(leavesData)


    }

    const handleApproval = async (id) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/update/approveleave/${id}`);
            if (response.data.success) {
                fetchLeavesData();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleRejection = async (id) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/update/rejectleave/${id}`);
            if (response.data.success) {
                fetchLeavesData();
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className='container my-5'>

            {
                <table className="table ttable-light shadow-lg p-3 mb-5  rounded ">
                    <thead className="tablebgcolor">
                        <tr>
                            <th style={{ border: 'none' }}>Sr No.</th>
                            <th style={{ border: 'none' }}>First Name</th>
                            <th style={{ border: 'none' }}>Last Name</th>
                            <th style={{ border: 'none' }}>Reason</th>
                            <th style={{ border: 'none' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody className="tablebgcolor" >
                        {
                            leavesData.map((leave, index) => (
                                <tr key={leave.id}>
                                    <td style={{ border: 'none' }}>{index + 1}</td>
                                    <td style={{ border: 'none' }}>{leave.fName}</td>
                                    <td style={{ border: 'none' }}>{leave.lName}</td>
                                    <td style={{ border: 'none' }}>{leave.reason}</td>
                                    <td style={{ border: 'none' }}>
                                        <button type="button" onClick={() => handleApproval(leave.id)}
                                        style={{
                                            background: 'none',
                                            color: '#194a82',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: '19px',
                                          }}>
                                            <FaCheck /> 
                                        </button>
                                        <button type="button" onClick={() => handleRejection(leave.id)}
                                        style={{
                                            background: 'none',
                                            color: '#194a82',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: '19px',
                                          }}>
                                            <FaTimes /> 
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}

export default AdminLeaveRequest
