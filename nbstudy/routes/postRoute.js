// routes/postRoute.js

const express = require('express');
const router = express.Router();
const { Post } = require('../models');

// 게시물 목록 조회
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 게시물 생성
router.post('/', async (req, res) => {
  const { title, content, userId } = req.body;
  try {
    const post = await Post.create({ title, content, userId });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
