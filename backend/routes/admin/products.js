import express from "express";
//handle images
const multer = require("multer");

const { handleErrors, requireAuth } = require("./middlewares");
import ProductsRepository from "../../repositories/products";
import { productsIndexTemplate } from "../../views/admin/products/index";
import { productsNewTemplate } from "../../views/admin/products/new";
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
    let image = null;
    if (req.file) {
      image = await req.file.buffer.toString("base64");

      const { title, price } = req.body;
      await ProductsRepository.create({ title, price, image }); // image

      res.redirect("/admin/products");
    } else {
      const { title, price } = req.body;
      await ProductsRepository.create({ title, price }); // image

      res.redirect("/admin/products");
    }
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
  upload.single("image"),
  [requireTitle, requirePrice],
  handleErrors(productsEditTemplate, async (req) => {
    const product = await ProductsRepository.getOne(req.params.id);
    return { product };
  }),
  async (req, res) => {
    const changes = req.body;

    if (req.file) {
      changes.image = req.file.buffer.toString("base64");
    }
    try {
      await ProductsRepository.update(req.params.id, changes);
    } catch (err) {
      return res.send("Could not find item");
    }

    res.redirect("/admin/products");
  }
);

productsRouter.post(
  "/admin/products/:id/delete",
  requireAuth,
  async (req, res) => {
    await ProductsRepository.delete(req.params.id); // params req to informacje z linka strony

    res.redirect("/admin/products");
  }
);
