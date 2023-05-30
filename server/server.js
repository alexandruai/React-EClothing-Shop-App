const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const {readdirSync} = require("fs") //node module care iti da access la file system
require("dotenv").config();

// app e constanta in care e stocat serverul- express() e functia care creaza serverul
const app = express();

// db -mongoose modleweare intre server si mongodb
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERR", err));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// routes middleware
//parcurge fiecare fisier din routes si il require
//doar sa le require nu e de ajuns, trebuie sa le folosesti ca middlewear
//cu app.use le folosesti ca middlewear
//similiar cu app.use("/api", authRoutes);
//asa iti incarci toate rutele
readdirSync('./routes').map((r) => app.use("/api", require("./routes/" + r)));

// route
app.get("/api", (req, res) => {
  res.json({
    data: "hey you hit node API pix",
  });
});

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
