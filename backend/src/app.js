const express = require('express');
const healthRoutes = require('./routes/healthRoutes');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const fileRoutes =require('./routes/fileRoutes');
const updateProfileRoutes =require('./routes/updateProfileRoutes')
const profileRoutes=require('./routes/profileRoutes')

const app = express();
app.use(cors({
    origin: 'http://localhost:5174'
}));

app.use(express.json());

app.use('/health', healthRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/files',fileRoutes);
app.use ('/api/profileupdate',updateProfileRoutes);
app.use('/api/profile',profileRoutes);
module.exports = app;