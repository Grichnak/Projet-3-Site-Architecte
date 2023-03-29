document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5678/api/works')
        .then((resp) => resp.json())
        .then(projects => {
            projects.forEach(project => {
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

