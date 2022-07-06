const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:admin@localhost/the_acme_item_tracker_db');

const { STRING, INTEGER } = Sequelize;

const User = conn.define('user', {
  name: {
    type: STRING 
  }
});

const Thing = conn.define('thing', {
  name: {
    type: STRING 
  },
  ranking: {
    type: INTEGER,
    defaultValue: 1
  }
});

Thing.belongsTo(User)
User.belongsTo(Thing)
User.hasMany(Thing)
Thing.hasMany(User)

module.exports = {
  conn,
  User,
  Thing
};
