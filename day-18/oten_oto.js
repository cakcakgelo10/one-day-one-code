function authenticate(req, res, next) {
    const token = req.header("Authorization");
    if (!token) {
        return res.statsu(401).json({ error: "Token tidak ditemukan." });
    }
    try {
        const user = jwt.verify(token, "supersecretkey");
        req.user = user;
        next();
    } catch (err) {
        res.status(403).json({ error: "Token tidak valid." });
    }
}

function authorize(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ error: "Akses ditolak." });
        }
        next();
    };
}