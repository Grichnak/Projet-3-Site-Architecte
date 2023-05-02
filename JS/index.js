const api = "http://localhost:5678/api/";// Déclaration d'une constante qui stocke l'URL de base de l'API locale
const token = localStorage.getItem("token");// Stockage du token de l'utilisateur dans une variable
let categoryIdValue = "";// Déclaration d'une variable pour stocker la valeur de l'identifiant de la catégorie sélectionnée
let categories = [];// Déclaration d'un tableau vide pour stocker les données de l'API
let btnTitle = [];// Déclaration d'un tableau vide pour stocker les titres des boutons
const btnSort = document.querySelectorAll(".btn");// Sélection de tous les éléments avec la classe ".btn" et stockage dans un tableau
const filterButtons = document.createElement("div");// Création d'un élément div pour stocker les boutons de filtre
const portfolioSection = document.querySelector("#portfolio");// Sélection de la section de portfolio à l'aide de l'ID "portfolio"
portfolioSection.querySelector("h2").insertAdjacentElement("afterend", filterButtons);// Insérer l'élément "filterButtons" après le titre "h2" de la section "portfolio"
const imageUrls = [];// Déclaration d'un tableau vide pour stocker les URLs d'image


// On a plusieurs routes: /works /categories /users/login /works/{id}

window.addEventListener("load", (e) => {// Chargement de la page, appel des fonctions pour récupérer les cartes des projets et les catégories de projets

  fetchApiWorks();
  fetchApiCategories();
  categoryIdValue = "Tous"; // Initialisation de la valeur de la catégorie sélectionnée
  checkToken(); // Vérification si un token est présent pour passer en mode édition
});



// Événement de fermeture d'onglet ou de redirection vers un autre site
window.addEventListener("unload", removeToken);











