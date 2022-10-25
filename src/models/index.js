const Sequelize = require("sequelize");
const sequelize = new Sequelize('makdb', 'makuser', 'mak123', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});


//SCHEMA (ONE COLUMN ONLY as specified in question)
const Ticker = sequelize.define("tickermak", {
  ticker: {
    type: Sequelize.INTEGER
  }
});

module.exports = Ticker;
