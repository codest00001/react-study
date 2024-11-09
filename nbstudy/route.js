const express = require('express');
const router = express.Router();
const controller = require('./controller');

// CRUD 기능을 위한 API 엔드포인트 설정
router.get('/items', controller.getItems); // 모든 아이템 가져오기
router.post('/items', controller.createItem); // 아이템 생성
router.put('/items/:id', controller.updateItem); // 아이템 수정
router.delete('/items/:id', controller.deleteItem); // 아이템 삭제

module.exports = router;
