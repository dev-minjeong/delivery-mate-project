// db에 직접 접근 가능

// sequelize 연동하기
const sequelize = require('./models').sequelize;

// 테이블을 서버로 가져와 읽을 수 있도록 함
const {
  Board,
  Category,
  User,
  Join,
  Reply,
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
        food_id: body.category,
        join_cnt: 0,
        writer_name: body.writer_name,
        writer_lat: body.writer_lat,
        writer_lon: body.writer_lon,
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
    reply: (body, now_date, callback) => {
      Reply.create({
        board_id: body.board_id,
        contents: body.contents,
        user_id: body.user_id,
        date: now_date,
      })
        .then(() => callback(true))
        .catch(() => callback(false));
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
    join: (body, callback) => {
      if (body.type === 'add') {
        Board.update(
          { join_cnt: sequelize.literal('join_cnt + 1') },
          {
            where: { board_id: body.board_id },
          }
        );
        Join.create({
          board_id: body.board_id,
          name: body.name,
          mate_lat: body.mate_lat,
          mate_lon: body.mate_lon,
        });
      } else if (body.type === 'remove') {
        Board.update(
          { join_cnt: sequelize.literal('join_cnt - 1') },
          {
            where: { board_id: body.board_id },
          }
        );
        Join.destroy({
          where: {
            board_id: body.board_id,
            name: body.name,
          },
        });
        // .then(() => callback(true))
        // .catch((err) => {
        //   throw err;
        // });
      }
      callback(true);
    },
    board: (body, callback) => {
      Board.update(
        {
          title: body.title,
          contents: body.contents,
          food_id: body.category,
          writer_name: body.writer_name,
          writer_lat: body.writer_lat,
          writer_lon: body.writer_lon,
        },
        {
          where: { board_id: body.board_id },
        }
      )
        .then(() => {
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
    reply: (body, callback) => {
      Reply.destroy({
        where: { reply_id: body.reply_id },
      })
        .then(() => callback(true))
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
    pre_next: (body, callback) => {
      let all_category = body.category;
      let select_category = '';
      if (!body.category) {
        select_category = 0;
      } else if (body.category) {
        select_category = null;
      }

      let result = {};
      Board.findAll({
        where: {
          board_id: {
            [Op.gt]: body.board_id,
          },
          food_id: {
            [Op.or]: {
              [Op.eq]: all_category,
              [Op.gt]: select_category,
            },
          },
        },
        limit: 1,
      }).then((next) => {
        result['next'] = next;

        Board.findAll({
          where: {
            board_id: {
              [Op.lt]: body.board_id,
            },
            food_id: {
              [Op.or]: {
                [Op.eq]: all_category,
                [Op.gt]: select_category,
              },
            },
          },
          limit: 1,
          order: sequelize.literal('board_id DESC'),
        }).then((pre) => {
          result['pre'] = pre;
          callback(result);
        });
      });
    },
    reply_data: (body, callback) => {
      Reply.findAndCountAll({
        include: [{ model: User }],
        where: { board_id: body.board_id },
      })
        .then((result) => callback(result))
        .catch((err) => {
          throw err;
        });
    },
    join_data: (body, callback) => {
      Join.findAll({
        where: {
          board_id: body.board_id,
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
  check: {
    join: (body, callback) => {
      Join.findAll({
        where: {
          board_id: body.board_id,
          name: body.name,
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
