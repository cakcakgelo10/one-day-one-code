const sequelize = require("../config/database");
const Book = require("./book");
const Author = require("./author");

// Relasi
Author.hasMany(Book, { foreignKey: "authorId", as: "books" });
Book.belongsTo(Author, { foreignKey: "authorId", as: "author" });

module.exports = { sequelize, Book, Author };
