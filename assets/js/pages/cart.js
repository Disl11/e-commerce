// logique page panier (lignes, totaux, actions)
// rendu lignes, gestion +/−/supprimer, recalcul sous-totaux et total, bornage au stock


const areaProduct = document.querySelector("#area-product");

const produits = [
    {
        img: "https://picsum.photos/150/150",
        desc: "Lorem ipsum dolor sit amet consectetur.",
        price: "25€"
    },
    {
        img: "https://picsum.photos/150/150",
        desc: "Deuxième produit exemple",
        price: "10€"
    },
    {
        img: "https://picsum.photos/150/150?random=3",
        desc: "Troisième produit exemple",
        price: "15€"
    }

];


function displayProduct(produit) {
    areaProduct.innerHTML = "";

    for (let i = 0; i < produit.length; i++) {

        const containerProduct = document.createElement("article");
        containerProduct.classList.add("containerProduct");

        const imgPanier = document.createElement("img");
        imgPanier.src = produit[i].img
        imgPanier.alt = "image du produit"
        imgPanier.classList.add("imgPanier");


        const infoProduct = document.createElement("div");
        infoProduct.classList.add("info-product");

        const info = document.createElement("div");
        info.classList.add("info");

        const desc = document.createElement("p");
        desc.textContent = produit[i].desc;

        const price = document.createElement("p");
        price.textContent = produit[i].price;

        info.appendChild(desc);
        info.appendChild(price);

        const controls = document.createElement("div");

        const label = document.createElement("label");
        label.setAttribute("for", "quantite");

        const input = document.createElement("input");
        input.type = "number";
        input.id = "quantite";
        input.name = "quantite";
        input.classList.add("btnQuantite");
        input.min = "1";
        input.max = "10";
        input.value = "1";

        const btnTrash = document.createElement("button");
        btnTrash.classList.add("btn-trash");
        btnTrash.id = "btn-trash";

        btnTrash.addEventListener("click", () => {
            deleteArticle(produits, i);
        })

        const icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-trash-can");

        btnTrash.appendChild(icon);

        controls.appendChild(label);
        controls.appendChild(input);
        controls.appendChild(btnTrash);

        infoProduct.appendChild(info);
        infoProduct.appendChild(controls);

        containerProduct.appendChild(imgPanier);
        containerProduct.appendChild(infoProduct);

        areaProduct.appendChild(containerProduct);
        console.log(produits[i]);
    }
    const totalPanier = calculateTotal(produit);
    document.getElementById("total-price").textContent = totalPanier + " €";
}

displayProduct(produits);


function deleteArticle(produit, i) {

    const areaProduct = document.querySelector("#area-product");
    areaProduct.innerHTML = "";
    produit.splice(i, 1);
    displayProduct(produits);
}

function calculateTotal(produit) {

    let total = 0;
    for (let i = 0; i < produit.length; i++) {
        total += parseFloat(produit[i].price.replace("€", ""));
    }
    return total;
}
