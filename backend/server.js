require("dotenv").config();
const PORT = process.env.PORT;

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const db = require("./models");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/uploads", express.static("images"));

const tabletRoutes = require("./routes/tabletRoutes");
app.use("/tablets", tabletRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log("server is running on PORT " + PORT);
    });
});