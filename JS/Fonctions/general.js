//Fetch de la route Works
async function fetchApiWorks() {// Déclaration d'une fonction asynchrone "fetchApiWorks" qui récupère les données de l'API "works"
    try {
      await fetch(api + "works")// Récupération des données de l'API "works" à l'aide de l'URL stockée dans la constante "api"
        .then((res) => res.json())
        .then((data) => (cards = data));
      
      const btnTitle = getButtonTitles(cards);// Appel de la fonction "getButtonTitles" pour extraire les titres des boutons de filtre à partir des données récupérées
     // console.log(`le titre des BTN filtres  : ${btnTitle.join("  /  ")}`);// Affichage des titres des boutons de filtre dans la console
     // console.log(cards);// Affichage des cartes de projet récupérées dans la console    
      filtersBtn(btnTitle);// Appel de la fonction "filtersBtn" pour créer et afficher les boutons de filtre dans l'interface utilisateur    
      workDisplay(cards);// Appel de la fonction "workDisplay" pour afficher les cartes de projet dans l'interface utilisateur
    } catch (error) {    
      console.log(  // Gestion des erreurs potentielles lors de la récupération des données de l'API
        `Erreur chargement Fonction fetchApiWorks Cartes des Projets:  ${error}`
      );
    }
  }
  
  
  //Fetch de la route Categories
  async function fetchApiCategories() {// On déclare "fetchApiCategories" qui récupère les données de l'API "categories"
    try {
      await fetch(api + "categories")    // Récupération des données de l'API "categories" à l'aide de l'URL stockée dans la constante "api"
        .then((res) => res.json())
        .then((data) => (categories = data));
     // console.log(categories);    // Affichage des données de la catégorie récupérées dans la console
  
    } catch (error) {
      console.log(    // Gestion des erreurs potentielles lors de la récupération des données de l'API
        `Erreur chargement Fonction fetchApiWorks Cartes des Projets:  ${error}`
      );
    }
  }
  
  function getButtonTitles(cards) {   //Récupération dynamique de toutes les Catégories appellé dans le fetch
    return [...new Set(cards.map((card) => card.category.name))];
  }
  
  
  
  //On crée et on injecte un bouton en html
  function filtersBtn(btnTitle) {  // Définition d'une fonction "filtersBtn" qui crée les boutons de filtre
    const allButton = document.createElement("button");  // Création d'un bouton "Tous"
  
    allButton.classList.add("btn", "active"); // Ajout des classes "btn" et "active" au bouton "Tous"
    allButton.textContent = "Tous"; // Ajout du texte "Tous" au bouton "Tous"
    filterButtons.appendChild(allButton); // Ajout du bouton "Tous" à la section de filtre
    filterButtons.classList.add("filter"); // Ajout de la classe "filter" à la section de filtre
  
    const buttons = [  // Création de boutons pour chaque catégorie
  
      allButton,
      ...btnTitle.map((categoryName) => {
        const button = document.createElement("button");
        button.classList.add("btn"); // Ajout de la classe "btn" au bouton
        button.textContent = categoryName; // Ajout du nom de la catégorie au bouton
        filterButtons.appendChild(button); // Ajout du bouton à la section de filtre
        return button;
      }),
    ];
  
    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        categoryIdValue = e.target.textContent; // Stockage du nom de la catégorie sélectionnée
        console.log(categoryIdValue); // Affichage du nom de la catégorie sélectionnée dans la console
        buttons.forEach((btn) => {
          btn.classList.remove("active"); // Suppression de la classe "active" de tous les boutons de filtre
        });
        e.target.classList.add("active"); // Ajout de la classe "active" au bouton de filtre sélectionné
        workDisplay(); // Appel de la fonction "workDisplay" pour afficher les projets correspondants à la catégorie sélectionnée
      });
    });
  }
  
  
  
  
  function cardsTemplate(card) {// Création des cartes de travail
    const cardDisplay = document.createElement("figure"); // Créer un élément <figure> pour la carte
    cardDisplay.setAttribute("data-card-id", card.id); // Ajouter l'ID de la carte comme attribut de données
    cardDisplay.setAttribute("value", card.categoryId); // Ajouter l'ID de la catégorie de la carte comme attribut de données
  
    const imgCard = document.createElement("img"); // Créer un élément <img> pour l'image de la carte
    imgCard.setAttribute("src", card.imageUrl); // Ajouter l'URL de l'image comme source
    imgCard.setAttribute("alt", "photo de " + card.title); // Ajouter une description alternative pour l'image
  
    const titleCard = document.createElement("figcaption"); // Créer un élément <figcaption> pour le titre de la carte
    titleCard.textContent = card.title; // Ajouter le titre de la carte comme texte de l'élément <figcaption>
  
    cardDisplay.appendChild(imgCard); // Ajouter l'élément <img> à la carte
    cardDisplay.appendChild(titleCard); // Ajouter l'élément <figcaption> à la carte
    portfolioSection.appendChild(cardDisplay); // Ajouter la carte à la section du portefeuille sur la page web
  
    return cardDisplay; // Retourner la carte pour stockage
  }
  
  
  
  
  
  function workDisplay() { //On va injecter des cartes dans le html et les montrer
    const gallery = document.querySelector(".gallery");
    const cardDisplay = new Set(); // Utilisation de Set pour éviter les doublons de cartes
    gallery.innerHTML = ""; // On vide la galerie pour afficher uniquement les cartes qui correspondent aux filtres
    
    // Boucle à travers chaque carte
    cards.forEach((card) => {
      // Si la catégorie correspond aux filtres sélectionnés, on ajoute la carte à cardDisplay
      if (categoryIdValue === "Tous" || card.category.name === categoryIdValue) {
        cardDisplay.add(card);
      }
    });
    
    // Affichage de chaque carte dans la galerie
    cardDisplay.forEach((card) => {
      gallery.appendChild(cardsTemplate(card));
    });
  }
  
  
  
  
  