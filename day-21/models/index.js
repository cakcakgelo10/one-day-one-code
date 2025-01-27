const sequelize = require("../config/database");
const Book = require("./book");
const Author = require("./author");
const { FOREIGNKEYS } = require("sequelize/lib/query-types");

// Relasi 
Author.hasMany(Book, {FOREIGNKEYS: "authorId", as: "books" });
Book.belongsTo(Author, {FOREIGNKEYS: "authorId", as: "author"});

module.exports = { sequelize, Book, Author};