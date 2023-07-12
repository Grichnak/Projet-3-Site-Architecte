
const modalElement = document.getElementById("modal");
const editSection = document.querySelector("#editSection");
const gallerySection = document.querySelector("#modalEdit");



function hydrateGalleryModal(cards) { // pour ouvrir la modal
  let deletedImages = {};
  //evite les doublettes images Gallery
  document.getElementById("modalGrid").innerHTML = "";

  
  // on récupére les liens des images    
  const imagesUrl = [...document.querySelectorAll(".gallery img")].map((img) =>
    img.getAttribute("src")
  );

  // on les mets dans un tableau pour éviter les doublons
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

    

    //Icône Corbeille
    iconDelete.addEventListener("click", async (e) => {
      e.preventDefault();
      const cardDelete = e.target.parentNode.getAttribute("data-card-id");
      removeElement(cardDelete);
      deletedImages[cardDelete] = true;
      

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

function editModal(categories) { // Récupération des différents éléments du DOM
  const addProject = document.getElementById("editModal");
  const inputFile = document.getElementById("filetoUpload");
  const selectCategory = document.getElementById("category");
  const addToApi = document.getElementById("editWorks");
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

  addToApi.addEventListener("submit", async (e) => {
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
        .then(async (abc) => {
          
          const data = await fetchApiWorks()
          
          console.log('data', data)

          workDisplay(data);
          hydrateGalleryModal(data);
          gallerySection.style.display = "";
          editSection.style.display = "none";
          // réinitialiser le champ inputFile sinon il envoie plusieur formData en post
          inputFile.value = "";
          document.querySelector("#title").value = ""
          document.querySelector("#category").value = 0
          document.getElementById("filetoUpload").reset()
        })
        .catch((error) => {
          console.error("Error:", error);
          
        });
    }
  });
}


//Modal dans html


function openModal() {
  modalElement.style.display = "flex";
  modalElement.style.visibility = "visible";
  modalElement.style.position = "fixed";
  disableScroll();
  document.querySelector("#closeModal").addEventListener("click", closeModalFromCloseButtonHandler);
  window.addEventListener("click", closeModalFromOutsideClickHandler);
}

function closeModal() {
  modalElement.style.display = "none";
  modalElement.style.visibility = "hidden";
  enableScroll();
  document.querySelector("#closeModal").removeEventListener("click", closeModalFromCloseButtonHandler);
  window.removeEventListener("click", closeModalFromOutsideClickHandler);
}

const closeModalFromCloseButtonHandler = (e) => { closeModal(); }
const closeModalFromOutsideClickHandler = (e) => { if (e.target === modal) { closeModal(); } }





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