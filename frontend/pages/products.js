// products.js

import { backendUrl } from "../utils/constant";

export async function fetchProducts() {
    try {
        const response = await fetch(`${backendUrl}/products`);
        const products = await response.json();
        console.log(products)
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export function filterProducts(products, query) {
    return products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
}

export function displayProducts(productListElement, products, isAdmin) {
    try {
        productListElement.innerHTML = '';

        const productGrid = document.createElement('div');
        productGrid.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-4');
        
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-md');

            const productLink = document.createElement('a');
            productLink.href = `product-details.html?id=${product.id}`;

            const productName = document.createElement('h3');
            productName.classList.add('text-lg', 'font-semibold');
            productName.textContent = product.name;

            const productImage = document.createElement('img');
            productImage.src = `/assets/images/${product.image_paths[0]}`;
            productImage.alt = product.name;
            productImage.classList.add('w-full', 'h-auto', 'mb-2');

            const productDescription = document.createElement('p');
            productDescription.classList.add('text-gray-600');
            productDescription.textContent = product.description;

            const productPrice = document.createElement('p');
            productPrice.classList.add('text-gray-800', 'font-bold', 'mt-2');
            productPrice.textContent = `${product.price} €`;

            // Si l'utilisateur est un administrateur, ajoutez le bouton de suppression
            if (isAdmin) {
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Supprimer';
                deleteButton.classList.add('bg-red-500', 'text-white', 'py-1', 'px-2', 'rounded-md', 'hover:bg-red-600', 'transition-colors');

                deleteButton.addEventListener('click', () => {

                    console.log(`Supprimer le produit avec l'ID ${product.id}`);
                });

                productElement.appendChild(deleteButton);
            }

            productLink.appendChild(productName);
            productLink.appendChild(productImage);
            productLink.appendChild(productDescription);
            productLink.appendChild(productPrice);
            productElement.appendChild(productLink);

            // Ajoutez la carte du produit à la grille des produits
            productGrid.appendChild(productElement);
        });

        // Ajoutez la grille des produits au conteneur de la liste des produits
        productListElement.appendChild(productGrid);
    } catch (error) {
        console.error('Error displaying products:', error);
    }
}

