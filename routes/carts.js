const express = require('express');
const carts = require('../repositories/carts');
const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');
const cartShowTemplate = require('../view/carts/show');

const router = express.Router();


router.post('/cart/products', async (req, res) => {
  const { productId } = req.body;
  let cart;
  if (!req.session.cartId) {
      cart = await cartsRepo.create({ items: [] });
      req.session.cartId = cart.id;
  } else {
      cart = await cartsRepo.getOne(req.session.cartId);
  }
  
  const existingItem = cart.items.find(item => {
   return item.id === productId;
  });
  
  if(!existingItem) {
    cart.items.push({ id: productId, quantity: 1 });
  } else {
    existingItem.quantity++;
  }
  await cartsRepo.update(cart.id, {
    items: cart.items
  });

  res.redirect('/cart');
});

router.get('/cart', async (req, res) => {
  if(!req.session.cartId) {
    return res.redirect('/shop');
  }
  const cart = await cartsRepo.getOne(req.session.cartId);
  const cartList = [];
  for(let item of cart.items) {
    const {id, title, price} = await productsRepo.getOne(item.id);
    cartList.push({ id, title, price, quantity: item.quantity })
  }
  res.send(cartShowTemplate({ items: cartList }));
});

router.post('/cart/products/delete', async (req, res) => {
  const { itemId } = req.body;
  const cart = await cartsRepo.getOne(req.session.cartId);
  const filteredItems = cart.items.filter((item) => {
    return item.id !== itemId
  })
  await cartsRepo.update(req.session.cartId, {
    items: filteredItems
  });

  res.redirect('/cart');
});
module.exports = router;
