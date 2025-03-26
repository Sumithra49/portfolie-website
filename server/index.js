const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/projects", require("./routes/projects"));
app.use("/messages", require("./routes/messages"));
app.use("/admin", require("./routes/admin"));

// Sync DB
const sequelize = require("./config/db");
sequelize.sync({ alter: true }).then(() => console.log("DB Synced"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
