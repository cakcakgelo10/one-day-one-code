app.get(
    "/secure-data",
    authenticate,
    authorize("admin"),
    (req, res) => {
        res.json({ message: "Anda memiliki  akses ke data rahasia"});
    }
);