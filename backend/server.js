const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexão com MongoDB (versão atualizada)
mongoose.connect('mongodb://localhost:27017/sua-database')
  .then(() => console.log('Conectado ao MongoDB com sucesso'))
  .catch(err => console.error('Erro na conexão com MongoDB:', err));

// Modelo do Item
const Item = mongoose.model('Item', new mongoose.Schema({
  name: String,
  description: String
}));

// Rotas CRUD
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});