const express = require('express')
const router = express.Router()
const db = require('../Database')

router.put('/updateuser/:id', async (req, res) => {
    const { id } = req.params;
    const { fName, lName, mail, password, project, holiday, department ,date_of_joining } = req.body;
    const sqlUpdate = 'UPDATE employees SET fName = ?, lName = ?, holiday=?, mail = ?,password = ?, project = ?, department = ? , date_of_joining=? WHERE id = ?';
    db.query(sqlUpdate, [fName, lName, holiday, mail, password, project, department,date_of_joining, id], (error, result) => {
        if (error) {
            console.log(error);
            res.json({ success: false });
        } else {
            res.json({ success: true });
        }
    });
});


router.put("/approveleave/:id", async (req, res) => {
    const leaveId = req.params.id;
    const sqlUpdateLeaveStatus = 'UPDATE leaves SET status = "approved" WHERE id = ?';
    db.query(sqlUpdateLeaveStatus, [leaveId], (err, result) => {
      if (err) {
        console.log(err);
        res.json({ success: false, message: "Error updating leave status" });
      } else {
        res.json({ success: true, message: "Leave request approved successfully" });
      }
    });
  });
  
  router.put("/rejectleave/:id", async (req, res) => {
    const leaveId = req.params.id;
    const sqlUpdateLeaveStatus = 'UPDATE leaves SET status = "rejected" WHERE id = ?';
    db.query(sqlUpdateLeaveStatus, [leaveId], (err, result) => {
      if (err) {
        console.log(err);
        res.json({ success: false, message: "Error updating leave status" });
      } else {
        res.json({ success: true, message: "Leave request rejected successfully" });
      }
    });
  });
  

module.exports = router