import express from "express";
import { validationResult } from "express-validator";
import ProductsRepository from "../../repositories/products";
import productsNewTemplate from "../../views/admin/products/new";
const { requireTitle, requirePrice } = require("./validators");

export const productsRouter = express.Router();

productsRouter.get("/admin/products", (req, res) => {});

productsRouter.get("/admin/products/new", (req, res) => {
  res.send(productsNewTemplate({}));
});

productsRouter.post(
  "/admin/products/new",
  [requireTitle, requirePrice],
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);

    res.send("submitted");
  }
);
