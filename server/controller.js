const path = require('path');
const model = require('./model');

const salt = require(path.join(__dirname, 'config', 'db.json')).salt;

const hashing = require(path.join(__dirname, 'config', 'hashing.js'));

const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
const now_date = moment().format('YYYY-MM-DD HH:mm:ss');

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
          obj['suc'] = result[0].dataValues;
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
    category: (req, res) => {
      const body = req.body;

      model.add.category(body, (result) => {
        let obj = {};
        if (result) {
          obj['suc'] = true;
          obj['msg'] = '카테고리 생성!';
        } else {
          obj['suc'] = false;
          obj['msg'] = '이미 존재하는 카테고리 입니다';
        }
        res.send(obj);
      });
    },
    user: (req, res) => {
      const body = req.body;
      const hash_pw = hashing.enc(body.id, body.password, salt);

      model.add.user(body, hash_pw, now_date, (result) => {
        res.send(result);
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
      const body = req.body;

      model.get.board_cnt(body, (cnt) => {
        const result = { cnt: cnt };
        res.send(result);
      });
    },
    board_data: (req, res) => {
      const body = req.body;

      model.get.board_data(body, (data) => {
        // res.send(data);
        const result = { data: data };
        res.send(result);
      });
    },
    category: (req, res) => {
      model.get.category((data) => {
        res.send(data);
      });
    },
  },
  update: {
    view_cnt: (req, res) => {
      const body = req.body;

      const expires = new Date();
      expires.setDate(expires.getDate() + 1); // 하루마다 쿠키 삭제

      const cookie_name = `board_${body.id}`;
      const exist_cookie = req.cookies[cookie_name];
      if (!exist_cookie) {
        res.cookie(cookie_name, true, { expires: expires });
        model.update.view_cnt(body, (result) => {
          if (result) {
            res.send(true);
          }
        });
      } else {
        res.send(false);
      }
    },
  },
  delete: {
    category: (req, res) => {
      const body = req.body;

      model.delete.category(body, (result) => {
        if (result) {
          res.send(result);
        }
      });
    },
  },
  modify: {
    category: (req, res) => {
      const body = req.body;

      model.modify.category(body, (result) => {
        let obj = {};
        if (result) {
          obj['suc'] = true;
          obj['msg'] = '카테고리 변경!';
        } else {
          obj['suc'] = false;
          obj['msg'] = '이미 존재하는 카테고리 입니다';
        }
        res.send(obj);
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
