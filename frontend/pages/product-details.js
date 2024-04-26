import { getProductById } from '../utils/productById.js';

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const token = localStorage.getItem('token');
    const isLogged = !!token;

    if (productId) {
        const productDetailsElement = document.getElementById('productDetails');
        const product = await getProductById(productId);

        if (product) {
            const productDetailsHTML = `
                <div class="bg-white p-4 rounded-lg shadow-md">
                    <h3 class="text-lg font-semibold">${product.name}</h3>
                    <img src="/assets/images/${product.image_paths[0]}" alt="${product.name}" class="w-full h-auto mb-2">
                    <p class="text-gray-600">${product.description}</p>
                    <p class="text-gray-800 font-bold mt-2">${product.price} €</p>
                </div>
            `;
            productDetailsElement.innerHTML = productDetailsHTML;


            if (!isLogged) {
                const addToCartButton = document.createElement('button');
                addToCartButton.textContent = 'Ajouter au panier';
                addToCartButton.classList.add('bg-green-500', 'text-white', 'py-1', 'px-2', 'rounded-md', 'hover:bg-green-600', 'transition-colors');

                addToCartButton.addEventListener('click', () => {

                    console.log('Produit ajouté au panier:', product);
                });

                productDetailsElement.appendChild(addToCartButton);
            }
        } else {
            productDetailsElement.innerHTML = '<p>Product not found!</p>';
        }
    } else {
        console.error('Product ID not provided in URL');
    }
});
