const express = require('express');
const router = express.Router();
const db = require('../Database')



router.post('/admin-login', (req, res) => {
    const { username, password } = req.body;
    

    if (username === 'admin' && password === 'admin@123') {
        // Admin login
        res.json({ success: true, isAdmin: true });
    } else {
        // Employee login
        const sql = 'SELECT * FROM employees WHERE mail = ? AND password = ?';
        db.query(sql, [username, password], (error, results) => {
            if (error) {
                console.log(error);
                res.json({ success: false, message: 'Error logging in' });
            } else {
                if (results.length === 0) {
                    res.json({ success: false, message: 'Invalid username or password' });
                } else {
                    const employeeData = results[0];
                    const project = employeeData.project;


                    const sqlFindMatchingEmployees = 'SELECT * FROM employees WHERE project = ? AND id <> ?';
                    db.query(sqlFindMatchingEmployees, [project, employeeData.id], (error, matchingEmployees) => {
                        if (error) {
                            console.log(error);
                            res.json({ success: false, message: 'Error logging in' });
                        } else {
                            const matchingEmployeeNames = matchingEmployees.map(result => result);
                            res.json({ success: true, isAdmin: false, employeeData, matchingEmployees: matchingEmployeeNames });

                        }
                    });
                }
            }
        });
    }
});
module.exports = router