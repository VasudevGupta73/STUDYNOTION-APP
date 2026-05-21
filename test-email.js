const mailSender = require("./server/utils/mailSender");
require("dotenv").config({ path: "./server/.env" });

async function test() {
  try {
    await mailSender("test@example.com", "Test", "Test body");
    console.log("Success");
  } catch (err) {
    console.log("Failed:", err.message);
  }
}
test();
