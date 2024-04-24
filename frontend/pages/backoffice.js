import { displayProducts, fetchProducts } from '../pages/products.js';
import { createNavbar } from '../components/navbar.js';
import { fetchCategories } from '../utils/fetchCategories.js';
const navbarElement = document.getElementById('navbar');
createNavbar(navbarElement);

function createProductForm(categories) {
    const form = document.createElement('form');
    form.id = 'productForm';
    form.classList.add('space-y-4');

    // Champ "Nom"
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Nom:';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'name';
    nameInput.required = true;

    // Champ "Description"
    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Description:';
    const descriptionInput = document.createElement('textarea');
    descriptionInput.name = 'description';
    descriptionInput.required = true;

    // Champ "Prix"
    const priceLabel = document.createElement('label');
    priceLabel.textContent = 'Prix:';
    const priceInput = document.createElement('input');
    priceInput.type = 'number';
    priceInput.name = 'price';
    priceInput.step = '0.01';
    priceInput.required = true;

    // Champ "Images" (Uploader plusieurs images)
    const imagesLabel = document.createElement('label');
    imagesLabel.textContent = 'Images:';
    const imagesInput = document.createElement('input');
    imagesInput.type = 'file';
    imagesInput.name = 'images';
    imagesInput.multiple = true;

    // Dropdown pour la catégorie
    const categoryLabel = document.createElement('label');
    categoryLabel.textContent = 'Catégorie:';
    const categoryDropdown = document.createElement('select');
    categoryDropdown.name = 'category';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categoryDropdown.appendChild(option);
    });

    // Bouton de soumission
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Créer le produit';
    submitButton.classList.add('w-full', 'bg-blue-500', 'text-white', 'py-2', 'px-4', 'rounded-md', 'hover:bg-blue-600', 'transition-colors');

    // Ajouter les éléments au formulaire
    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(descriptionLabel);
    form.appendChild(descriptionInput);
    form.appendChild(priceLabel);
    form.appendChild(priceInput);
    form.appendChild(imagesLabel);
    form.appendChild(imagesInput);
    form.appendChild(categoryLabel);
    form.appendChild(categoryDropdown);
    form.appendChild(submitButton);

    return form;
}

document.addEventListener('DOMContentLoaded', async function () {
    const productListElement = document.getElementById('productList');

    const products = await fetchProducts();

    displayProducts(productListElement, products, true);

    const categories = await fetchCategories();

    const productFormContainer = document.getElementById('productFormContainer');
    const productForm = createProductForm(categories);
    productFormContainer.appendChild(productForm);
});
