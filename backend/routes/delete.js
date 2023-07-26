const express = require('express')
const router = express.Router()
const db = require('../Database')

router.delete('/removeuser/:id', async (req, res) => {
    const { id } = req.params;
    const sqlremove = "DELETE FROM employees WHERE id = ?"
    db.query(sqlremove, id, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ success: false });
        } else {
            res.json({ success: true });
        }
    })
})


module.exports = router