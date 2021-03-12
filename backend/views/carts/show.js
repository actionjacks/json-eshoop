import { layout } from "../../views/layout";
import { getError } from "./../helpers";

export const cartShowTemplate = ({ errors, items }) => {
  //console.log(items[0].quantity); //items.image

  const totalPrice = items.reduce((prev, item) => {
    return prev + item.quantity * item.product.price;
  }, 0);

  const renderedItems = items
    .map((item) => {
      return `
    <div class="cart__item">
      <h3 class="cart__subtitle">{  ${item.product.title}</h3>
        <div class="cart__cartRight">
          <div class="cart__productPrice">
          $${item.product.price} X ${item.quantity} =
          <div class="cart__productPriceQuantity">
          $${item.product.price * item.quantity}
        </div>
        </div>
    
      <div class="cart__remove">
        <form method="POST" action="/cart/products/delete">
          <input hidden value="${item.id}" name="itemId" />
          <button class="cart__itemBtn">
            <span class="icon is-small">
            <i class="fas fa-times"></i>
            </span>
          </button>
        </form>
        </div>
      </div>
    </div>
    `;
    })
    .join("");

  return layout({
    content: `
    <div id="cart" class="cart__container">
      <h3 class="subtitle"><b>{ "Shopping Cart" }</b></h3>
    <div class="cart__items">
     { ${renderedItems} }
    </div>
    </div>
    <div class="cart__priceTotal">
      <div class="cart__header">
        Total
      </div>
      <h2 class="cart__title">PLN { ${totalPrice} }</h2>
      <button class="cart__button">Buy</button>
    </div>
`,
  });
};
