import express from "express";
import CartsRepository from "../repositories/carts";
import ProductsRepository from "../repositories/products";

export const cartsRouter = express.Router();

cartsRouter.post("/cart/products", async (req, res) => {
  //create cart
  let cart;

  if (!req.session.cartId) {
    cart = await CartsRepository.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await CartsRepository.getOne(req.session.cartId);
  }

  const existingItem = cart.items.find(
    (item) => item.id === req.body.productId
  );
  if (existingItem) {
    existingItem.quantity++;
  } else {
    // add new product id to items array
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }
  await CartsRepository.update(cart.id, {
    items: cart.items,
  });

  res.send("Product added to cart");
});

cartsRouter.get("/cart", (req, res) => {
  if (!req.session.cartId) {
    return res.redirect("/");
  }

  const cart= await CartsRepository.getOne(req.session.cartId)

  for(let item of cart.items){
    //
  }
});
