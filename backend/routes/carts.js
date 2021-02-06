import express from "express";
import CartsRepository from "../repositories/carts";
import ProductsRepository from "../repositories/products";
import { cartShowTemplate } from "../views/carts/show";

export const cartsRouter = express.Router();

cartsRouter.post("/cart/products", async (req, res) => {
  //create cart if cart null
  let cart;

  if (!req.session.cartId) {
    cart = await CartsRepository.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await CartsRepository.getOne(req.session.cartId);
  }

  //is looking for a product with this id already in the basket
  const existingItem = cart.items.find(
    (item) => item.id === req.body.productId
  );
  //if yes ++
  if (existingItem) {
    existingItem.quantity++;
  } else {
    // add new product id to items array
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }
  //push all to cart
  await CartsRepository.update(cart.id, {
    items: cart.items,
  });

  res.redirect("/cart");
});

cartsRouter.get("/cart", async (req, res) => {
  let product;
  if (!req.session.cartId) {
    return res.redirect("/");
  }

  const cart = await CartsRepository.getOne(req.session.cartId);

  for (let item of cart.items) {
    product = await ProductsRepository.getOne(item.id);

    item.product = product;
  }
  res.send(cartShowTemplate({ items: cart.items }));
});

cartsRouter.post("/cart/products/delete", async (req, res) => {
  const { itemId } = req.body;
  const cart = await CartsRepository.getOne(req.session.cartId);

  const items = cart.items.filter((item) => item.id !== itemId);
  await CartsRepository.update(req.session.cartId, { items });

  res.redirect("/cart");
});
