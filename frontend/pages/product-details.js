import { getProductById } from '../utils/productById.js';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        const productDetailsElement = document.getElementById('productDetails');
        const product = getProductById(productId);

        if (product) {
            const productDetailsHTML = `
                <div class="bg-white p-4 rounded-lg shadow-md">
                    <h3 class="text-lg font-semibold">${product.name}</h3>
                    <p class="text-gray-600">${product.description}</p>
                    <p class="text-gray-800 font-bold mt-2">${product.price} €</p>
                </div>
            `;
            productDetailsElement.innerHTML = productDetailsHTML;
        } else {
            productDetailsElement.innerHTML = '<p>Product not found!</p>';
        }
    } else {
        // Handle case where no product ID is provided in the URL
        console.error('Product ID not provided in URL');
    }
});
