const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ralasi_db", "root", "", {
    host: "localhost",
    dialect:"mysql",
});

module.exports = sequelize;