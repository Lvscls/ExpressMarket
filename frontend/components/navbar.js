export function createNavbar(navbarElement) {
    const loggedIn = false; 
    
    const links = document.createElement('ul');
    links.classList.add('flex', 'space-x-4');
  
    const homeLink = document.createElement('li');
    homeLink.innerHTML = '<a href="/">Accueil</a>';
  
    const signupLink = document.createElement('li');
    signupLink.innerHTML = '<a href="/signup">Inscription</a>';
  
    const loginLink = document.createElement('li');
    loginLink.innerHTML = '<a href="/login">Connexion</a>';
  
    const logoutLink = document.createElement('li');
    logoutLink.innerHTML = '<button>Deconnexion</button>';
    //logoutLink.addEventListener('click', () => {
   // });
  
    if (loggedIn) {
      links.appendChild(homeLink);
      links.appendChild(logoutLink);
    } else {
      links.appendChild(homeLink);
      links.appendChild(signupLink);
      links.appendChild(loginLink);
    }
  
    navbarElement.appendChild(links);
  }
  