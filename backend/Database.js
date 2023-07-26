const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db',
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to XAMPP database');
});

module.exports = db;