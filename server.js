import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

/* ===== كريبتو (Binance) ===== */
app.get("/price/crypto/:symbol", async (req, res) => {
    const symbol = req.params.symbol.toUpperCase() + "USDT";
    const r = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
    );
    const data = await r.json();
    res.json({ price: parseFloat(data.price) });
});

/* ===== فوركس (مثال TwelveData) ===== */
app.get("/price/forex/:pair", async (req, res) => {
    const pair = req.params.pair.toUpperCase();
    const r = await fetch(
      `https://api.twelvedata.com/price?symbol=${pair}&apikey=${process.env.FOREX_KEY}`
    );
    const data = await r.json();
    res.json({ price: parseFloat(data.price) });
});

app.listen(3000, () =>
  console.log("Backend running on http://localhost:3000")
);
