// models/post.js

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users', // 'User' 모델과 관계를 설정
          key: 'id',
        },
      },
    });
  
    // User와 Post 모델은 관계가 있으므로, 관계를 정의해줍니다.
    Post.associate = (models) => {
      Post.belongsTo(models.User, { foreignKey: 'userId' });
    };
  
    return Post;
  };
  