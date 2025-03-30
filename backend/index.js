require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Configurazione CORS
app.use(cors({
  origin: ['https://progetto-utility-era.vercel.app', 'http://localhost:4200'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

app.get('/api/key', (req, res) => {
  res.json({ apiKey: process.env.GEMINI_API_KEY });
});

app.listen(port, () => {
  console.log(`Server backend in esecuzione sulla porta ${port}`);
}); 