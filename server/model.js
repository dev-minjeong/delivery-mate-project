// db에 직접 접근 가능

// sequelize 연동하기
const sequelize = require('./models').sequelize;

const { data } = require('browserslist');
// Teacher 테이블을 서버로 가져와 읽을 수 있도록 함
const {
  Admin,
  Board,
  Category,
  Sequelize: { Op },
} = require('./models');
sequelize.query('SET NAMES utf8;');

module.exports = {
  api: {
    searchInfo: (body, hash, callback) => {
      Admin.findAll({
        where: { [Op.and]: [{ user_id: body.id, password: hash }] }, // user_id와 password의 조건문들이 모두 일치 시 실행
      })
        .then((data) => {
          // 아이디와 비번이 일치 시 실행
          callback(data);
        })
        .catch((err) => {
          throw err;
        });
    },
  },
  add: {
    board: (body, callback) => {
      Board.create({
        title: body.title,
        contents: body.contents,
        date: new Date(),
        view_cnt: 0,
        food_id: 0,
      })
        .then((data) => {
          callback(true);
        })
        .catch((err) => {
          throw err;
        });
    },
    category: (body, callback) => {
      Category.count({
        where: { name: body.name },
      }).then((cnt) => {
        if (cnt > 0) {
          callback(false);
        } else {
          Category.create({
            name: body.name,
          }).then(() => {
            callback(true);
          });
        }
      });
    },
  },
  update: {
    view_cnt: (body, callback) => {
      Board.update(
        { view_cnt: sequelize.literal('view_cnt + 1') },
        {
          where: { board_id: body.id },
        }
      )
        .then((data) => {
          callback(true);
        })
        .catch((err) => {
          throw err;
        });
    },
  },
  delete: {
    category: (body, callback) => {
      Category.destroy({
        where: { id: body.id },
      }).then(() => {
        Board.update(
          { food_id: 0 },
          {
            where: { food_id: body.id },
          }
        )
          .then(() => {
            callback(true);
          })
          .catch((err) => {
            throw err;
          });
      });
    },
  },
  modify: {
    category: (body, callback) => {
      Category.count({
        where: { name: body.name },
      }).then((cnt) => {
        if (cnt > 0) {
          callback(false);
        } else {
          Category.update(
            { name: body.name },
            {
              where: { id: body.id },
            }
          )
            .then(() => {
              callback(true);
            })
            .catch((err) => {
              throw err;
            });
        }
      });
    },
  },
  get: {
    board: (body, callback) => {
      let search = '%%';

      if (body.search) {
        search = `%${body.search}%`;
      }
      Board.findAll({
        where: {
          title: {
            [Op.like]: search,
          },
          contents: {
            [Op.like]: search,
          },
          food_id: body.category,
        },
        limit: body.page * body.limit,
        offset: (body.page - 1) * body.limit,
        order: sequelize.literal('board_id DESC'),
        // 마지막으로 생성된 데이터부터 차례로 가져올 수 있음
      })
        .then((data) => {
          callback(data);
        })
        .catch((err) => {
          throw err;
        });
    },
    board_cnt: (body, callback) => {
      let search = '%%';

      if (body.search) {
        search = `%${body.search}%`;
      }
      Board.count({
        where: {
          title: {
            [Op.like]: search,
          },
          contents: {
            [Op.like]: search,
          },
          food_id: body.category,
        },
      }).then((result) => {
        callback(result);
      });
    },
    board_data: (body, callback) => {
      Board.findAll({
        where: { board_id: body.id },
      })
        .then((result) => {
          callback(result);
        })
        .catch((err) => {
          throw err;
        });
    },
    category: (callback) => {
      Category.findAll()
        .then((result) => {
          callback(result);
        })
        .catch((err) => {
          throw err;
        });
    },
  },
};

/*
module.exports = {
  api: {
    getData: (callback) => {
      // findAll - 여러 데이터 조회, Array형태로 데이터 보냄 -> map 정상적 작동
      // where - 특정 데이터 조회 시 사용
      /* where: { name: 'kmj' }, */
// 여러 조건 설정 - id가 1이거나  name이 minjeong인 조건
// 'Op.or'은 'Sequelized'에서 'OR연산자'를 사용해 데이터 조회하는 메소드
/* where: { [Op.or]: [{ id: 1 }, { name: 'minjeong' }] },
      }) */
// findOne - 하나의 데이터 조회, Object 형태로 데이터 전송 -> map 사용시 오류
/* Teacher.findOne({
          where: { id: 4 },
      }) */
/* 
      Teacher.findAll()
        .then((result) => {
          callback(result);
        })
        .catch((err) => {
          throw err;
        });
    },
    addData: (body, callback) => {
      Teacher.create({
        name: body.data,
      })
        .then((result) => {
          callback(result);
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    },
    modifyData: (body, callback) => {
      Teacher.update(
        {
          name: body.modify.name,
        },
        { where: { id: body.modify.id } }
         */
// 여러개의 데이터 값 변경
/* { name: 'minj' },
            { where: { [Op.or]: [{ id: 1 }, { name: 'ming' }] }} 
        */
/* 
      )
        .then((result) => {
          callback(result);
        })
        .catch((err) => {
          throw err;
        });
    },
    deleteData: (body, callback) => {
      // destroy는 Sequelize를 이용해 데이터 삭제하는 메소드
      Teacher.destroy({
        where: { id: body.delete.id },
      })
        .then(callback(true))
        .catch((err) => {
          throw err;
        }); 
    },
  },
};
*/
