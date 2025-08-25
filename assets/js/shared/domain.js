// logique panier (add/update/remove/total)
// règles panier (bornage au stock, total)
import { getProduct } from "./api.js";
import { getCart, saveCart } from "./state.js";
import { refreshCartTooltip } from "../pages/index.js";

export const addProductToCart = async function (
  productId,
  refreshTooltip = false
) {
  const product = await getProduct(productId);

  const cart = getCart();

  const doesItExistInCart = cart.find(
    (productInCart) => productInCart.product.id === product.id
  );

  if (doesItExistInCart) {
    doesItExistInCart.numberInCart++;
    saveCart(cart);
  } else {
    cart.push({ product: product, numberInCart: 1 });
    saveCart(cart);
  }
  if (refreshTooltip) refreshCartTooltip();
};

export const removeProductFromCart = async function (productId) {
  const product = await getProduct(productId);

  const cart = getCart();

  const doesItExistInCart = cart.find(
    (productInCart) => productInCart.product.id === product.id
  );

  if (doesItExistInCart) {
    saveCart(
      cart.filter((productInCart) => productInCart.product.id !== product.id)
    );
  }
};

export const updateProductStockInCart = async function (productId, newStock) {
  const product = await getProduct(productId);

  const cart = getCart();

  const doesItExistInCart = cart.find(
    (productInCart) => productInCart.product.id === product.id
  );

  if (doesItExistInCart) {
    if (newStock === 0) {
      removeProductFromCart(product.id);
    } else {
      doesItExistInCart.numberInCart = newStock;
    }
    saveCart(cart);
  }
};

export const getNumberOfProductsInCart = () => getCart().length;
