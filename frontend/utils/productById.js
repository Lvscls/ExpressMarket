import { products } from '../pages/products.js';
import { createNavbar } from '../components/navbar.js';

const navbarElement = document.getElementById('navbar');
createNavbar(navbarElement);

export function getProductById(productId) {
    return products.find(product => product.id == productId);
}
