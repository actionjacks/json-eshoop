import express from "express";
import { validationResult } from "express-validator";
import ProductsRepository from "../../repositories/products";
import productsNewTemplate from "../../views/admin/products/new";
import { requireTitle, requirePrice } from "./validators";

export const router = express.Router();

router.get("/admin/products", (req, res) => {});

router.get("/admin/products/new", (req, res) => {
  res.send(productsNewTemplate({}));
});

router.post("/admin/products/new", [requireTitle, requirePrice], (req, res) => {
  const errors = validationResult(req);
  console.log(errors);

  res.send("submitted");
});
