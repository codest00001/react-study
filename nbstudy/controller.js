const service = require('./service');

// 모든 아이템 가져오기
exports.getItems = async (req, res) => {
  try {
    const items = await service.getAllItems();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving items' });
  }
};

// 아이템 생성
exports.createItem = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newItem = await service.createItem(name, description);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating item' });
  }
};

// 아이템 수정
exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updatedItem = await service.updateItem(id, name, description);
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item' });
  }
};

// 아이템 삭제
exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    await service.deleteItem(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item' });
  }
};
