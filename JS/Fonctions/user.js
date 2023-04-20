async function loginUser() {
    try {
      await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logUser),
      })
        .then((response) => response.json())
        .then((responseData) => {
          data = responseData;
          console.log(data);
        });
      if (data.message) {
        loginError.textContent = "Erreur dans l’identifiant !!";
        inputEmail.style.color = "red";
        console.log(logUser);
      } else if (data.error) {
        passwordError.textContent = "Erreur dans le mot de passe !!";
        loginError.textContent = "";
        inputPassword.style.color = "red";
        inputEmail.style.color = "#1d6154";
  
        console.log(logUser);
      } else {
        inputPassword.style.color = "#1d6154";
        passwordError.textContent = "";
        loginError.textContent = "";
        console.log("LogAdmin OK");
        console.log(logUser);
        // stockage du token dans le stockage local
        localStorage.setItem("token", data.token);
        //Redirection index.html
        window.location.href = "../index.html";
      }
    } catch (error) {
      console.log(error);
    }
  }

function checkToken() {// On fait une fonction qui vérifie la présence d'un token dans le local storage

    const token = localStorage.getItem("token");
    if (token) {
      console.log("Token en mémoire! => Mode ADMIN activé ;)");
      adminEdition(); // Si un token est présent, on passe en mode édition
    } else {
      console.log("Pas de token en mémoire! ;(");
    }
  }
  
  function removeToken() {// Suppression du token lors de la fermeture de l'onglet ou de la redirection vers un autre site
  
    localStorage.removeItem("token");
    sessionStorage.removeItem("deletedImages");
  }

  function adminEdition() {// Fonction qui permet de passer en mode édition

    adminHTML(); // Affichage du formulaire de connexion à l'espace éditeur
  
    // Événement de clic sur le bouton pour supprimer un projet
    const modalJs = document.getElementById("titleProjectRemove");
    modalJs.addEventListener("click", (e) => {
      e.preventDefault();
      modalHTML(); // Affichage de la modal pour confirmer la suppression
      displayModal(); // Affichage de la modal
      openModal(); // Ouverture de la modal
      editModal(); // Édition de la modal
    });
  
    // Événement de clic sur le bouton pour supprimer les projets de l'API
    const deleteWorksApi = document.querySelector("body > div > button");
    deleteWorksApi.addEventListener("click", (e) => { 
      e.preventDefault();
      functionDeleteWorksApi(); // Fonction pour confirmer la suppression des projets
    });
  }
  const adminHTML = () => {   //Autre fonctions du mode admin
  
    //Créer le bandeau Admin Editor
    const flagEditor = document.createElement("div");
    flagEditor.classList.add("flagEditor");
    document
      .querySelector("body")
      .insertAdjacentElement("afterbegin", flagEditor);
  
    const spanFlagEditor = document.createElement("span");
    spanFlagEditor.classList.add("projectRemove");
    spanFlagEditor.textContent = "Mode édition";
  
    //Créer le Span avec le "i"
    const iconFlagEditor = document.createElement("i");
    iconFlagEditor.className = "fa-regular fa-pen-to-square";
  
    //Insérer l'élément i avant le texte de span
    spanFlagEditor.insertBefore(iconFlagEditor, spanFlagEditor.firstChild);
  
    const btnFlagEditor = document.createElement("button");
    btnFlagEditor.textContent = "publier les changements";
  
    flagEditor.appendChild(spanFlagEditor);
    flagEditor.appendChild(btnFlagEditor);
  
    //Pointage des position à injecter
    const figure = document.querySelector("#introduction figure");
    const titleProject = document.querySelector("#portfolio > h2");
  
    //Span "Mode édition" en dessous de Sophie
    const spanFigure = spanFlagEditor.cloneNode(true);
    spanFigure.classList.remove("projectRemove");
    spanFigure.classList.add("figureRemove");
    //SPAN "Mode édition" des Projets
    const spanTitleProject = spanFlagEditor.cloneNode(true);
    spanTitleProject.classList.remove("projectRemove");
    spanTitleProject.setAttribute("id", "titleProjectRemove");
  
    //On injecte les span
    figure.appendChild(spanFigure);
    titleProject.appendChild(spanTitleProject); 
  
    //Login devient Logout   
    const logout = document.querySelector(
      "body > header > nav > ul > li:nth-child(3)"// Sélection de l'élément <li> à modifier
    );
  
    // Créer un élément <a> pour le lien de déconnexion
    const logoutLink = document.createElement("a");
    logoutLink.href = "./index.html";
  
    const logoutText = document.createTextNode("logout");
    logoutLink.appendChild(logoutText);
  
    logout.innerHTML = "";
    logout.appendChild(logoutLink);
  
    //  Déconnexion
    logoutLink.addEventListener("click", (event) => {
      event.preventDefault();
      removeToken();
      window.location.assign("./index.html");
    });
    //Ajout class pour mieux intégrer le FlagEditor 
    document.body.classList.add("marginTop");
  
    //Delete les filtres de Recherche HTML
    filterButtons.remove();
  };
  