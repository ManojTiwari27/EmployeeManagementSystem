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


module.exports = router