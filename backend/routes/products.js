import express from "express";
import ProductsRepository from "../repositories/products";
import { mainPage } from "../views/products/index";

export const mainPageRouter = express.Router();

mainPageRouter.get("/", async (req, res) => {
  const products = await ProductsRepository.getAll();

  res.send(mainPage({ products }));
});
