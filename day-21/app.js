const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/api", bookRoutes);

sequelize.sync({ force: true }).then(() => {
    console.log("Database synchronized");
    app.listen(PORT, ()=> {
        console.log(`Server running at http://localhost:${PORT}`);
    });
});