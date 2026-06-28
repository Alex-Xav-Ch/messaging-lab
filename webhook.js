const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/webhook", (req, res) => {
  console.log("📩 Webhook received:");
  console.log(req.body);

  res.status(200).json({
    message: "Webhook received successfully",
    data: req.body,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Webhook server running on http://localhost:${PORT}`);
  console.log(`📌 Endpoint: POST http://localhost:${PORT}/webhook`);
});
