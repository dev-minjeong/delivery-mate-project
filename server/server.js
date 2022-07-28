// express 불러오기
const express = require('express');
const app = express();
// route.js에 접근
const router = require('./route');
// cors 다른 포트 설정 에러 예방
const cors = require('cors');

// sequelize 연동하기
const sequelize = require('./models').sequelize;
// 클라이언트가 보내는 데이터 읽기 위한 모듈
const bodyParser = require('body-parser');
// 쿠키 기능 적용
const cookieParser = require('cookie-parser');

sequelize.sync();
// Sequelize 이용해 모든 테이블 초기화 하는 기능 -> 조심히 써야함
// sequelize.sync({ force: true })

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/', router);

// 포트 할당하기
const PORT = process.env.PORT || 5001;

// 서버 응답 출력

// app.get('/api/host', (req, res) => {
//   res.send({ host: 'mj😛' });
// });

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server : http://localhost:${PORT}/`);
});
