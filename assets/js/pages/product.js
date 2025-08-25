// Attend que tout le HTML soit chargé avant d'exécuter le script
document.addEventListener("DOMContentLoaded", function () {
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
	productImg.src = "assets/images/gloss.jpg"; // chemin de l’image
	productImg.alt = "gloss"; // texte alternatif (accessibilité)
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
	nom.textContent = "Gloss"; // texte affiché

	// Crée un paragraphe pour le prix du produit
	const prix = document.createElement("p");
	prix.className = "p-prix";
	prix.textContent = "19€"; // texte affiché

	const avis = document.createElement("p");
	avis.className = "Avis client";
	avis.textContent = "Avis:8,5/10";

	// Ajoute le nom et le prix ensemble dans la div
	nomPrix.append(nom, prix, avis);
	// Ajoute la div "nom-prix" dans la div "Produit-info"
	productInfo.appendChild(nomPrix);

	// stock
	// Déclare une variable pour suivre le stock restant
	let stockCount = 4;

	// Crée un paragraphe pour afficher le stock restant
	const stock = document.createElement("p");
	stock.className = "p-stock";
	stock.textContent = `remaining stock : ${stockCount} produits`;

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
	btn1.textContent = "add";

	// Crée le bouton "continue with purchase"
	const btn2 = document.createElement("button");
	btn2.className = "btn2";
	btn2.textContent = "continue your shopping";

	// Ajoute les deux boutons dans la div "btn"
	btnDiv.append(btn1, btn2);

	// Ajoute la div des boutons dans la section
	section.appendChild(btnDiv);

	// Ajoute la section entière dans le container principal
	container.appendChild(section);
	// Quand on clique sur le bouton "add"
	btn1.addEventListener("click", function () {
		// Vérifie s'il reste du stock (stockCount > 0)
		if (stockCount > 0) {
			// Si oui, on enlève 1 unité du stock (simulation d'un ajout au panier)
			stockCount--;

			// Met à jour dynamiquement le texte affiché sur la page
			// Exemple : "remaining stock : 3 produits"
			stock.textContent = `remaining stock : ${stockCount} produits`;

			// Affiche une alerte à l'utilisateur pour confirmer l'ajout au panier
			alert("Le produit a été ajouté au panier !");
		} else {
			// Si le stock est à 0, afficher une alerte de rupture de stock
			alert("Produit en rupture de stock !");
		}
	});

	// Quand on clique sur le bouton "continue with purchase"
	btn2.addEventListener("click", function () {
		// Affiche une alerte informant l'utilisateur qu'il va continuer son achat
		// (cette action pourrait être remplacée par une redirection ou un changement de page)
		alert("Vous allez continuer vers l'achat !");
	});
});
