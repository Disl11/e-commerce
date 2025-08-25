// logique page panier (lignes, totaux, actions)
// rendu lignes, gestion +/−/supprimer, recalcul sous-totaux et total, bornage au stock

import { removeProductFromCart } from "../shared/domain.js";
import { getCart } from "../shared/state.js";

const areaProduct = document.querySelector("#area-product");

function displayProduct(produit) {
  areaProduct.innerHTML = "";

  for (let i = 0; i < produit.length; i++) {
    const containerProduct = document.createElement("article");
    containerProduct.classList.add("containerProduct");
    containerProduct.setAttribute("data-id", produit[i].product.id);

    const imgPanier = document.createElement("img");
    imgPanier.src = produit[i].product.image_link;
    imgPanier.alt = "image du produit";
    imgPanier.classList.add("imgPanier");

    const infoProduct = document.createElement("div");
    infoProduct.classList.add("info-product");

    const info = document.createElement("div");
    info.classList.add("info");

    const desc = document.createElement("p");
    desc.textContent = produit[i].product.name;

    // prix item
    const itemPrice = document.createElement("p");
    itemPrice.textContent = produit[i].product.price + " €";

    const stock = document.createElement("p");
    stock.classList.add("stock");
    updatStockDisplay(produit[i].product, stock);

    info.appendChild(desc);
    info.appendChild(itemPrice);
    info.appendChild(stock);

    const controls = document.createElement("div");
    controls.classList.add("controls");

    // prix input sous total
    const price = document.createElement("p");
    price.textContent = produit[i].product.price + " €";
    price.classList.add("price");

    const it = document.createElement("div");
    it.classList.add("input-and-trash");

    const divTrash = document.createElement("div")
    divTrash.classList.add("divTrash");

    const label = document.createElement("label");
    label.setAttribute("for", "quantite");

    const btnMore = document.createElement("button");
    btnMore.classList.add("btnMore");
    btnMore.textContent = "+"

    btnMore.addEventListener("click", () => {
      let valeur = parseInt(input.value);
      if (valeur < input.max) {
        valeur ++;
        input.value = valeur;
      }
      updateItemPrice(produit, i, price, input);
    });

    const btnLess = document.createElement("button");
    btnLess.classList.add("btnLess");
    btnLess.textContent = "-"

    btnLess.addEventListener("click", () => {
      let valeur = parseInt(input.value);
      if (valeur > input.min) {
        valeur --;
        input.value = valeur;
      }
      updateItemPrice(produit, i, price, input);
    });

    const input = document.createElement("input");
    input.id = "quantite";
    input.name = "quantite";
    input.classList.add("btnQuantite");
    input.min = "1";
    input.max = produit[i].product.stock < "11" ? produit[i].product.stock : "11";
    input.value = "1";
    input.addEventListener("input", () => {
      updateItemPrice();
    });


    // updateProductStockInCart(produit[i].numberInCart);
    // console.log(produit[i].numberInCart);

    const btnTrash = document.createElement("button");
    btnTrash.classList.add("btn-trash");
    btnTrash.id = "btn-trash";

    btnTrash.addEventListener("click", () => {
      deleteArticle(produit, i, produit[i].product.id);
    });

    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-trash-can");

    btnTrash.appendChild(icon);

    controls.appendChild(price);
    controls.appendChild(label);
    controls.appendChild(it);
    it.appendChild(btnLess);
    it.appendChild(input);
    it.appendChild(btnMore);
    it.appendChild(btnTrash);

    infoProduct.appendChild(info);
    infoProduct.appendChild(controls);

    containerProduct.appendChild(imgPanier);
    containerProduct.appendChild(infoProduct);

    areaProduct.appendChild(containerProduct);
  }

  const totalPanier = calculateTotal(produit);
  const fraisLivraison = calculateDelivery(totalPanier);

  document.getElementById("frais-livraison").textContent =
    fraisLivraison + " €";
  document.getElementById("price-produit").textContent = totalPanier + " €";
  document.getElementById("total-price").textContent =
    totalPanier + fraisLivraison + " €";
}

displayProduct(getCart());

// +==================== functions =====================

function deleteArticle(produit, i, idProduit) {
  const areaProduct = document.querySelector("#area-product");
  areaProduct.innerHTML = "";
  produit.splice(i, 1);
  removeProductFromCart(idProduit);

  displayProduct(produit);
}

function calculateTotal(produit) {
  let total = 0;
  for (let i = 0; i < produit.length; i++) {
    const basePrice = parseFloat(produit[i].product.price);
    const quantite = produit[i].quantity || 1;
    total += basePrice * quantite;
  }
  return total;
}

function calculateDelivery(total) {
  if (total <= 25) {
    return 0;
  } else {
    return 3.5;
  }
}

function updateItemPrice(produit, i, price, input) {
  
  let checkStock = parseInt(input.value);

  if (checkStock > 10) {
    alert("Maximum d'articles 10 ");
    input.value = 10;
  }

  const basePrice = parseFloat(produit[i].product.price);
  const totalItem = basePrice * parseInt(input.value);
  price.textContent = totalItem.toFixed(2) + " €";

  produit[i].quantity = parseInt(input.value);

  const totalPanier = calculateTotal(produit);
  const fraisLivraison = calculateDelivery(totalPanier);

  document.getElementById("price-produit").textContent =
    totalPanier.toFixed(2) + " €";
  document.getElementById("frais-livraison").textContent =
    fraisLivraison.toFixed(2) + " €";
  document.getElementById("total-price").textContent =
    (totalPanier + fraisLivraison).toFixed(2) + " €";
}

function updatStockDisplay(product, productStock) {
  if (product.stock > 10) {
    productStock.textContent = "En stock : " + product.stock;
    productStock.style.color = "green";
  } else {
    productStock.textContent = "Stock faible : " + product.stock;
    productStock.style.color = "red";
  }
}
