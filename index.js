



  function getProjects(event) {
    console.log("get projects");
     fetch('http://localhost:5678/api/works') // récuparation des données de l'API
        .then((resp) => resp.json()) // transforme la réponse en JSON
        .then(projects => { // réception de la réponse et exécute le code contenu après réception


            // on récupère toutes les boutons de catégories pour pouvoir filtrer les travaux
            const btnsCategory = document.querySelectorAll('.filter-btn');

            // pour chaque bouton récupéré
            btnsCategory.forEach(btnCategory => {


                // on clique sur une catégorie
                btnCategory.addEventListener('click', event => {

                    // récupération de la catégorie sélectionnée auparavant 
                    // et on lui enlève la classe active pour lui enlever la surbrillance
                    document.querySelector('.filter-btn.active').classList.remove("active");


                    event.target.classList.add("active");
                    // on exécute le code
                    //filterProjects(event, projects); // on affiche les projets correspondant au filtre actif
                    const gallery = document.querySelector('.gallery'); // Sélection de l'élément HTML qui contient les projets

                    gallery.innerHTML = ''; // Vide la galerie afin de pouvoir la remplir avec les éléments filtrés
                
                    let filterSelected = event.target.dataset.filter;


                    projects.forEach(project => {// on crée une boucle  
                        if (project.categoryId == filterSelected || filterSelected == "all") { // on vérifie si le projet doit être affiché en fonction du filtre choisi
                
                            const figure = document.createElement('figure'); // on crée un élément figure pour chaque objet
                            const image = document.createElement('img'); // même chose avec img
                            image.setAttribute('src', project.imageUrl); // on attribue l'url de l'image à l'élément img
                            image.setAttribute('alt', project.title); // on donne le titre du projet à l'attribut alt de l'img 
                            const title = document.createElement('figcaption'); // on crée un élément figcaption pour chaque projet
                            title.innerHTML = project.title; // on ajoute le titre du projet à figcaption
                            figure.appendChild(image); // on attache image à figure
                            figure.appendChild(title); // on attache figcaption à figure
                            gallery.appendChild(figure); // on attche figure à la galerie
                        }
                    });

                });

            });
            

        });
}


 async function getCategories() {
    await fetch('http://localhost:5678/api/categories')
        .then(resp => resp.json())
        .then(categories => {
            const filterButtons = document.querySelector('.filter-buttons');

            // Ajoute un bouton de filtre pour chaque catégorie
            categories.forEach(category => {
                const button = document.createElement('button');
                button.classList.add('filter-btn');
                button.dataset.filter = category.id;
                button.textContent = category.name;
                filterButtons.appendChild(button);
            });

            // Ajoute un bouton "Tous" pour afficher tous les projets
            const allButton = document.createElement('button');
            allButton.classList.add('filter-btn');
            allButton.dataset.filter = 'all';
            allButton.id = "allWorks";
            allButton.textContent = 'Tous';
            filterButtons.prepend(allButton);
           

            // Sélectionne tous les boutons de filtre et ajoute un écouteur d'événement sur chacun
            const filterBtns = document.querySelectorAll('.filter-btn');
            filterBtns.forEach(filterBtn => {
                filterBtn.addEventListener('click', event => {
                   
                    // Enlève la classe "active" du bouton de filtre actif et ajoute-la au bouton sélectionné
                    let elementActive = document.querySelector('.filter-btn.active');
                    if(elementActive != null)  {
                        elementActive.classList.remove('active');
                    }
                    
                    event.target.classList.add('active');
                    // Filtre les projets selon la catégorie sélectionnée
                   getProjects(event);
                });
            });
        });

}


document.addEventListener('DOMContentLoaded',  async (event) => { // vérifie si la page est chargée
   await getCategories();
    
   await document.querySelector("#allWorks").click();

    
});

