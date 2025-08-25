// logique page accueil (liste, filtre, recherche)
// chargement produits, rendu liste, filtre, recherche, affichage stock
import { getProducts } from "../shared/api.js";
import { addProductToCart } from "../shared/domain.js";
import { clearInputValue } from "../shared/utils.js";

const productsData = await getProducts();
getTags(productsData).forEach((tag) => generateTag(tag));

const searchInput = document.querySelector(".search-container input");
searchInput.addEventListener("input", () => filterByInput(productsData));

refreshProducts(productsData);

function generateTag(tag) {
  const tagLi = document.createElement("li");
  const tagBtn = document.createElement("button");
  tagBtn.textContent = tag;
  tagBtn.addEventListener("click", () => {
    tagBtn.classList.toggle("selected");

    clearInputValue(searchInput);

    refreshProducts(productsData);
  });

  tagLi.appendChild(tagBtn);
  document.querySelector(".tags").appendChild(tagLi);
}

function generateProductArticle(product) {
  const template = document.querySelector("template").content.cloneNode(true);

  const productArticle = template.querySelector("article");
  productArticle.setAttribute("data-id", product.id);

  const productImg = template.querySelector("img");
  productImg.src = product.image_link;
  productImg.addEventListener(
    "click",
    () => (window.location.href = `./product.html?id=${product.id}`)
  );

  const productTitle = template.querySelector(".title-and-price h3");
  productTitle.textContent = product.name;

  const productPrice = template.querySelector(".title-and-price p");
  productPrice.textContent = `${
    product.price ? product.price.replace(".", ",") : "Prix inconnu"
  }€`;

  const productStock = template.querySelector(".stock-and-add p");
  if (!product.stock) {
    productStock.textContent = `Rupture`;
    productStock.style.color = "grey";
  } else if (product.stock && product.stock < 10) {
    productStock.textContent = `Stock faible: ${product.stock}`;
    productStock.style.color = "red";
  } else {
    productStock.textContent = `En stock: ${product.stock}`;
    productStock.style.color = "green";
  }

  const addToCartBtn = template.querySelector(".stock-and-add button");
  if (product.stock === 0) addToCartBtn.disabled = true;
  addToCartBtn.addEventListener("click", () => addProductToCart(product.id));

  document.querySelector("main .products").appendChild(template);
}

function refreshProducts(products) {
  checkIfProductsExistAndRemove();

  const selectedTags = getSelectedTags();

  if (selectedTags.length > 0) {
    const filteredProducts = selectedTags.reduce(
      (acc, tag) =>
        acc.filter((product) => product.tag_list.indexOf(tag) !== -1),
      products
    );

    if (getNumberOfPages(filteredProducts) > 1) {
      const pageSelect = generatePageSelect(getNumberOfPages(filteredProducts));
      generateProductsByPage(filteredProducts, pageSelect, false);
      pageSelect.addEventListener("change", () => {
        generateProductsByPage(filteredProducts, pageSelect);
      });
    } else {
      checkIfPageSelectExistsAndRemove();
      filteredProducts.forEach((product) => generateProductArticle(product));
    }
  } else {
    if (getNumberOfPages(products) > 1) {
      const pageSelect = generatePageSelect(getNumberOfPages(products));
      generateProductsByPage(products, pageSelect, false);
      pageSelect.addEventListener("change", () => {
        generateProductsByPage(products, pageSelect);
      });
    } else {
      checkIfPageSelectExistsAndRemove();
      products.forEach((product) => generateProductArticle(product));
    }
  }
}

function getTags(products) {
  const tags = products.reduce((acc, product) => {
    product.tag_list.forEach((tag) => acc.push(tag));
    return acc;
  }, []);
  return tags.filter((tag, index) => index === tags.indexOf(tag));
}

function filterByInput(products) {
  const filteredList = products.filter((product) =>
    product.name.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  if (searchInput.value.trim() === "") {
    refreshProducts(productsData);
  } else {
    refreshProducts(filteredList);
  }
}

function getSelectedTags() {
  return Array.from(document.querySelectorAll(".tags button.selected")).map(
    (tag) => tag.textContent
  );
}

function getNumberOfPages(products) {
  return Math.ceil(products.length / 25);
}

function generatePageSelect(numberOfPages) {
  checkIfPageSelectExistsAndRemove();
  const wrapper = document.createElement("div");
  wrapper.classList.add("page-select");

  const select = document.createElement("select");
  select.id = "pages";

  const selectLabel = document.createElement("label");
  selectLabel.setAttribute("for", "pages");
  selectLabel.textContent = "Page: ";

  wrapper.append(selectLabel, select);
  document.querySelector("main").append(wrapper);

  for (let i = 1; i <= numberOfPages; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    select.appendChild(option);
  }

  return select;
}

function checkIfPageSelectExistsAndRemove() {
  const pageSelectDiv = document.querySelector(".page-select");
  if (pageSelectDiv) {
    pageSelectDiv.remove();
  }
}

function checkIfProductsExistAndRemove() {
  if (document.querySelector(".products article")) {
    document.querySelector(".products").innerHTML = "";
  }
}

function generateProductsByPage(products, select, scrollToTop = true) {
  const index = (parseInt(select.value, 10) - 1) * 25;
  checkIfProductsExistAndRemove();
  for (let i = index; i < index + 25 && i < products.length; i++) {
    generateProductArticle(products[i]);
  }
  if (scrollToTop) {
    scrollTo(0, 0);
  }
}
