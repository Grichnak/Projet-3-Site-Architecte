



const functionDeleteWorksApi = () => { // on supprime les images 
    // Récupérer la chaîne de sessionStorage
    const deletedImagesJSON = sessionStorage.getItem("deletedImages");
    // Convertir la chaîne en objet JavaScript
    const deletedImages = JSON.parse(deletedImagesJSON);
    // Supprimer chaque image du SESSION STORAGE
    //méthode JavaScript qui renvoie un tableau contenant les clés d'un objet
    Object.keys(deletedImages).forEach(async (id) => {
      try {
        if (token === false) return console.log({ error: "Pas connecté" });
  
        const response = await fetch(`${api}works/${id}`, {
          method: "DELETE",
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          console.log(`Image avec ID ${id} supprimée`);
        } else {
          throw new Error(response.statusText);
        }
      } catch (e) {
        console.error(
          `Erreur lors de la suppression de l'image avec ID ${id}: ${e}`
        );
      }
    });
  };  

function openModal() { // pour ouvrir la modal
    let deletedImages = {};
    //evitez les doublettes images Gallery
    document.getElementById("modalGrid").innerHTML = "";
  
    //On injecte des éléments qu'on a fetch
    // Récupérer les liens des images
    // méthode qui crée un nouveau tableau à partir d'un objet itérable.
    const imagesUrl = [...document.querySelectorAll(".gallery img")].map((img) =>
      img.getAttribute("src")
    );
  
    // Créer un Set pour n'avoir que des liens uniques
    const imagesUrlSet = new Set(imagesUrl);
  
    //On injecte les cartes dans la modal
    const modal = document.createElement("div");
    modal.classList.add("modal");
  
    const imageElements = [...imagesUrlSet].map((link, index) => {
      const container = document.createElement("figure");
      const img = document.createElement("img");
      const p = document.createElement("p");
      const iconDelete = document.createElement("i");
  
      // ajouter l'attribut data-card-id
      container.setAttribute("data-card-id", cards[index].id);
      iconDelete.id = "deleteIcon";
      iconDelete.classList.add("fa-solid", "fa-trash-can", "iconModal");
      iconDelete.setAttribute("aria-hidden", "true");
      img.src = link;
      p.textContent = "éditer";
      container.appendChild(img);
      container.appendChild(p);
      container.appendChild(iconDelete);
  
      // Ajouter l'icône de déplacement uniquement sur le premier élément
      if (index === 0) {
        const iconMove = document.createElement("i");
        iconMove.id = "moveIcon";
        iconMove.classList.add(
          "fa-solid",
          "fa-arrows-up-down-left-right",
          "iconModal"
        );
        container.appendChild(iconMove);
      }
  
      //Icône Corbeille
      iconDelete.addEventListener("click", async (e) => {
        e.preventDefault();
        const cardDelete = e.target.parentNode.getAttribute("data-card-id");
        removeElement(cardDelete);
        deletedImages[cardDelete] = true;
        console.log(deletedImages);
  
        // Convertir l'objet en chaîne de caractères JSON
        const deletedImagesJSON = JSON.stringify(deletedImages);
        // Stocker JSON dans sessionStorage
        sessionStorage.setItem("deletedImages", deletedImagesJSON);
      });
  
      //Fonction delete sur le dom uinquement
  
      function removeElement(cardDelete) {
        const card = document.querySelector(`[data-card-id="${cardDelete}"]`);
        if (card && card.parentNode) {
          card.parentNode.removeChild(card);
          container.remove(card);
        }
      }
  
      //Delete all
      const deleteALL = document.querySelector("#deleteAllWorks");
      deleteALL.addEventListener("click", () => {
        const figureModals = document.querySelectorAll("#modalGrid figure");
        const galleryModals = document.querySelectorAll("#portfolio figure");
        const deletedImages =
          JSON.parse(sessionStorage.getItem("deletedImages")) || {};
        const imageIds = [];
  
        figureModals.forEach((figure) => {
          const dataCardId = figure.getAttribute("data-card-id");
          imageIds.push(dataCardId);
          // stocke l'ID deletedImages
          deletedImages[dataCardId] = true;
        });
  
        // Suppression de toute les cartes
        figureModals.forEach((figure) => figure.remove());
        galleryModals.forEach((figure) => figure.remove());
  
        // Stocke les ID SESSIONTORAGE
        sessionStorage.setItem("deletedImages", JSON.stringify(deletedImages));
      });
      return container;
    });
  
    const galleryMap = document.getElementById("modalGrid");
    galleryMap.append(...imageElements);
  }

  // Affichage de la Modal


function editModal() { // Récupération des différents éléments du DOM
    const addProject = document.getElementById("editModal");
    const inputFile = document.getElementById("filetoUpload");
    const selectCategory = document.getElementById("category");
    const editSection = document.querySelector("#editSection");
    const addToApi = document.getElementById("editWorks");
    const gallerySection = document.querySelector("#modalEdit");
    const previewModal = document.querySelector("#previewModal");
    let iCanSubmit = false;
  
    // Cache differentes sections Modal
    addProject.addEventListener("click", () => {
      gallerySection.style.display = "none";
      editSection.style.display = "";
      previewModal.style.display = "initial";
    });
  
    previewModal.addEventListener("click", () => {
      gallerySection.style.display = "";
      editSection.style.display = "none";
      previewModal.style.display = "none";
    });
  
    //Partie image
    inputFile.addEventListener("change", addPicture);
  
    //Partie catégories
  
    // Utiliser les données de l'API du 2e Fetch pour générer les options de l'élément select
    if (selectCategory.options.length === 0) {
      const emptyOption = document.createElement("option");
      emptyOption.value = "";
      emptyOption.textContent = "";
      selectCategory.appendChild(emptyOption);
  
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.textContent = category.name;
        option.setAttribute("data-id", category.id);
        selectCategory.appendChild(option);
      });
    }
  
    // Condition Formulaire POST
  
    editSection.addEventListener("input", () => {
      const editTitle = document.querySelector("#title");
      const errorImg = document.getElementById("errorImg");
      const titleError = document.querySelector("#ErrorTitleSubmit");
      const categoryError = document.querySelector("#ErrorCategorySubmit");
      const submitForm = document.querySelector(
        "#editWorks > div.footerModal.editFooter > input[type=submit]"
      );
      iCanSubmit = false;
      titleSelected = false;
      categorySelected = false;
      submitForm.style.background = " grey";
      let category = document.querySelector("#category").value;
      const title = editTitle.value;
      const image = inputFile.files[0];
      
  
      if (image === null || image === undefined) {
        errorImg.textContent = "Veuillez selectionnez une image";
        imageSelected = false;
      } else if (title.length < 1) {
        titleError.textContent = "Ajoutez un titre";
        titleSelected = false;
      } else if (category === "") {
        categoryError.textContent = "Choisissez une catégorie";
        titleError.textContent = "";
        categorySelected = false;
      } else {
        
        titleError.textContent = "";
        categoryError.textContent = "";
        categorySelected = true;
        titleSelected = true;
        imageSelected = true;
  
        
      }
      if (titleSelected && categorySelected && imageSelected) {
        submitForm.style.background = " #1d6154";
        iCanSubmit = true;
      }
    });
  
    addToApi.addEventListener("submit", (e) => {
      e.preventDefault();
      //Récupérer les valeurs input
      if (iCanSubmit) {
        //Récupération image
        const image = inputFile.files[0];
  
        //Récupération Titre
        const title = document.querySelector("#title").value;
  
        //Récupération id du fetch Category depuis la liste
        let categorySelect = document.querySelector("#category");
        let selectedOption = categorySelect.selectedOptions[0];
        let category = selectedOption.getAttribute("data-id");
        category = parseInt(category);
  
        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("category", category);
        
  
        fetch(api + "works", {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Ta requête POST n'est pas passé :/ ");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Ta requête POST est passé :) :", data);
            fetchApiWorks();
            workDisplay();
            closeModal();
            // réinitialiser le champ inputFile sinon il envoie plusieur formData en post
            inputFile.value = "";
          })
          .catch((error) => {
            console.error("Error:", error);
            console.log("Ta requête POST n'est PAS passée :( ");
          });
      } else {
        console.log("Formulaire invalide !!!");
      }
    });
  }

  function displayModal() {  // on display la modal
    const modal = document.querySelector("#modal");
    const closeModalBtn = document.querySelector("#closeModal");
    closeModalBtn.addEventListener("click", closeModal);
    window.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
    disableScroll();
  }
  function closeModal() { // on ferme la modal
    document.getElementById("modal").remove();
    enableScroll();
  }

  const modalHTML = () => {//Ici on ajoute du code html qui apparaît uniquement quand on est logged-in
    document.body.insertAdjacentHTML( 
      "beforeend",
      `
      <aside id="modal" class="modal" role="dialog" aria-labelledby="modalTitle" aria-hidden="true" display="initial">
  
      <div id="modalContainer">
  
        <i id="closeModal" class="fa-solid fa-xmark"></i>
        <i id="previewModal" class="fa-solid fa-arrow-left "></i>
  
        <!-- GALERIE PHOTO -->
        <section class="modalTemplate" id="modalEdit">
  
  
          <div id="editionGallery">
            <h2 class="modalTitle">Galerie photo</h2>
            <!-- <i id="deleteIcon" class="fa-solid fa-trash-can iconModal"></i>
            <i id="moveIcon" class="fa-solid fa-arrows-up-down-left-right iconModal"></i> -->
            <div id="modalGrid">
            </div>
          </div>
          <div class="footerModal">
            <hr>
            <input type="submit" value="Ajouter une photo" id="editModal">
            <p id="deleteAllWorks">Supprimer la gallerie</p>
          </div>
        </section>
  
  
        <!-- EDIT PHOTO -->
  
        <section class="modalTemplate" id="editSection" style="display:none">
  
          <h2 class="modalTitle">Ajout photo</h2>
  
          <form id="editWorks">
  
            <div id="addImageContainer">
              <i class="fa-solid fa-image"></i>
  
              <div id="inputFile">
                <label for="filetoUpload" class="fileLabel">
                  <span>+ Ajouter une photo</span>
                  <input type="file" id="filetoUpload" name="image" accept="image/png, image/jpeg"
                    class="file-input">
                </label>
              </div>
              <span class="filesize">jpg, png : 4mo max</span>
              <span id="errorImg"></span>
            </div>
  
            <div class="inputEdit" id="addTitle">
              <label for="title">Titre</label>
              <input type="text" name="title" id="title" class="inputCss" required>
              <span id="ErrorTitleSubmit" class="errormsg"></span>
            </div>
  
            <div class=" inputEdit" id="addCategory">
              <label for="category">Catégorie</label>
              <select name="category" id="category" data-id="" class="inputCss"></select>
              <span id="ErrorCategorySubmit" class="errormsg"></span>
            </div>
  
            <div class="footerModal editFooter">
              <hr>
              <input type="submit" value="Valider">
            </div>
          </form>
        </section>
  
      </div>
    </aside>
      `
    );
  };

  //Autre fonction de la modal

function disableScroll() { // empecher le scroll quand la modal est ouverte
    document.body.classList.add("modalOpen");
  }
  
  function enableScroll() { // autoriser le scroll quand la modal est fermée
    document.body.classList.remove("modalOpen");
  }
  
  
  
  const addPicture = () => { // on ajoute des images
    const inputFile = document.getElementById("filetoUpload");
    const viewImage = document.getElementById("addImageContainer");
    const file = inputFile.files[0];
    // 4Mo en octets => Message ERROR
    const maxSize = 4 * 1024 * 1024;
  
    if (file.size > maxSize) {
      errorImg.textContent = "Votre image est trop volumineuse";
      console.log("fichier > 4MO!");
      return;
    }
  
    const reader = new FileReader();
  
    reader.addEventListener("load", function () {
      viewImage.innerHTML = "";
      const img = document.createElement("img");
      img.setAttribute("src", reader.result);
      viewImage.appendChild(img);
      viewImage.style.padding = "0";
    });
  
    reader.readAsDataURL(file);
  };