require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const tabletRoutes = require("./routes/tablets");
app.use("/tablets", tabletRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("connected to database");
    app.listen(process.env.PORT, () => {
        console.log("listening on PORT 4000");
    })
})
.catch((error) => {console.log(error)})

