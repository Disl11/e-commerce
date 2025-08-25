// helpers communs (DOM, formatage, URL id)
// sélection DOM, format prix, lecture id d'URL
import { getNumberOfProductsInCart } from "./domain.js";

export const clearInputValue = (input) => (input.value = "");

export const getIdFromUrl = () => window.location.href.split("=")[1];

export const refreshCartTooltip = function () {
  const productsInCart = getNumberOfProductsInCart();

  if (productsInCart) {
    if (!document.body.contains(document.querySelector(".cart-tooltip"))) {
      const tooltip = document.createElement("span");
      tooltip.classList.add("cart-tooltip");
      tooltip.textContent = productsInCart;
      document.querySelector(".cartBtn").appendChild(tooltip);
    } else {
      document.querySelector(".cart-tooltip").textContent = productsInCart;
    }
  } else {
    if (document.body.contains(document.querySelector(".cart-tooltip"))) {
      document.querySelector(".cart-tooltip").remove();
    }
  }
};
