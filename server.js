const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const items = require("./routes/api/items");
const auth = require("./routes/api/auth");

const app = express();

// Bodyparser Middleware
// app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log(`Mongodb Connected...`))
  .catch((err) => console.log(err));

// Use Routes
app.use(cors());
app.use(express.json());
app.use("/api/items", items);
app.use("/api/auth", auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
