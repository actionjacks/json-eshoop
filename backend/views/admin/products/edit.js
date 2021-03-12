import { layout } from "../layout";
import { getError } from "./../../helpers";

export const productsEditTemplate = ({ product, errors }) => {
  return layout({
    content: `
    <div class="admin__editProduct">
    <h1 class="editProduct__title">Edit a Product</h1>
    <form class="editProduct__form" method="POST" enctype="multipart/form-data">
      <div class="editProduct__field">
        <label class="editProduct__label">Title</label>
        <input value="${
          product.title
        }" class="editProduct__input" placeholder="Title" name="title">
        <p class="help is-danger">${getError(errors, "title")}</p>
      </div>
      <div class="editProduct__field">
        <label class="editProduct__label">Price</label>
        <input value="${
          product.price
        }" class="editProduct__input" placeholder="Price" name="price">
        <p class="editProduct__error">${getError(errors, "price")}</p>
      </div>
      <div class="editProduct__field">
        <label class="editProduct__label">Image</label>
        <input type="file" class="editProduct__inputFile" name="image" />
      </div>
      <br />
      <button class="editProduct__button">Edit</button>
    </form>
  </div>
    `,
  });
};
