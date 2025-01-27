const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("pagination_filtering", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

module.exports = sequelize;
