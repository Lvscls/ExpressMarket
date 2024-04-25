// products.js

import { backendUrl } from "../utils/constant";
import { deleteProduct } from "../utils/deleteProduct";

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
    const token = localStorage.getItem('token')
    const isLogged = !!token;
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
            if (isLogged == false && !isAdmin) {
                const addToCartButton = document.createElement('button');
                addToCartButton.textContent = 'Ajouter au panier';
                addToCartButton.classList.add('bg-green-500', 'text-white', 'py-1', 'px-2', 'rounded-md', 'hover:bg-green-600', 'transition-colors');
            
                addToCartButton.addEventListener('click', () => {
                    const cart = JSON.parse(localStorage.getItem('cart')) || [];
            
                    const productInCartIndex = cart.findIndex(item => item.id === product.id);
            
                    if (productInCartIndex !== -1) {
                        // Si le produit est déjà dans le panier, augmentez simplement sa quantité
                        cart[productInCartIndex].quantity++;
                    } else {
                        // Si le produit n'est pas dans le panier, ajoutez-le avec une quantité de 1
                        cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
                    }
            
                    localStorage.setItem('cart', JSON.stringify(cart));
            
                    // Afficher un message ou effectuer toute autre action après avoir ajouté le produit au panier
                    console.log('Produit ajouté au panier:', product);
                });
            
                const productPrice = document.createElement('p');
                productPrice.textContent = `${product.price} €`;
            
                productElement.appendChild(addToCartButton);
                productElement.appendChild(productPrice);
            }
            

            // Si l'utilisateur est un administrateur, ajoutez le bouton de suppression
            if (isAdmin) {
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Supprimer';
                deleteButton.classList.add('bg-red-500', 'text-white', 'py-1', 'px-2', 'rounded-md', 'hover:bg-red-600', 'transition-colors');

                deleteButton.addEventListener('click', async () => {
                    try {
                        const productId = product.id;
                        const result = await deleteProduct(productId);
                        console.log('Produit supprimé avec succès:', result);
                        const productParentElement = deleteButton.parentNode;

                        // Supprimer cet élément parent
                        if (productParentElement) {
                            productParentElement.remove();
                        } else {
                            console.error('Impossible de trouver l\'élément parent du produit à supprimer.');
                        }
                    } catch (error) {
                        console.error('Erreur lors de la suppression du produit:', error);
                    }
                });

                const editButton = document.createElement('button');
                editButton.textContent = 'Modifier';
                editButton.classList.add('bg-blue-500', 'text-white', 'py-1', 'px-2', 'rounded-md', 'hover:bg-blue-600', 'transition-colors');
                editButton.addEventListener('click', () => {
                    window.location.href = `product-edit.html?id=${product.id}`;
                });

                productElement.appendChild(deleteButton);
                productElement.appendChild(editButton);
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

