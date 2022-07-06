const path = require('path');
const model = require('./model');

const AWS = require('aws-sdk');
AWS.config.loadFromPath(
  // loadFromPath로 json파일을 path모듈로 연결
  path.join(__dirname, 'config', 'awsConfig.json')
);

module.exports = {
  api: {
    sendPw: (req, res) => {
      console.log(req.body);
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
