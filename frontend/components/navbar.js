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

  navbarElement.appendChild(links);
}
