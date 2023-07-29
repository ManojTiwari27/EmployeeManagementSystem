const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
//const db = require('./Database')

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/login', require('./routes/login'))
app.use('/api/get', require('./routes/get'))
app.use('/api/post', require('./routes/post'))
app.use('/api/delete', require('./routes/delete'))
app.use('/api/update', require('./routes/update'))

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});


// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'employee_db',
// });



// db.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('Connected to XAMPP database');
// });

// app.get('/', (req, res) => {
//   res.send('Welcome to the Employee Management System');
// });



// app.post('/api/admin-login', (req, res) => {
//   const { username, password } = req.body;

//   if (username === 'admin' && password === 'admin@123') {
//     // Admin login
//     res.json({ success: true, isAdmin: true });
//   } else {
//     // Employee login
//     const sql = 'SELECT * FROM employees WHERE mail = ? AND password = ?';
//     db.query(sql, [username, password], (error, results) => {
//       if (error) {
//         console.log(error);
//         res.json({ success: false, message: 'Error logging in' });
//       } else {
//         if (results.length === 0) {
//           res.json({ success: false, message: 'Invalid username or password' });
//         } else {
//           const employeeData = results[0];
//           const project = employeeData.project;


//           const sqlFindMatchingEmployees = 'SELECT * FROM employees WHERE project = ? AND id <> ?';
//           db.query(sqlFindMatchingEmployees, [project, employeeData.id], (error, matchingEmployees) => {
//             if (error) {
//               console.log(error);
//               res.json({ success: false, message: 'Error logging in' });
//             } else {
//               const matchingEmployeeNames = matchingEmployees.map(result => result);
//               res.json({ success: true, isAdmin: false, employeeData, matchingEmployees: matchingEmployeeNames });

//             }
//           });
//         }
//       }
//     });
//   }
// });


// app.post('/api/admin-login', (req, res) => {
//   const { username, password } = req.body;

//   if (username === 'admin' && password === 'admin@123') {
//     // Admin login
//     res.json({ success: true, isAdmin: true });
//   } else {
//     // Employee login
//     const sql = 'SELECT * FROM employees WHERE mail = ? AND password = ?';
//     db.query(sql, [username, password], (error, results) => {
//       if (error) {
//         console.log(error);
//         res.json({ success: false, message: 'Error logging in' });
//       } else {
//         if (results.length === 0) {
//           res.json({ success: false, message: 'Invalid username or password' });
//         } else {
//           const employeeData = results[0];
//           res.json({ success: true, isAdmin: false, employeeData });
//         }
//       }
//     });
//   }
// });



// app.post('/api/employee-login', (req, res) => {
//   const { email } = req.body;
//   const sqlLogin = 'SELECT * FROM employees WHERE mail = ?';
//   db.query(sqlLogin, [email], (error, result) => {
//     if (error) {
//       console.log(error);
//       res.json({ success: false, message: 'Error logging in' });
//     } else {
//       if (result.length === 0) {
//         res.json({ success: false, message: 'Invalid email' });
//       } else {
//         const employeeData = result[0];
//         res.json({ success: true, employeeData });
//       }
//     }
//   });
// });



// app.get('/api/get', async (req, res) => {

//   const sqlGet = 'SELECT * FROM employees';
//   db.query(sqlGet, (error, result) => {
//     res.send(result);
//   })

// });



// app.post('/api/post', async (req, res) => {
//   const fName = req.body.fName;
//   const lName = req.body.lName;
//   const mail = req.body.mail;
//   const project = req.body.project;
//   const password = req.body.password;
//   const department = req.body.department;
//   const sqlCheckEmail = "SELECT * FROM employees WHERE mail = ?";
//   db.query(sqlCheckEmail, [mail], (error, result) => {
//     if (error) {
//       console.log(error);
//       res.json({ success: false, message: 'Error checking email' });
//     } else {
//       if (result.length > 0) {
//         res.json({ success: false, message: 'Email already exists' });
//       } else {
//         const sqlInsert = "INSERT INTO employees (fName, lName, mail, project ,password,department) VALUES (?, ?, ?, ?,?,?)";
//         db.query(sqlInsert, [fName, lName, mail, project, password, department], (err, result) => {
//           if (err) {
//             console.log(err);
//             res.json({ success: false, message: 'Error adding employee' });
//           } else {
//             res.json({ success: true, message: 'Employee added successfully' });
//           }
//         });
//       }
//     }
//   });
// });



// app.delete('/api/remove/:id', async (req, res) => {
//   const { id } = req.params;
//   const sqlremove = "DELETE FROM employees WHERE id = ?"
//   db.query(sqlremove, id, (err, result) => {
//     if (err) {
//       console.log(err);
//       res.json({ success: false });
//     } else {
//       res.json({ success: true });
//     }
//   })
// })



// app.get('/api/get/:id', async (req, res) => {
//   const { id } = req.params;
//   const sqlGet = 'SELECT * FROM employees WHERE id = ?';
//   db.query(sqlGet, [id], (error, result) => {
//     if (error) {
//       console.log(error);
//     } else {
//       const employeeData = result[0];
//       res.json(employeeData);
//     }
//   });
// });



// app.put('/api/update/:id', async (req, res) => {
//   const { id } = req.params;
//   const { fName, lName, mail, password, project, holiday, department } = req.body;
//   const sqlUpdate = 'UPDATE employees SET fName = ?, lName = ?, holiday=?, mail = ?,password = ?, project = ?, department = ? WHERE id = ?';
//   db.query(sqlUpdate, [fName, lName, holiday, mail, password, project, department, id], (error, result) => {
//     if (error) {
//       console.log(error);
//       res.json({ success: false });
//     } else {
//       res.json({ success: true });
//     }
//   });
// });