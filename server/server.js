// express 불러오기
const express = require('express');
const app = express();

// sequelize 연동하기
const sequelize = require('./models').sequelize;
sequelize.sync();

app.use(express.json());

// 포트 할당하기
const PORT = process.env.PORT || 5000;

// 서버 응답 출력

app.get('/api/host', (req, res) => {
  res.send({ host: 'mj😛' });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server : http://localhost:${PORT}/`);
});
