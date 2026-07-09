const express = require('express');
const pool = require('../db/postgres');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send("Hi there, its stuti").end();
});

router.get('/db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');

        res.status(200).json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Database connection failed'
        });
    }
});

module.exports = router;