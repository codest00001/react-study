const dao = require('./dao');

// 모든 아이템 가져오기
exports.getAllItems = async () => {
  return await dao.getAllItems();
};

// 아이템 생성
exports.createItem = async (name, description) => {
  return await dao.createItem(name, description);
};

// 아이템 수정
exports.updateItem = async (id, name, description) => {
  return await dao.updateItem(id, name, description);
};

// 아이템 삭제
exports.deleteItem = async (id) => {
  return await dao.deleteItem(id);
};
