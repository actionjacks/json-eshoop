import { layout } from "./../layout";

export const productsIndexTemplate = ({ products }) => {
  const renderedProducts = products
    .map((product) => {
      return `
    <tr>
      <td>${product.title}</td>
      <td>${product.price}</td>
      <td>
        <a href="/admin/products/${product.id}/edit">
          <button class="productList__tableButton">
            Edit
          </button>
        </a>
      </td>
      <td>
        <form method="POST" action="/admin/products/${product.id}/delete">
           <button class="productList__tableButton">Delete</button>
        </form>
      </td>
    </tr>
  `;
    })
    .join("");

  return layout({
    content: `
    <div class="admin__productListContainer">
    <div class="admin__productList">
      <h1 class="productList__title" class="subtitle">Products</h1>
      <a class="productList__button" href="/admin/products/new">{ Add: "new Product" }</a>
    </div>
    <table class="productList__table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        ${renderedProducts}
      </tbody>
    </table>
  </div>
  `,
  });
};
