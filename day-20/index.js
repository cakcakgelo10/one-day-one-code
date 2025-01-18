const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const Author = require('./models/Author');
const Book = require('./models/Book');

const app = express();
app.use(bodyParser.json());

// Endpoint: Tambah penulis
app.post('/authors', async (req, res) => {
    const { name } = req.body;
    const author = await Author.create({ name });
    res.json(author);
});

// Endpoint: Tambah buku untuk penulis tertentu
app.post('/authors/:authorId/books', async (req, res) => {
    const { title, year } = req.body;
    const { authorId } = req.params;

    const author = await Author.findByPk(authorId);
    if (!author) {
        return res.status(404).json({ error: 'Penulis tidak ditemukan' });
    }

    const book = await Book.create({ title, year, AuthorId: authorId });
    res.json(book);
});

// Endpoint: Lihat daftar buku dari penulis tertentu
app.get('/authors/:authorId/books', async (req, res) => {
    const { authorId } = req.params;

    const author = await Author.findByPk(authorId, {
        include: Book,
    });

    if (!author) {
        return res.status(404).json({ error: 'Penulis tidak ditemukan' });
    }

    res.json(author);
});

// Endpoint: Hapus buku
app.delete('/books/:id', async (req, res) => {
    const { id } = req.params;

    const book = await Book.destroy({ where: { id } });
    if (!book) {
        return res.status(404).json({ error: 'Buku tidak ditemukan' });
    }

    res.json({ message: 'Buku berhasil dihapus' });
});

// Sync database dan jalankan server
sequelize.sync({ force: true }).then(() => {
    app.listen(3000, () => console.log('Server berjalan di http://localhost:3000'));
});
