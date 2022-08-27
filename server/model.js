// db에 직접 접근 가능

// sequelize 연동하기
const sequelize = require('./models').sequelize;

// Teacher 테이블을 서버로 가져와 읽을 수 있도록 함
const {
  Board,
  Category,
  User,
  Like,
  Sequelize: { Op },
} = require('./models');
sequelize.query('SET NAMES utf8;');

module.exports = {
  api: {
    searchInfo: (body, hash, callback) => {
      User.findAll({
        where: { [Op.and]: [{ id: body.id, password: hash }] }, // user_id와 password의 조건문들이 모두 일치 시 실행
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
  search: {
    id: (body, callback) => {
      User.findAll({
        where: {
          name: body.user_name,
          birthday: body.user_birthday,
          sex: body.user_sex,
          email: body.user_email,
        },
      })
        .then((result) => callback(result))
        .catch((err) => {
          throw err;
        });
    },
    pw: (body, callback) => {
      User.findAll({
        where: {
          id: body.user_id,
          email: body.user_email,
        },
      })
        .then((result) => callback(result))
        .catch((err) => {
          throw err;
        });
    },
  },
  add: {
    board: (body, now_date, callback) => {
      Board.create({
        title: body.title,
        contents: body.contents,
        date: now_date,
        view_cnt: 0,
        food_id: 0,
        likes: 0,
      })
        .then(() => {
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
    user: (body, hash_pw, now_date, callback) => {
      //   // 아이디 존재 유무 확인
      User.count({
        where: { id: body.id },
      }).then((cnt) => {
        if (cnt > 0) {
          callback(false);
        } else {
          User.create({
            admin: 'N',
            id: body.id,
            password: hash_pw,
            name: body.name,
            birthday: body.birthday,
            sex: body.sex,
            email: body.email,
            signup_date: now_date,
          }).then(() => callback(true));
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
    pw: (body, hash_pw, callback) => {
      User.update(
        { password: hash_pw },
        {
          where: { id: body.user_id },
        }
      )
        .then(() => {
          callback(true);
        })
        .catch((err) => {
          throw err;
        });
    },
    like: (body, callback) => {
      if (body.type === 'add') {
        Board.update(
          { likes: sequelize.literal('likes + 1') },
          {
            where: { board_id: body.board_id },
          }
        );
        Like.create({
          board_id: body.board_id,
          user_id: body.user_id,
        });
      } else if (body.type === 'remove') {
        Board.update(
          { likes: sequelize.literal('likes - 1') },
          {
            where: { board_id: body.board_id },
          }
        );
        Like.destroy({
          where: {
            board_id: body.board_id,
            user_id: body.user_id,
          },
        });
      }
      callback(true);
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
    board: (body, callback) => {
      Board.destroy({
        where: { board_id: body.board_id },
      })
        .then(() => {
          callback(true);
        })
        .catch((err) => {
          throw err;
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

      let all_category = body.category;
      let select_category = '';
      if (!body.category) {
        select_category = 0;
      } else if (body.category) {
        select_category = null;
      }

      Board.findAll({
        where: {
          title: {
            [Op.like]: search,
          },
          contents: {
            [Op.like]: search,
          },
          food_id: {
            [Op.or]: {
              [Op.eq]: all_category,
              [Op.gt]: select_category,
            },
          },
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
          // console.log(err.data);
        });
    },
    board_cnt: (body, callback) => {
      let search = '%%';

      if (body.search) {
        search = `%${body.search}%`;
      }

      let all_category = body.category;
      let select_category = '';
      if (!body.category) {
        select_category = 0;
      } else if (body.category) {
        select_category = null;
      }

      Board.count({
        where: {
          title: {
            [Op.like]: search,
          },
          contents: {
            [Op.like]: search,
          },
          food_id: {
            [Op.or]: {
              [Op.eq]: all_category,
              [Op.gt]: select_category,
            },
          },
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
  check: {
    like: (body, callback) => {
      Like.findAll({
        where: {
          board_id: body.board_id,
          user_id: body.user_id,
        },
      })
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
