const express = require('express');
const router = express.Router();
const db = require('../Database')


router.post('/insertempdata', async (req, res) => {
    const {fName,lName,mail,project,password,department,date_of_joining}=req.body;
    const sqlCheckEmail = "SELECT * FROM employees WHERE mail = ?";
    db.query(sqlCheckEmail, [mail], (error, result) => {
        if (error) {
            console.log(error);
            res.json({ success: false, message: 'Error checking email' });
        } else {
            if (result.length > 0) {
                res.json({ success: false, message: 'Email already exists' });
            } else {
                const sqlInsert = "INSERT INTO employees (fName, lName, mail, project ,password,department,date_of_joining) VALUES (?, ?, ?, ?,?,?,?)";
                db.query(sqlInsert, [fName, lName, mail, project, password, department ,date_of_joining], (err, result) => {
                    if (err) {
                        console.log(err);
                        res.json({ success: false, message: 'Error adding employee' });
                    } else {
                        res.json({ success: true, message: 'Employee added successfully' });
                    }
                });
            }
        }
    });
});

router.post('/insertprojectdata' , async(req,res)=>{
    const project = req.body
    // console.log(project)
    const sqlInsertProject ='INSERT INTO projects (name) VALUES (?)'
    db.query(sqlInsertProject ,[project.name],(err,result)=>{
        if(err){
            console.log(err)
            res.json({success:false ,message:'error adding project'})
        }else{
            res.json({success: true ,message:'project added succesfully'})
        }
    })

})



module.exports = router