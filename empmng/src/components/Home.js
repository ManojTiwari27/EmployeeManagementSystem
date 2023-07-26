import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from "axios";
import { SearchContext } from "../context/SearchState";


export default function Home() {
  const context = useContext(SearchContext)
  // eslint-disable-next-line
  const { searchQuery, setSearchQuery } = context
  const [employees, setEmployees] = useState([]);
  // const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/get/getusers");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:5000/api/delete/removeuser/${id}`);
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const fullName = emp.fName + " " + emp.lName;
    const emailMatch = emp.mail.toLowerCase().includes(searchQuery.toLowerCase());
    const projectMatch = emp.project.toLowerCase().includes(searchQuery.toLowerCase());
    return fullName.toLowerCase().includes(searchQuery.toLowerCase()) || emailMatch || projectMatch;
  });

  return (
    <div className="container my-5 "  >
      {/* <div className="mb-3">
        <input
          type="text"
          className="form-control"
          id="searchQuery"
          value={searchQuery}
          placeholder="Search employee here"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div> */}
      {filteredEmployees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table className="table ttable-light shadow-lg p-3 mb-5  rounded">
          <thead className="tablebgcolor">
            <tr>
              <th scope="col">Sr.No</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="tablebgcolor" >
            {filteredEmployees.map((emp, index) => (
              <tr key={emp.id}>
                <th scope="row">{index + 1}</th>
                <td>{emp.fName}</td>
                <td>{emp.lName}</td>
                <td>{emp.mail}</td>
                <td>
                  <Link
                    to={`/update/${emp.id}`}
                    className="btn my-2 mx-2" style={{
                      background: 'none',
                      color: '#194a82',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '19px'
                    }}
                    role="button"
                  >
                    <FaEdit className="mr-1" />
                  </Link>
                  <button
                    type="button"
                    className="btn my-2 mx-2" style={{
                      background: 'none',
                      color: '#194a82',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '19px'
                    }}
                    onClick={() => handleDelete(emp.id)}
                  >
                    <FaTrash className="mr-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
