import express from "express";
//handle images
const multer = require("multer");

const { handleErrors } = require("./middlewares");
import ProductsRepository from "../../repositories/products";
import productsNewTemplate from "../../views/admin/products/new";
import { productsIndexTemplate } from "../../views/admin/products/index";
const { requireTitle, requirePrice } = require("./validators");

export const productsRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

productsRouter.get("/admin/products", async (req, res) => {
  const products = await ProductsRepository.getAll();
  res.send(productsIndexTemplate({ products }));
});

productsRouter.get("/admin/products/new", (req, res) => {
  res.send(productsNewTemplate({}));
});

productsRouter.post(
  "/admin/products/new",
  upload.single("image"),
  [requireTitle, requirePrice],
  handleErrors(productsNewTemplate),

  async function getData(req, res) {
    const image = await req.file.buffer.toString("base64");
    const { title, price } = req.body;
    await ProductsRepository.create({ title, price, image }); // image

    res.send("submitted");
  }
);
