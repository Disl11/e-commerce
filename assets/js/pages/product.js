import { getProduct } from "../shared/api.js";
import { getIdFromUrl, refreshCartTooltip } from "../shared/utils.js";
import { isProductInCart, addProductToCart } from "../shared/domain.js";

// Attend que tout le HTML soit chargé avant d'exécuter le script
document.addEventListener("DOMContentLoaded", async function () {
  refreshCartTooltip();

  const productId = getIdFromUrl();
  const product = await getProduct(parseInt(productId, 10));
  // Récupère l'élément avec l'id "app" dans le HTML (le conteneur principal)
  const app = document.getElementById("app");

  // Crée un élément <main> pour structurer le contenu principal
  const main = document.createElement("main");

  // Crée une div avec la classe "container" (structure de base)
  const container = document.createElement("div");
  container.className = "container";

  // Ajoute la div "container" dans le <main>
  main.appendChild(container);

  // Ajoute le <main> dans l'élément #app (déjà présent dans le HTML)
  app.appendChild(main);

  // Crée une div pour contenir l'image du produit
  const productImageDiv = document.createElement("div");
  productImageDiv.className = "Produit-image";

  // Crée l'image du produit
  const productImg = document.createElement("img");
  productImg.src = product.image_link; // chemin de l’image
  productImg.onerror = function () {
    this.onerror = null;
    this.src = "./assets/images/noproductpic.png";
  };
  productImg.alt = "img"; // texte alternatif (accessibilité)
  productImg.className = "product-img"; // applique le style CSS

  // Ajoute l’image dans sa div
  productImageDiv.appendChild(productImg);

  // Ajoute la div image dans la structure principale
  container.appendChild(productImageDiv);

  // Crée une section pour les infos produit (nom, prix, boutons et avis)
  const section = document.createElement("div");
  section.className = "section";

  // Crée une div pour contenir les infos produit (nom, prix, stock)
  const productInfo = document.createElement("div");
  productInfo.className = "Produit-info";

  // Crée une div pour regrouper le nom et le prix côte à côte
  const nomPrix = document.createElement("div");
  nomPrix.className = "nom-prix";

  // Crée un paragraphe pour le nom du produit
  const nom = document.createElement("p");
  nom.className = "p-nom";
  nom.textContent = product.name; // texte affiché

  // Crée un paragraphe pour le prix du produit
  const prix = document.createElement("p");
  prix.className = "p-prix";
  prix.textContent = product.price + "€"; // texte affiché

  const avis = document.createElement("p");
  avis.className = "Avis client";
  avis.textContent = product.note ? "Note:" + product.rating : "Aucune note";

  // Ajoute le nom et le prix ensemble dans la div
  nomPrix.append(nom, prix, avis);
  // Ajoute la div "nom-prix" dans la div "Produit-info"
  productInfo.appendChild(nomPrix);

  // Crée un paragraphe pour afficher le stock restant
  const stock = document.createElement("p");
  stock.className = "p-stock";
  stock.textContent = "En stock:" + product.stock;

  // Ajoute le paragraphe de stock dans la div "Produit-info"
  productInfo.appendChild(stock);

  // Ajoute la div infos produit dans la section
  section.appendChild(productInfo);
  // boutons
  // Crée une div pour contenir les boutons
  const btnDiv = document.createElement("div");
  btnDiv.className = "btn";

  // Crée le bouton "add to cart"
  const btn1 = document.createElement("button");
  btn1.className = "btn1";
  btn1.textContent = "ajouter";

  // Crée le bouton "continue with purchase"
  const btn2 = document.createElement("button");
  btn2.className = "btn2";
  btn2.textContent = "continuez vos achats";
  btn2.addEventListener("click", () => (window.location.href = "./index.html"));

  // Ajoute les deux boutons dans la div "btn"
  btnDiv.append(btn1, btn2);

  // Ajoute la div des boutons dans la section
  section.appendChild(btnDiv);

  // Ajoute la section entière dans le container principal
  container.appendChild(section);

  // Désactive le bouton ajouter au panier si il y est déjà ou si le stock est de 0
  if (product.stock === 0) {
    btn1.disabled = true;
    btn1.textContent = "Rupture";
  } else if (isProductInCart(product.id)) {
    btn1.disabled = true;
    btn1.textContent = "Déjà dans le panier";
  }

  // Quand on clique sur le bouton "add"
  btn1.addEventListener("click", function () {
    addProductToCart(product.id, true, true);
    btn1.disabled = true;
  });

  // Quand on clique sur le bouton "continue with purchase"
  btn2.addEventListener("click", function () {
    // Affiche une alerte informant l'utilisateur qu'il va continuer son achat
    // (cette action pourrait être remplacée par une redirection ou un changement de page)
    alert("Vous allez continuer vers l'achat !");
  });
});
