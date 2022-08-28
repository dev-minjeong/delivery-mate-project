const path = require('path');
const model = require('./model');

const salt = require(path.join(__dirname, 'config', 'db.json')).salt;

const hashing = require(path.join(__dirname, 'config', 'hashing.js'));

const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
const now_date = moment().format('YYYY-MM-DD HH:mm:ss');

const user_ip = require('ip');

// 이메일 전송
const nodeMailer = require('nodemailer');
// 이메일 발송 서비스 환경설정
const mailPoster = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: '',
    pass: '',
  },
});
// 이메일 받을 유저설정
const mailOption = (user_data, title, contents) => {
  const mail_options = {
    from: '',
    to: user_data.email,
    subject: title,
    text: contents,
  };
  return mail_options;
};
// 메일 전송
const sendMail = (mailOpt) => {
  mailPoster.sendMail(mailOpt, function (error, info) {
    if (error) {
      console.log('에러!' + error);
    } else {
      console.log('전송 완료!' + info.response);
    }
  });
};

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
          obj['ip'] = user_ip.address();
        } else {
          obj['suc'] = false;
          obj['msg'] = '로그인 실패!';
        }
        res.send(obj);
      });
    },
  },
  search: {
    id: (req, res) => {
      const body = req.body;

      model.search.id(body, (result) => {
        res.send(result);
      });
    },
    pw: (req, res) => {
      const body = req.body;

      model.search.pw(body, (result) => {
        let resData = {};

        if (result[0]) {
          const title = '비밀번호 인증 코드';
          const contents = () => {
            let number = '';
            let random = 0;
            for (let i = 0; i < 6; i++) {
              random = Math.round(Math.random() * (9 - 0) + 0);
              number += random;
            }
            resData['secret'] = number;
            return `6자리 인증코드 입니다. ${number}`;
          };
          const mailOpt = mailOption(result[0].dataValues, title, contents());
          sendMail(mailOpt);

          resData['result'] = result;
          res.send(resData);
        } else {
          res.send(false);
        }
      });
    },
  },
  add: {
    board: (req, res) => {
      const body = req.body;

      model.add.board(body, now_date, (result) => {
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
    reply: (req, res) => {
      const body = req.body;

      model.add.reply(body, now_date, (result) => {
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
        res.send(data);
      });
    },
    category: (req, res) => {
      model.get.category((data) => {
        res.send(data);
      });
    },
    pre_next: (req, res) => {
      const body = req.body;
      model.get.pre_next(body, (data) => {
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
    pw: (req, res) => {
      const body = req.body;
      const hash_pw = hashing.enc(body.user_id, body.change_password, salt);

      model.update.pw(body, hash_pw, (result) => {
        res.send(true);
      });
    },
    like: (req, res) => {
      const body = req.body;

      model.check.like(body, (data) => {
        if (data.length === 0) {
          model.update.like(body, (result) => {
            res.send(result);
          });
        } else {
          if (body.type === 'remove') {
            model.update.like(body, (result) => {
              res.send(result);
            });
          } else {
            res.send(false);
          }
        }
      });
    },
    board: (req, res) => {
      const body = req.body;

      model.update.board(body, (data) => {
        res.send(true);
      });
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
    board: (req, res) => {
      const body = req.body;

      model.delete.board(body, () => {
        res.send(true);
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
  check: {
    like: (req, res) => {
      const body = req.body;

      model.check.like(body, (result) => {
        res.send(result);
      });
    },
  },
};
