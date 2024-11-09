const { Client } = require('pg');

// PostgreSQL 연결 설정
const client = new Client({
  user: 'nbstudy1',    // 자신의 PostgreSQL 유저명
  host: 'localhost',
  database: 'nbstudy1',  // 사용할 데이터베이스 이름
  password: 'admin1234!',  // PostgreSQL 비밀번호
  port: 5432,
});

client.connect();

// 모든 아이템 가져오기
exports.getAllItems = async () => {
  const res = await client.query('SELECT * FROM items');
  return res.rows;
};

// 아이템 생성
exports.createItem = async (name, description) => {
  const res = await client.query(
    'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
    [name, description]
  );
  return res.rows[0];
};

// 아이템 수정
exports.updateItem = async (id, name, description) => {
  const res = await client.query(
    'UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *',
    [name, description, id]
  );
  return res.rows[0];
};

// 아이템 삭제
exports.deleteItem = async (id) => {
  await client.query('DELETE FROM items WHERE id = $1', [id]);
};
