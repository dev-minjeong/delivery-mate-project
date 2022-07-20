const path = require('path');
const model = require('./model');

const salt = require(path.join(__dirname, 'config', 'db.json')).salt;

const hashing = require(path.join(__dirname, 'config', 'hashing.js'));

// const AWS = require('aws-sdk');
// AWS.config.loadFromPath(
// loadFromPath로 json파일을 path모듈로 연결
// path.join(__dirname, 'config', 'awsConfig.json')
// );

module.exports = {
  api: {
    sendPw: (req, res) => {
      const body = req.body;
      const hash = hashing.enc(body.id, body.password, salt);

      model.api.searchInfo(body, hash, (result) => {
        let obj = {};
        if (result[0]) {
          obj['suc'] = true;
          obj['msg'] = '로그인 성공!';
        } else {
          obj['suc'] = false;
          obj['msg'] = '로그인 실패!';
        }
        res.send(obj);
      });
      // console.log(`1. salt 합한 값 : ${body.id}${body.password}${salt}`);
      // console.log(`2. salt 값 : ${salt}`);
      // console.log(`3. hash 결과 : ${hash}`);
    },
  },
  add: {
    board: (req, res) => {
      const body = req.body;

      model.add.board(body, (result) => {
        if (result) {
          res.send(true);
        }
      });
    },
  },
  get: {
    board: (req, res) => {
      const body = req.body;

      model.get.board(body, (result) => {
        if (result) {
          res.send(result);
        }
      });
    },
    board_cnt: (req, res) => {
      model.get.board_cnt((cnt) => {
        const result = { cnt: cnt };
        res.send(result);
      });
    },
  },
};

// 모듈화 및 외부 접근 가능
/* 
module.exports = {
  api: {
    getData: (req, res) => {
      model.api.getData((data) => {
        if (data) {
          res.send(data);
        }
      });
    },
    addData: (req, res) => {
      const body = req.body;
      model.api.addData(body, (data) => {
        if (data) {
          res.send(data);
        }
      });
    },
    modifyData: (req, res) => {
      const body = req.body;
      model.api.modifyData(body, (data) => {
        if (data) {
          res.send(data);
        }
      });
    },
    deleteData: (req, res) => {
      const body = req.body;
      model.api.deleteData(body, (data) => {
        if (data) {
          res.send(data);
        }
      });
    },
  },
};
 */
