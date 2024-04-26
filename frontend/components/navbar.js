import { fetchCategoryStats } from "../utils/fetchStats";


const createNavLink = (text, href, onClick = null) => {
    const link = document.createElement('a');
    link.textContent = text;
    link.href = href;
    if (onClick) {
        link.addEventListener('click', onClick);
    }
    return link;
};


const createNavButton = (text, onClick) => {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
};


const getCartContent = () => {
    const cartCount = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cartCount.reduce((acc, item) => acc + item.quantity, 0);
    return totalItems > 0 ? `Panier (${totalItems})` : 'Panier';
};


const createCart = () => {
    const cartElement = createNavLink(getCartContent(), '/cart');
    return cartElement;
};


const openCategoryStatsInNewTab = async () => {
    try {
        const categoryStats = await fetchCategoryStats();
        const jsonStats = JSON.stringify(categoryStats, null, 2);
        const blob = new Blob([jsonStats], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    } catch (error) {
        console.error('Erreur:', error.message);
        alert('Erreur lors de la récupération des statistiques des catégories.');
    }
};


export const createNavbar = (navbarElement) => {
    const jwtToken = localStorage.getItem('token');
    const navbarContent = document.createElement('div');
    navbarContent.classList.add('flex', 'space-x-4');

    const homeLink = createNavLink('Accueil', '/');
    const signupLink = createNavLink('Inscription', '/signup');
    const loginLink = createNavLink('Connexion', '/login');
    const dashboardLink = createNavLink('Dashboard', '/dashboard');
    const backOfficeLink = createNavLink('Gestion', '/gestion');
    const statisticLink = createNavLink('Statistiques', '#', openCategoryStatsInNewTab);
    const reportLink = createNavLink('Rapports', '/report')
    const logoutLink = createNavButton('Deconnexion', () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    });

    const cartElement = jwtToken ? null : createCart();

    if (jwtToken) {
        navbarContent.append(homeLink, dashboardLink, backOfficeLink,reportLink, logoutLink);
    } else {
        navbarContent.append(homeLink, signupLink, loginLink, statisticLink, cartElement);
    }

    navbarElement.appendChild(navbarContent);
};
