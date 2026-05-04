require("dotenv").config();

const app = require("./src/app");
const pool = require("./src/config/db");

const PORT = process.env.PORT || 8080;

pool
  .query("SELECT 1")
  .then(() => {
    console.log("MySQL connected successfully");

    app.listen(PORT, () => {
      console.log(`School Management API is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MySQL connection failed:", error.message);
  });