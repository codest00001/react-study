// models/index.js

const { Sequelize } = require('sequelize');

// Sequelize 인스턴스 생성 (PostgreSQL 연결)
const sequelize = new Sequelize('yourdatabase', 'postgres', 'yourpassword', {
  host: 'localhost',
  dialect: 'postgres',
});

const models = {
  sequelize,
  Sequelize,
};

// 모델을 가져오고 연결
models.User = require('./user')(sequelize, Sequelize);
models.Post = require('./post')(sequelize, Sequelize);

module.exports = models;
