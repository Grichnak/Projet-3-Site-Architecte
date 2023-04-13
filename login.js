const form = document.querySelector('form'); //On va chercher la balise form et on la stocke dans une constante 
const emailInput = document.getElementById('email'); // Même chose pour email
const passwordInput = document.getElementById('password'); // Même chose pour le mot de passe

form.addEventListener('submit', async (event) => {  //on ajoute un event listener qui s'active lorsqu'un formulaire est soumis
  event.preventDefault();  
  const email = emailInput.value; // met la valeur de l'input email dans une constante email
  const password = passwordInput.value; // même chose avec le mdp

  try { // on crée un bloc try catch qui permet de gérer des erreurs 
    const response = await fetch('http://localhost:5678/api/users/login', { // on envoie une requête POST au serveur avec les données déposées par l'utilisateur. 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    
    if (response.ok) {// Si la connexion réussie, on va récupérer le token
      const data = await response.json()
      const token = data.token; // On stock le token dans le stockage local
      
      localStorage.setItem('token', token);
      alert('Connecté avec succès!'); // alerte si la connexion est réussie
    } else { // Si la connexion échoue, on va afficher un message d'erreur
      console.error('Erreur de connexion: ', error);
      
    }
  } catch (error) {
    console.error('Erreur de connexion: ', error); // si il y a une erreur on l'affiche dans la console
  }
});
