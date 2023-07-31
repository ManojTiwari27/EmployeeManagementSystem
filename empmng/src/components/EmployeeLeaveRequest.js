import { useState } from "react"
import React from 'react'
import axios from "axios"
import { useEffect } from "react"


const EmployeeLeaveRequest = ({ empInfo, setempInfo }) => {
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');
    const [leavesData, setLeavesData] = useState([])
    // const empid = empInfo.id;


    useEffect(() => {
        fetchLeavesData();
        // eslint-disable-next-line 
    }, [empInfo])




    const fetchLeavesData = async () => {
        const response = await axios.get(`http://localhost:5000/api/get/getleaverequests/${empInfo.id}`)
        setLeavesData(response.data)

    }

    const handleSubmit = async () => {
        const leavesData = {
            id: empInfo.id,
            fName: empInfo.fName,
            lName: empInfo.lName,
            reason: reason
        }

        try {
            const response = await axios.post("http://localhost:5000/api/post/insertleavesdata", leavesData)
            console.log(response.data)
            if (response.data.success) {
                setMessage(response.data.message)
                setReason('')
                fetchLeavesData();
            }

            console.log(leavesData)
        } catch (err) {
            console.log(err)
        }

    }
    
    return (
        <div className="container my-5">

            <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label htmlFor="leavereason">Enter reason for leave:</label>
                    <input type="text" value={reason} className="form-control" id="leavereason" onChange={(e) => { setReason(e.target.value) }} placeholder="Enter reason for leave: " />
                </div>
                {message && <div>{message}</div>}
                <div className="d-flex justify-content-center">
                        <button type="submit" className="btn" style={{ backgroundColor: '#194a82', color: '#fff' }} onClick={handleSubmit}>Submit</button>
                </div>
            </form>

            <div className="container mt-4" style={{ backgroundColor: '#000' }}>
                <h2 className=" d-flex justify-content-center align-items-center" style={{ color: '#fff' }}>Your Leave Requests:</h2>
                <div className="card-deck mt-4" >
                    {leavesData.map((leave) => (
                        <div className="card mb-4" key={leave.id}>
                            <div className="card-body" style={{ backgroundColor: '#ccf5ff' }}>
                                <h5 className="card-title">Leave Request</h5>
                                <p className="card-text">Reason: {leave.reason}</p>
                                <p className="card-text">Status: {leave.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default EmployeeLeaveRequest
