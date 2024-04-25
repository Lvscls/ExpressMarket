import { getProductDetails } from '../utils/getProductDetails.js';
import { createNavbar } from '../components/navbar.js';
import { fetchCategories } from '../utils/fetchCategories.js';
import { updateProduct } from '../utils/updateProduct.js'

function updateProductForm(product, categories) {
    const form = document.createElement('form');
    form.id = 'productForm';
    form.classList.add('space-y-4', 'max-w-md', 'mx-auto', 'p-6', 'bg-white', 'rounded-md', 'shadow-md');

    const createLabelElement = (textContent) => {
        const label = document.createElement('label');
        label.textContent = textContent;
        label.classList.add('block', 'text-sm', 'font-medium', 'text-gray-700');
        return label;
    };

    const createInputElement = (type, name, placeholder, value, required) => {
        const input = document.createElement('input');
        input.type = type;
        input.name = name;
        input.placeholder = placeholder;
        input.value = value;
        input.required = required;
        input.classList.add('w-full', 'px-3', 'py-2', 'border', 'border-gray-300', 'rounded-md', 'focus:outline-none', 'focus:border-blue-500');
        return input;
    };

    const createTextareaElement = (name, placeholder, value, required) => {
        const textarea = document.createElement('textarea');
        textarea.name = name;
        textarea.placeholder = placeholder;
        textarea.value = value;
        textarea.required = required;
        textarea.classList.add('w-full', 'px-3', 'py-2', 'border', 'border-gray-300', 'rounded-md', 'focus:outline-none', 'focus:border-blue-500');
        return textarea;
    };

    const createSelectElement = (name, categories, selectedCategoryId) => {
        const select = document.createElement('select');
        select.name = name;
        select.classList.add('w-full', 'px-3', 'py-2', 'border', 'border-gray-300', 'rounded-md', 'focus:outline-none', 'focus:border-blue-500');
        
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            if (category.id === selectedCategoryId) {
                option.selected = true;
            }
            select.appendChild(option);
        });
        
        return select;
    };

    const nameLabel = createLabelElement('Nom:');
    const nameInput = createInputElement('text', 'name', 'Nom du produit', product.name, true);

    const descriptionLabel = createLabelElement('Description:');
    const descriptionInput = createTextareaElement('description', 'Description du produit', product.description, true);

    const priceLabel = createLabelElement('Prix:');
    const priceInput = createInputElement('number', 'price', 'Prix du produit', product.price, true);
    priceInput.step = '0.01';

    const categoryLabel = createLabelElement('Catégorie:');
    const categoryDropdown = createSelectElement('category_id', categories, product.category_id);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Enregistrer les modifications';
    submitButton.classList.add('w-full', 'bg-blue-500', 'text-white', 'py-2', 'px-4', 'rounded-md', 'hover:bg-blue-600', 'transition-colors');

    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(descriptionLabel);
    form.appendChild(descriptionInput);
    form.appendChild(priceLabel);
    form.appendChild(priceInput);
    form.appendChild(categoryLabel);
    form.appendChild(categoryDropdown);
    form.appendChild(submitButton);

    return form;
}

// Fonction pour initialiser la page
async function initializePage() {
    const navbarElement = document.getElementById('navbar');
    createNavbar(navbarElement);

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productFormContainer = document.getElementById('productFormContainer');

    try {
        // Récupérer les détails du produit à modifier et les catégories
        const [product, categories] = await Promise.all([getProductDetails(productId), fetchCategories()]);

        // Créer le formulaire de modification de produit avec les champs pré-remplis
        const productForm = updateProductForm(product, categories);

        // Ajouter le formulaire au conteneur dans le DOM
        productFormContainer.appendChild(productForm);

        // Écouter l'événement de soumission du formulaire
        productForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(productForm);
            const updatedProduct = {};

            // Récupérer les valeurs du formulaire
            formData.forEach((value, key) => {
                updatedProduct[key] = value;
            });

            try {
                // Appeler la fonction pour mettre à jour le produit
                const updated = await updateProduct(productId, updatedProduct);
                console.log(updated)
            } catch (error) {
                console.error('Erreur lors de la mise à jour du produit:', error);
            }
        });
    } catch (error) {
        console.error('Error initializing page:', error);
    }
}

document.addEventListener('DOMContentLoaded', initializePage);
