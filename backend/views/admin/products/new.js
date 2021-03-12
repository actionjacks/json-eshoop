import { layout } from "../layout";
import { getError } from "./../../helpers";

export const productsNewTemplate = ({ errors }) => {
  return layout({
    content: `
    <div class="admin__newProductContainer">
    <h1 class="newProduct__title">Create a Product</h1>
    <form method="POST" enctype="multipart/form-data">
      <div class="newProduct__field">
        <label class="newProduct__label">Title</label>
        <input class="newProduct__input" placeholder="Title" name="title">
        <p class="newProduct__error">${getError(errors, "title")}</p>
      </div>

      <div class="newProduct__field">
        <label class="newProduct__label">Price</label>
        <input class="newProduct__input" placeholder="Price" name="price">
        <p class="newProduct__error">${getError(errors, "price")}</p>
      </div>

      <div class="newProduct__field">
        <label class="newProduct__label">Image</label>
        <input class="newProduct__inputFile" type="file" name="image" />
      </div>
      <br />
      <button class="newProduct__button">Create</button>
    </form>
  </div>
    `,
  });
};
