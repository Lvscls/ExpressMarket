import { createNavbar } from './components/navbar.js';
import { fetchProducts, displayProducts, filterProducts } from './pages/products.js';
import { SearchBar } from './components/searchBar.js';

document.addEventListener('DOMContentLoaded', async () => {
    const navbarElement = document.getElementById('navbar');
    createNavbar(navbarElement);
    const token = localStorage.getItem('token')
    const isLogged = !!token;
    const productListElement = document.getElementById('productList');
    console.log(isLogged)
    const products = await fetchProducts();
    displayProducts(productListElement, products);

    const searchBarElement = document.getElementById('searchBar');
    const searchBar = SearchBar({ onSearch: (query) => {
        const filteredProducts = filterProducts(products, query);
        displayProducts(productListElement, filteredProducts, false);
    }});
    searchBarElement.appendChild(searchBar);
});
