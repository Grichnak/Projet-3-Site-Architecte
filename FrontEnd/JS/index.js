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

window.addEventListener("load", async (e) => {// Chargement de la page, appel des fonctions pour récupérer les cartes des projets et les catégories de projets

  const cards = await fetchApiWorks()// Déclaration d'une fonction asynchrone "fetchApiWorks" qui récupère les données de l'API "works"

  const categories = await fetchApiCategories();
  console.log(categories)
  categoryIdValue = "Tous"; // Initialisation de la valeur de la catégorie sélectionnée

  const btnTitle = getButtonTitles(cards);// Appel de la fonction "getButtonTitles" pour extraire les titres des boutons de filtre à partir des données récupérées
  filtersBtn(btnTitle, cards);// Appel de la fonction "filtersBtn" pour créer et afficher les boutons de filtre dans l'interface utilisateur    
  workDisplay(cards);// Appel de la fonction "workDisplay" pour afficher les cartes de projet dans l'interface utilisateur
  
  if (localStorage.getItem("token"))
  {
      
      adminHTML(); // Affichage du formulaire de connexion à l'espace éditeur

      // Événement de clic sur le bouton pour supprimer un projet
      const modalJs = document.getElementById("titleProjectRemove");
      modalJs.addEventListener("click", (e) => {
        e.preventDefault();
        openModal(); // Ouverture de la modal
        hydrateGalleryModal(cards);
        editModal(categories); // Édition de la modal
      });

      // Événement de clic sur le bouton pour supprimer les projets de l'API
      const deleteWorksApi = document.querySelector("body > div > button");
      deleteWorksApi.addEventListener("click", (e) => {
        e.preventDefault();
        // Récupérer la chaîne de sessionStorage
        const deletedImagesJSON = sessionStorage.getItem("deletedImages");
        // Convertir la chaîne en objet JavaScript
        const deletedImages = JSON.parse(deletedImagesJSON);
        // Supprimer chaque image du SESSION STORAGE
        // méthode JavaScript qui renvoie un tableau contenant les clés d'un objet
        Object.keys(deletedImages).forEach(async (id) => {
          if (token === false)
          {
            return alert("Pas connecté");
          }

          const response = await fetch(`${api}works/${id}`, {
              method: "DELETE",
              headers: {
                Accept: "*/*",
                Authorization: `Bearer ${token}`,
              },
            });
            
            if (response.ok) {
              const cards = await fetchApiWorks()// Déclaration d'une fonction asynchrone "fetchApiWorks" qui récupère les données de l'API "works"
              workDisplay(cards);
            }
        });
      });
    } 
});

function deleteImage()
{
  
}



// Événement de fermeture d'onglet ou de redirection vers un autre site
window.addEventListener("unload", removeToken);











