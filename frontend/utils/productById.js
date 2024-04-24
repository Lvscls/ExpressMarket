import { fetchProducts } from '../pages/products.js';
import { createNavbar } from '../components/navbar.js';

const navbarElement = document.getElementById('navbar');
createNavbar(navbarElement);

export async function getProductById(productId) {
    const products = await fetchProducts()
    return products.find(product => product.id == productId);
}
