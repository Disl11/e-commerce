// chargement des produits
// charger tous les produits, retrouver un produit par id

export const getProducts = async function () {
  return fetch("./data/products.json")
    .then((response) => response.json())
    .then((data) => data.reverse());
};

export const getProduct = async function (productId) {
  const products = await getProducts();
  return products.find((product) => product.id === productId);
};
