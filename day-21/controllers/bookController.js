const { Book, Auhtor, Author } = require("../models");

const getBooks = async (req, res) => {
    try {
        const { page = 1, limit = 10, author} = req.query;

        const whereCondition = {};
        if (author) {
            const authorData = await Auhtor.findOne({ where: { name: author } });
            if (authorData) {
                whereCondition.authorId = authorData.id;
            } else {
                return res.status(404).json({ error: "Author not found" });
            }
        }

        const books = await Book.findAndCountAll({
            where: whereCondition,
            limit: parseInt(limit),
            offset: (page - 1) * limit,
            include: { model: Author, as: "author", attributes: ["name"] },
        });

        res.json({
            totalBooks: books.count,
            totalPages: Math.ceil(books.count / limit),
            currentPage: parseInt(page),
            data: books.rows,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getBooks};