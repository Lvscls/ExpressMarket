import { createNavbar } from './components/navbar.js';
import { displayProducts, products } from './pages/products.js';
import { SearchBar } from './components/searchBar.js';

document.addEventListener('DOMContentLoaded', async () => {
  const navbarElement = document.getElementById('navbar');
  createNavbar(navbarElement);
  const productListElement = document.getElementById('productList');
  displayProducts(productListElement, products);

  const filterProducts = (query) => {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    displayProducts(productListElement, filteredProducts, query);
};

  const searchBarElement = document.getElementById('searchBar');
  const searchBar = SearchBar({ onSearch: filterProducts });
  searchBarElement.appendChild(searchBar);
});
