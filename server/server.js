// express 불러오기
const express = require('express');
const app = express();

// sequelize 연동하기
const sequelize = require('./models').sequelize;
// 클라이언트가 보내는 데이터 읽기 위한 모듈
const bodyParser = require('body-parser');

sequelize.sync();
// Sequelize 이용해 모든 테이블 초기화 하는 기능 -> 조심히 써야함
// sequelize.sync({ force: true })

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

app.get('/get/data', (req, res) => {
  // findAll - 여러 데이터 조회, Array형태로 데이터 보냄 -> map 정상적 작동
  Teacher.findAll({
    // 특정 데이터 조회 시 사용
    // where: { name: 'kmj' },
    // 여러 조건 설정 - id가 1이거나  name이 minjeong인 조건
    // 'Op.or'은 'Sequelized'에서 'OR연산자'를 사용해 데이터 조회하는 메소드
    // where: { [Op.or]: [{ id: 1 }, { name: 'minjeong' }] },
  })
    // findOne - 하나의 데이터 조회, Object 형태로 데이터 전송 -> map 사용시 오류
    /* 
  Teacher.findOne({
    where: { id: 4 },
  })
   */
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      throw err;
    });
});

// 데이터 변경
app.post('/modify/data', (req, res) => {
  Teacher.update(
    { name: req.body.modify.name },
    {
      where: { id: req.body.modify.id },
    }
    // 여러개의 데이터 값 변경
    /* 
    { name: 'minj' },
    {
      where: { [Op.or]: [{ id: 1 }, { name: 'ming' }] },
    }
     */
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      throw err;
    });
});

app.post('/delete/data', (req, res) => {
  console.log(req.body.delete);
  // destroy는 Sequelize를 이용해 데이터 삭제하는 메소드
  Teacher.destroy({
    where: { id: req.body.delete.id },
  })
    .then(res.sendStatus(200))
    .catch((err) => {
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
