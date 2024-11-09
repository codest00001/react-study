// routes/userRoute.js

const express = require('express');
const router = express.Router();
const { User } = require('../models');

// 사용자 목록 조회
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 사용자 생성
router.post('/', async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
