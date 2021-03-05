import { layout } from "../layout";

export const mainPage = ({ products }) => {
  const renderedProducts = products
    .map((product) => {
      return `
      <div class="product__item">
      <img class="product__image"
      src="data:image/png;base64, ${product.image}" />
      <div class="product__title">
        <h3 class="subtitle">${product.title}</h3>
        <h5>$${product.price}</h5>
      </div>
      <footer class="product__footer">
        <form action="/cart/products" method="POST">
          <input hidden value="${product.id}" name="productId" />
          <button class="product__btn">
            <i class="fa fa-shopping-cart"></i>Add to cart
          </button>
        </form>
      </footer>
    </div>
    `;
    })
    .join("\n");

  return layout({
    content: `
    <section class="products__container">
      ${renderedProducts}  
  </section>
  `,
  });
};
