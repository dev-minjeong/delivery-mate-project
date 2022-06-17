// express 불러오기
const express = require('express');
const app = express();

// 포트 할당하기
const PORT = process.env.PORT || 4000;

// 서버 응답 출력
app.get('/api/host', (req, res) => {
  res.send({ host: 'minjeong' });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server : http://localhost:${PORT}`);
});
