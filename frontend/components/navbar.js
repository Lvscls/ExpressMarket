// Fonction pour créer le contenu du panier dans la barre de navigation
function createCart(cartElement) {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Récupère les produits du panier depuis le localStorage

    // Calculer le nombre total d'articles dans le panier
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    // Créer le lien du panier avec le nombre total d'articles
    const cartLink = document.createElement('a');
    cartLink.href = '/cart'; // Lien vers la page du panier
    cartLink.textContent = `Panier (${totalItems})`;

    // Ajouter un événement de clic sur le lien du panier pour rediriger vers la page du panier
    cartLink.addEventListener('click', (event) => {
        event.preventDefault(); // Empêche le comportement par défaut du lien
        window.location.href = '/cart'; // Redirige vers la page du panier
    });

    // Ajouter le lien du panier à l'élément du panier dans la barre de navigation
    cartElement.appendChild(cartLink);
}

// Fonction pour créer la barre de navigation
export function createNavbar(navbarElement) {
    const jwtToken = localStorage.getItem('token'); // Récupère le JWT depuis le localStorage

    const links = document.createElement('ul');
    links.classList.add('flex', 'space-x-4');

    const homeLink = document.createElement('li');
    homeLink.innerHTML = '<a href="/">Accueil</a>';

    const signupLink = document.createElement('li');
    signupLink.innerHTML = '<a href="/signup">Inscription</a>';

    const loginLink = document.createElement('li');
    loginLink.innerHTML = '<a href="/login">Connexion</a>';

    const dashboardLink = document.createElement('li');
    dashboardLink.innerHTML = '<a href="/dashboard">Dashboard</a>';

    const backOfficeLink = document.createElement('li');
    backOfficeLink.innerHTML = '<a href="/gestion">Gestion</a>';

    const statisticLink = document.createElement('li');
    statisticLink.innerHTML = '<a href="/statistiques">Statistiques</a>';

    const logoutLink = document.createElement('li');
    logoutLink.innerHTML = '<button>Deconnexion</button>';
    logoutLink.addEventListener('click', () => {
        // Déconnexion: Supprimer le JWT du localStorage
        localStorage.removeItem('token');
        window.location.href = '/'; // Redirection vers la page d'accueil après déconnexion
    });

    if (jwtToken) { // Vérifie si un JWT est présent dans le localStorage
        links.appendChild(homeLink);
        links.appendChild(dashboardLink);
        links.appendChild(backOfficeLink);
        links.appendChild(logoutLink);
    } else {
        links.appendChild(homeLink);
        links.appendChild(signupLink);
        links.appendChild(loginLink);
        links.appendChild(statisticLink);
    }

    // Appel de la fonction createCart pour créer le contenu du panier dans la barre de navigation
    const cartElement = document.createElement('li');
    cartElement.id = 'cart';
    createCart(cartElement);
    links.appendChild(cartElement);

    navbarElement.appendChild(links);
}
