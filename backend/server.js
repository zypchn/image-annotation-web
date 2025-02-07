require("dotenv").config();
const PORT = process.env.PORT;

const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/uploads", express.static("images"));

const tabletRoutes = require("./routes/tabletRoutes");
app.use("/api/tablets", tabletRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

const annotRoutes = require("./routes/annotRoutes");
app.use("/api/annots", annotRoutes);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log("server is running on PORT " + PORT);
    });
});