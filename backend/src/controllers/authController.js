const pool = require('../db/postgres');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {

    const { name, email, password } = req.body;
 
    const existingUser = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: 'Email already registered'
    });
}

const hashedPassword = await bcrypt.hash(password, 10);
const newUser = await pool.query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, created_at`,
    [name, email, hashedPassword]
);
console.log("uioi",newUser);
res.status(201).json({
    message: 'User created successfully',
    user: newUser.rows[0]
});

};
const login = async (req, res) => {
    const { email,password }=req.body;

   const userResult = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
    if (userResult.rows.length === 0) {
        return res.status(401).json({
            message: 'Invalid email or password'
        });
    }
    const user = userResult.rows[0];

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!isPasswordValid) {
        return res.status(401).json({
            message: 'Invalid email or password'
        });
    }
    const token = jwt.sign(
    {
        userId: user.id,
        email: user.email
    },
    process.env.JWT_SECRET,
    {
        expiresIn: '1d'
    }
);

    res.json({
    message: 'Login successful',
    token
});
    
};

module.exports = {signup , login };