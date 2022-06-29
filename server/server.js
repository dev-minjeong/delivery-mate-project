// express 불러오기
const express = require('express');
const app = express();

// sequelize 연동하기
const sequelize = require('./models').sequelize;
// 클라이언트가 보내는 데이터 읽기 위한 모듈
const bodyParser = require('body-parser');

sequelize.sync();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Teacher 테이블을 서버로 가져와 읽을 수 있도록 함
const {
  Teacher,
  Sequelize: { Op },
} = require('./models');
sequelize.query('SET NAMES utf8;');
// Teacher 테이블을 서버에서 읽어올 수 있게 함
app.post('/add/data', (req, res) => {
  console.log(req.body);
  Teacher.create({
    name: req.body.data,
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
});
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
