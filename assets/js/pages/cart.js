// logique page panier (lignes, totaux, actions)
// rendu lignes, gestion +/−/supprimer, recalcul sous-totaux et total, bornage au stock

import { getCart } from "../shared/state.js";

console.log(getCart());



const areaProduct = document.querySelector("#area-product");

function displayProduct(produit) {
    areaProduct.innerHTML = "";

    for (let i = 0; i < produit.length; i++) {

        const containerProduct = document.createElement("article");
        containerProduct.classList.add("containerProduct");

        const imgPanier = document.createElement("img");
        imgPanier.src = produit[i].api_featured_image;
        imgPanier.alt = "image du produit"
        imgPanier.classList.add("imgPanier");


        const infoProduct = document.createElement("div");
        infoProduct.classList.add("info-product");

        const info = document.createElement("div");
        info.classList.add("info");

        const desc = document.createElement("p");
        desc.textContent = produit[i].name;

        const itemPrice = document.createElement("p");
        itemPrice.textContent = produit[i].price + " €";

        const stock = document.createElement("p");
        stock.classList.add("stock");
        updatStockDisplay(produit[i], stock);


        info.appendChild(desc);
        info.appendChild(itemPrice);
        info.appendChild(stock);

        const controls = document.createElement("div");
        controls.classList.add("controls");

        const price = document.createElement("p");
        price.textContent = produit[i].price + " €";
        price.classList.add("price")

        const it = document.createElement("div");
        it.classList.add("input-and-trash")

        const label = document.createElement("label");
        label.setAttribute("for", "quantite");

        const input = document.createElement("input");
        input.type = "number";
        input.id = "quantite";
        input.name = "quantite";
        input.classList.add("btnQuantite");
        input.min = "1";
        input.max = produit[i].stock < "10" ? produit[i].stock : "10";
        input.value = "1";

        input.addEventListener("input", () => {
            updateItemPrice(produit, i, price, input)
        })

        const btnTrash = document.createElement("button");
        btnTrash.classList.add("btn-trash");
        btnTrash.id = "btn-trash";

        btnTrash.addEventListener("click", () => {
            deleteArticle(produit, i);
        })

        const icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-trash-can");

        btnTrash.appendChild(icon);

        controls.appendChild(price);
        controls.appendChild(label);
        controls.appendChild(it);
        it.appendChild(input);
        it.appendChild(btnTrash);

        infoProduct.appendChild(info);
        infoProduct.appendChild(controls);

        containerProduct.appendChild(imgPanier);
        containerProduct.appendChild(infoProduct);

        areaProduct.appendChild(containerProduct);
        console.log(produit[i]);
    }



    const totalPanier = calculateTotal(produit);
    const fraisLivraison = calculateDelivery(totalPanier);

    document.getElementById("frais-livraison").textContent = fraisLivraison + " €"
    document.getElementById("price-produit").textContent = totalPanier + " €"
    document.getElementById("total-price").textContent = (totalPanier + fraisLivraison) + " €";

}

displayProduct(getCart());


function deleteArticle(produit, i) {

    const areaProduct = document.querySelector("#area-product");
    areaProduct.innerHTML = "";
    produit.splice(i, 1);
    displayProduct(produit);
}


function calculateTotal(produit) {
    let total = 0;
    for (let i = 0; i < produit.length; i++) {
        const basePrice = parseFloat(produit[i].price);
        const quantite = produit[i].quantity || 1;
        total += basePrice * quantite;
    }
    return total;
}

function calculateDelivery(total) {
    if (total <= 25) {
        return 0
    } else {
        return 3.5
    }
}

function updateItemPrice(produit, i, price, input) {

    let checkStock = parseInt(input.value);
    if (checkStock > produit[i].stock) {
        alert("Stock insuffisant");
    }

    const basePrice = parseFloat(produit[i].price);
    const totalItem = basePrice * parseInt(input.value);
    price.textContent = totalItem + " €"

    produit[i].quantity = parseInt(input.value);

    const totalPanier = calculateTotal(produit);
    const fraisLivraison = calculateDelivery(totalPanier);

    document.getElementById("price-produit").textContent = totalPanier.toFixed(2) + " €";
    document.getElementById("frais-livraison").textContent = (fraisLivraison).toFixed(2) + " €";
    document.getElementById("total-price").textContent = (totalPanier + fraisLivraison).toFixed(2) + " €";
}

function updatStockDisplay(product, productStock) {
    if (product.stock > 10) { 
        productStock.textContent = "En stock : " +  product.stock ; 
        productStock.style.color = "green"; 
    } else { 
        productStock.textContent = "Stock faible : " +  product.stock ; 
        productStock.style.color = "red"; 
    }
}