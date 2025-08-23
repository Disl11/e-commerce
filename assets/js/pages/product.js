// ogique page détail (affichage, ajout panier)
// rendu fiche, contrôle quantité, ajout panier, message aria-live
document.addEventListener("DOMContentLoaded", function () {
	// Récupération du conteneur existant dans le DOM
	const container = document.getElementById("container");

	// Création d’un élément <main>
	const main = document.createElement("main");

	// Création div avec la classe "container"
	const newContainer = document.createElement("div");
	newContainer.className = "container";

	// Ajout div dans le <main>
	main.appendChild(newContainer);

	// Ajout <main> dans le conteneur
	container.appendChild(main);

	// Créer une div qui va contenir toutes les infos texte et boutons
	const section = document.createElement("div");
	section.className = "section";

	// Créer une div pour les infos produit (nom, prix, stock)
	const productImageDiv = document.createElement("div");
	productImageDiv.className = "Produit-image";

	// Div pour le nom et prix côte à côte
	const nomPrix = document.createElement("div");
	nomPrix.className = "nom-prix";
});
