const express = require("express");
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode");
const path = require("path");
const fs = require("fs");

// import('open').then(open => {
//   open.default(`http://localhost:${PORT}`);
// });


const app = express();
const PORT = 3000;

// Simpan status bot dan QR code
let currentStatus = "loading";
let qrDataURL = "";

// WAJS client
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  }
});

client.on("qr", async (qr) => {
  currentStatus = "qr";
  qrDataURL = await qrcode.toDataURL(qr);
  console.log("Silakan scan QR Code...");
});

client.on("ready", () => {
  currentStatus = "ready";
  console.log("✅ Bot sudah terhubung ke WhatsApp!");
});

client.initialize();

// Endpoint API
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/status", (req, res) => {
  res.json({ status: currentStatus });
});

app.get("/shutdown", () => {
  console.log("WA Bot dimatikan.");
  process.exit();
});

app.get("/api/qr", (req, res) => {
  res.json({ image: qrDataURL });
});

app.listen(PORT, () => {
  console.log(`Web dashboard jalan di http://localhost:${PORT}`);
});

app.use(express.json()); // Untuk parsing JSON body

// Endpoint kirim WA
app.post("/send", async (req, res) => {
  const { number, message } = req.body;

  if (!number || !message) {
    return res.status(400).send("Missing number or message");
  }

  let formattedNumber = number.replace(/\D/g, "");
  if (formattedNumber.startsWith("0")) {
    formattedNumber = "62" + formattedNumber.substring(1); // ubah 08... jadi 628...
  }

  const chatId = formattedNumber + "@c.us";

  try {
    await client.sendMessage(chatId, message);
    res.send("Pesan berhasil dikirim ke " + number);
  } catch (err) {
    console.error("Gagal kirim WA:", err);
    res.status(500).send("Gagal kirim WA");
  }
});