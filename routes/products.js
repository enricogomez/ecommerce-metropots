const express = require('express');
const productsRepo = require('../repositories/products');
const productsIndexTemplate = require('../view/products/index');
const router = express.Router();
const homeTemplate = require('../view/home')

router.get('/shop', async (req, res) => {
  const products = await productsRepo.getAll();
  res.send(productsIndexTemplate({ products }));
});

router.get('/home', (req, res) => {
  return res.send(homeTemplate());
});

router.get('/', (req, res) => {
  return res.redirect('/home')
}); 
module.exports = router;