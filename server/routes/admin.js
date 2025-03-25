const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Admin = require('../models/Admin');

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ where: { username } });
  if (!admin) return res.status(400).json({ message: 'Invalid username' });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

  const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});
// Create Admin (one-time)
router.post('/create-admin', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if admin exists
      const existingAdmin = await Admin.findOne({ where: { username } });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Admin already exists' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create admin
      const newAdmin = await Admin.create({ username, password: hashedPassword });
  
      res.status(201).json({ message: 'Admin created successfully', admin: newAdmin.username });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
module.exports = router;
