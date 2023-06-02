const express = require('express');
const dotenv = require('dotenv');
const OpenAI = require('openai');
const axios = require('axios');

const app = express();
dotenv.config();

const openai = new OpenAI(process.env.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);
const PORT = process.env.PORT || 3000;

// Mengatur folder statis untuk menyajikan file CSS dan JavaScript
app.use(express.static('public'));

// Mengizinkan server menerima permintaan AJAX dengan format JSON
app.use(express.json());

// Mengembalikan halaman utama
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Mengirim permintaan ke API OpenAI
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.complete({
      engine: 'davinci',
      prompt: `User: ${message}\nAI:`,
      maxTokens: 50,
      temperature: 0.6,
      n: 1,
      stop: '\n',
    });

    res.json({ reply: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});
