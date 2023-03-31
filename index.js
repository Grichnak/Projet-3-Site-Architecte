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
            //let activeFilter = 'all'; // Le filtre actif par défaut est "Tous"
            
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
            
           /* allButton.addEventListener('click', () => { // on met un event listener pour l'évenement click sur le bouton Tous
                activeFilter = 'all'; // le filtre actif est le filtre Tous
                filterProjects(); // on affiche les projets correspondant au filtre actif
                allButton.classList.add('active'); // le bouton Tous reçoit la classe 'active' 
                objectsButton.classList.remove('active'); // on enlève la classe 'active' du bouton objets
                apartmentsButton.classList.remove('active'); // on enlève la classe 'active' du bouton appartments
                hotelsRestaurantsButton.classList.remove('active'); // on enlève la classe 'active' du bouton hôtels et restaurants
            });

            //même chose pour le bouton Objets
            objectsButton.addEventListener('click', () => { 
                activeFilter = 'objets';
                filterProjects();
                allButton.classList.remove('active');
                objectsButton.classList.add('active');
                apartmentsButton.classList.remove('active');
                hotelsRestaurantsButton.classList.remove('active');
            });
            
            //même chose pour le bouton Appartements
            apartmentsButton.addEventListener('click', () => {
                activeFilter = 'appartements';
                filterProjects();
                allButton.classList.remove('active');
                objectsButton.classList.remove('active');
                apartmentsButton.classList.add('active');
                hotelsRestaurantsButton.classList.remove('active');
            });
            
            //même chose pour le bouton Hôtels & Restaurants
            hotelsRestaurantsButton.addEventListener('click', () => {
                activeFilter = 'hotels-restaurants';
                filterProjects();
                allButton.classList.remove('active');
                objectsButton.classList.remove('active');
                apartmentsButton.classList.remove('active');
                hotelsRestaurantsButton.classList.add('active');
            });*/
            
            
           /* filterProjects(); // Affiche tous les éléments de la galerie au chargement de la page
            allButton.classList.add('active');  // Choisi le bouton Tous comme actif au chargement de la page*/
        });
});
