require('dotenv').config();
const express = require('express');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 4100;

// Eenvoudige wachtwoordbeveiliging via middleware
const WACHTWOORD = process.env.INTERN_WACHTWOORD || 'samenontzorgen2026';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Login-endpoint
app.post('/login', (req, res) => {
  const { wachtwoord } = req.body;
  if (wachtwoord === WACHTWOORD) {
    res.json({ ok: true });
  } else {
    res.status(401).json({ ok: false, fout: 'Onjuist wachtwoord.' });
  }
});

// Verificatiemap
app.get('/verificatiemap', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'verificatiemap.html'));
});

// Root → verificatiemap
app.get('/', (req, res) => {
  res.redirect('/verificatiemap');
});

app.listen(PORT, () => {
  console.log(`SamenOntzorgen Intern draait op poort ${PORT}`);
});
