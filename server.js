require("dotenv").config();

const app = require("./src/app");
const pool = require("./src/config/db");

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", async () => {
  console.log(`School Management API is running on port ${PORT}`);

  try {
    await pool.query("SELECT 1");
    console.log("MySQL connected successfully");
  } catch (error) {
    console.error("MySQL connection check failed:", error.message);
  }
});
