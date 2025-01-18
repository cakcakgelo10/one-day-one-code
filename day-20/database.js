const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('relasi_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
