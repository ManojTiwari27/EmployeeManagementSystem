import React, { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import axios from 'axios';

export default function Projects({ projects, updateProjects }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [addedproject, setaddedProject] = useState('');


  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/get/getusers');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };


  const openModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const containerStyle = {
    backgroundColor: '#ccf5ff'
  };
  const containerStylenxt = {
    backgroundColor: '#b3f0ff'
  };
  const handleAdd = async () => {
    try {
      //console.log(project);
      const response = await axios.post('http://localhost:5000/api/post/insertprojectdata', { name: addedproject });
      //console.log('Response data:', response.data);
      if (response.data.success) {
        setaddedProject('');
        updateProjects([...projects, { id: response.data.id, name: addedproject }]);
        //console.log(project);
        //console.log('Project added successfully!');

      } else {
        console.log('Failed to add project:', response.data.message);
      }
    } catch (error) {
      console.log('Error adding project:', error.message);
    }
  };



  return (
    <div className="container my-5">
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <input style={containerStyle} type="text" value={addedproject} onChange={(e) => { setaddedProject(e.target.value); }} className="form-control" id="projectname" placeholder="Enter project name" />
          </div>
          <div className="text-center my-3">
            <button type="submit" onClick={handleAdd} className="btn btn" style={{ backgroundColor: '#194a82', color: 'white' }}>Add</button>
          </div>

        </form>
      </div>
      <table className="table ttable-light shadow-lg p-3 mb-5  rounded" style={containerStyle}>
        <thead>
          <tr>
            <th scope="col">Project</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td style={{ textAlign: 'left' }}>{project.name}</td>
              <td>
                <button className="btn my-2 mx-2" style={{
                  background: 'none',
                  color: '#194a82',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '19px'
                }} onClick={() => openModal(project)}>
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedProject && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', marginTop: '50px' }} >
          <div className="modal-dialog" role="document">
            <div className="modal-content" >
              <div className="modal-header" style={containerStyle}>
                <h5 className="modal-title">{selectedProject.name}</h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body" style={containerStylenxt}>
                <h6>Employees:</h6>
                {employees
                  .filter((emp) => emp.project === selectedProject.name)
                  .map((emp) => (
                    <div key={emp.id}>{`${emp.fName} ${emp.lName}`}</div>
                  ))}
              </div>
              <div className="modal-footer" style={containerStyle}>
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
