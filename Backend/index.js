const bookRouter = require("./routes/book.routes");
const express = require("express");
const app = express();
const databaseConnection = require("./database");
const cors = require("cors");
const port = 3000;

// database connection
databaseConnection();
app.use(express.json());

app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/book", bookRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
