// app.js 예시
const express = require('express');
const models = require('./models');  // Sequelize 모델을 가져옵니다.
const userRoute = require('./routes/userRoute');  // 사용자 관련 라우트
const postRoute = require('./routes/postRoute');  // 게시물 관련 라우트
const authRoute = require('./routes/authRoute');  // 인증 관련 라우트

const app = express();
const PORT = 5000;

// JSON 형식의 요청 본문 처리
app.use(express.json());

// 라우터 설정
app.use('/users', userRoute);
app.use('/posts', postRoute);
app.use('/auth', authRoute);

// 서버 실행 및 DB 연결 확인
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  models.sequelize.sync({ force: false })  // DB와 모델 동기화
    .then(() => {
      console.log('DB connected');
    })
    .catch((err) => {
      console.log('DB connection error:', err);
      process.exit();
    });
});
