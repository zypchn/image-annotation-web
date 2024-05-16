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

const tabletRoutes = require("./routes/tabletRoutes");
app.use("/tablets", tabletRoutes);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log("server is running on PORT " + PORT);
    });
});