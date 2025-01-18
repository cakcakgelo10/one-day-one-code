const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Author = require('./Author');

const Book = sequelize.define('Book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

// Relasi One-to-Many
Author.hasMany(Book, { onDelete: 'CASCADE' });
Book.belongsTo(Author);

module.exports = Book;
