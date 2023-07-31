const express = require('express');
const router = express.Router();
const db = require('../Database')


router.get('/getusers', async (req, res) => {

    const sqlGet = 'SELECT * FROM employees';
    db.query(sqlGet, (error, result) => {
        res.send(result);
    })

});

router.get('/getuser/:id', async (req, res) => {
    const { id } = req.params;
    const sqlGet = 'SELECT * FROM employees WHERE id = ?';
    db.query(sqlGet, [id], (error, result) => {
        if (error) {
            console.log(error);
        } else {
            const employeeData = result[0];
            res.json(employeeData);
        }
    });
});

router.get('/getprojects', async(req,res)=>{
    sqlGetProjects = 'SELECT * from projects';
    db.query(sqlGetProjects,(error,result)=>{
        if(error){
            console.log(error);
        }else{
            res.send(result)
        }
    })
})

router.get('/employee-info/:id', (req,res) => {
    const employeeId = req.params.id;
  
    const sqlFindEmployee = 'SELECT * FROM employees WHERE id = ?';
    db.query(sqlFindEmployee, [employeeId], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error fetching employee info' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ success: false, message: 'Employee not found' });
        } else {
          const employeeData = results[0];
          const project = employeeData.project;
  
          const sqlFindMatchingEmployees = 'SELECT * FROM employees WHERE project = ? AND id <> ?';
          db.query(sqlFindMatchingEmployees, [project, employeeId], (error, matchingEmployees) => {
            if (error) {
              console.log(error);
              res.status(500).json({ success: false, message: 'Error fetching matching employees' });
            } else {
              const matchingEmployeeNames = matchingEmployees.map(result => result);
              res.json({ success: true, employeeData, matchingEmployees: matchingEmployeeNames });
            }
          });
        }
      }
    });
  });

  router.get('/getleaverequests',async(req,res)=>{
    const sqlGetLeaves = 'SELECT * from leaves'
    db.query(sqlGetLeaves,(err,result)=>{
      if(err){
        console.log(err)
        res.json({success:false,message:'error getting data'})
      }
      else{
        res.send(result);
      }
    })

  })
  router.get('/getleaverequests/:id',async(req,res)=>{
    const id =req.params.id
    const sqlGetLeaves = 'SELECT * from leaves WHERE id = ?'
    db.query(sqlGetLeaves, [id] ,(err,result)=>{
      if(err){
        console.log(err)
        res.json({success:false,message:'error getting data'})
      }
      else{
        res.send(result);
      }
    })

  })

module.exports = router