// logique panier (add/update/remove/total)
// règles panier (bornage au stock, total)
import { getProduct } from "./api.js";
import { getCart, saveCart } from "./state.js";

export const addProductToCart = async function (productId) {
  const product = await getProduct(productId);

  const cart = getCart();

  const doesItExistInCart = cart.find(
    (productInCart) => productInCart.product.id === product.id
  );

  if (doesItExistInCart) {
    console.log(doesItExistInCart.numberInCart);
    doesItExistInCart.numberInCart++;
    saveCart(cart);
  } else {
    cart.push({ product: product, numberInCart: 1 });
    saveCart(cart);
  }
};
