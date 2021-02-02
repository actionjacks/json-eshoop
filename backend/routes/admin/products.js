import express from "express";
//handle images
const multer = require("multer");

const { handleErrors, requireAuth } = require("./middlewares");
import ProductsRepository from "../../repositories/products";
import productsNewTemplate from "../../views/admin/products/new";
import { productsIndexTemplate } from "../../views/admin/products/index";
import { productsEditTemplate } from "../../views/admin/products/edit";
const { requireTitle, requirePrice } = require("./validators");

export const productsRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

productsRouter.get("/admin/products", requireAuth, async (req, res) => {
  const products = await ProductsRepository.getAll();
  res.send(productsIndexTemplate({ products }));
});

productsRouter.get("/admin/products/new", requireAuth, (req, res) => {
  res.send(productsNewTemplate({}));
});

productsRouter.post(
  "/admin/products/new",
  requireAuth,
  upload.single("image"),
  [requireTitle, requirePrice],
  handleErrors(productsNewTemplate),

  async function getData(req, res) {
    const image = await req.file.buffer.toString("base64");
    const { title, price } = req.body;
    await ProductsRepository.create({ title, price, image }); // image

    res.redirect("/admin/products");
  }
);

productsRouter.get(
  "/admin/products/:id/edit",
  requireAuth,
  async (req, res) => {
    const product = await ProductsRepository.getOne(req.params.id);

    if (!product) {
      return res.send("Product not found");
    }
    res.send(productsEditTemplate({ product }));
  }
);

productsRouter.post(
  "/admin/products/:id/edit",
  requireAuth,
  async (req, res) => {}
);
