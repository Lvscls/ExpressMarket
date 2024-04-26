import { createNavbar } from '../components/navbar.js';


const getCartProducts = () => JSON.parse(localStorage.getItem('cart')) || [];


const displayCartProducts = () => {
    const cartProducts = getCartProducts();
    const cartListElement = document.getElementById('cartList');

    cartListElement.innerHTML = '';


    const totalPrice = cartProducts.reduce((acc, product) => acc + (product.price * product.quantity), 0);

    const createProductElement = (product) => {
        const productElement = document.createElement('div');
        productElement.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-md', 'mb-4');

        const productName = document.createElement('h3');
        productName.textContent = product.name;
        productName.classList.add('text-lg', 'font-semibold', 'mb-2');

        const productPrice = document.createElement('p');
        productPrice.textContent = `${product.price} €`;
        productPrice.classList.add('text-gray-800', 'font-bold');

        const productQuantity = document.createElement('p');
        productQuantity.textContent = `Quantité: ${product.quantity}`;
        productQuantity.classList.add('text-gray-600');

        productElement.appendChild(productName);
        productElement.appendChild(productPrice);
        productElement.appendChild(productQuantity);

        return productElement;
    };


    cartProducts.forEach(product => {
        const productElement = createProductElement(product);
        cartListElement.appendChild(productElement);
    });


    const totalElement = document.createElement('div');
    totalElement.textContent = `Total: ${totalPrice.toFixed(2)} €`;
    totalElement.classList.add('text-lg', 'font-semibold', 'mt-4');
    cartListElement.appendChild(totalElement);

    const buyButton = document.createElement('button');
    buyButton.textContent = 'Acheter';
    buyButton.classList.add('bg-blue-500', 'text-white', 'py-2', 'px-4', 'rounded-md', 'hover:bg-blue-600', 'transition-colors', 'mt-4');
    cartListElement.appendChild(buyButton);
};

const navbarElement = document.getElementById('navbar');
createNavbar(navbarElement);


document.addEventListener('DOMContentLoaded', () => {
    displayCartProducts();
});
