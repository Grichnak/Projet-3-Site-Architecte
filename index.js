document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5678/api/works')
        .then((resp) => resp.json())
        .then(projects => {
            projects.forEach(project => { /*Ajoute chaque projet à la galerie*/
                const figure = document.createElement('figure'); /* On crée un élément figure*/
                const image = document.createElement('img'); /* On crée un élément img*/
                image.setAttribute('src', project.imageUrl); /* Va chercher l'URL de chaque élément img*/
                image.setAttribute('alt', project.title); /* Attribue l'élément alt des images au titre du projet*/
                const title = document.createElement('figcaption'); /* On crée un élément figcaption*/
                title.innerHTML = project.title; /*Fait apparaître les titres*/
                figure.appendChild(image); /* Attache l'élément img à l'élément figure*/
                figure.appendChild(title); /* Attache l'élément figcaption à l'élément figure*/
                document.querySelector('.gallery').appendChild(figure); /*Attache l'élément figure à l'élément .gallery du html*/

            }
            );
        }
        );
}
)


document.addEventListener('DOMContentLoaded', () => { // vérifie si la page est chargée
    fetch('http://localhost:5678/api/works') // récuparation des données de l'API
        .then((resp) => resp.json()) // transforme la réponse en JSON
        .then(projects => { // réception de la réponse et exécute le code contenu après réception
            const gallery = document.querySelector('.gallery'); // Sélection de l'élément HTML qui contient les projets
            const allButton = document.querySelector('.filter-btn[data-filter="all"]'); // Sélection du bouton "Tous" dans le HTML
            const objectsButton = document.querySelector('.filter-btn[data-filter="objets"]'); // Même chose pour Objets
            const apartmentsButton = document.querySelector('.filter-btn[data-filter="appartements"]'); // Pareil pour Appartements
            const hotelsRestaurantsButton = document.querySelector('.filter-btn[data-filter="hotels-restaurants"]'); // Idem Restaurants & hôtels


            const filterProjects = (event) => { //Filtre les projets en fonction du filtre choisi

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
            };

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
                    filterProjects(event); // on affiche les projets correspondant au filtre actif

                });

            });


        });
});


document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5678/api/categories')
        .then(resp => resp.json())
        .then(categories => {
            const filterButtons = document.querySelector('.filter-buttons');
            const gallery = document.querySelector('.gallery');

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
            allButton.classList.add('filter-btn', 'active');
            allButton.dataset.filter = 'all';
            allButton.textContent = 'Tous';
            filterButtons.prepend(allButton);

            // Fonction qui filtre les projets selon la catégorie sélectionnée
            const filterProjects = (event) => {
                gallery.innerHTML = '';
                const filterSelected = event.target.dataset.filter;
                projects.forEach(project => {
                    if (project.categoryId == filterSelected || filterSelected == 'all') {
                        const figure = document.createElement('figure');
                        const image = document.createElement('img');
                        image.setAttribute('src', project.imageUrl);
                        image.setAttribute('alt', project.title);
                        const title = document.createElement('figcaption');
                        title.innerHTML = project.title;
                        figure.appendChild(image);
                        figure.appendChild(title);
                        gallery.appendChild(figure);
                    }
                });
            };

            // Sélectionne tous les boutons de filtre et ajoute un écouteur d'événement sur chacun
            const filterBtns = document.querySelectorAll('.filter-btn');
            filterBtns.forEach(filterBtn => {
                filterBtn.addEventListener('click', event => {
                    // Enlève la classe "active" du bouton de filtre actif et ajoute-la au bouton sélectionné
                    document.querySelector('.filter-btn.active').classList.remove('active');
                    event.target.classList.add('active');
                    // Filtre les projets selon la catégorie sélectionnée
                    filterProjects(event);
                });
            });
        });
});
