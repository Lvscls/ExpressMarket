import { displayProducts, fetchProducts } from '../pages/products.js';
import { createNavbar } from '../components/navbar.js';
import { fetchCategories } from '../utils/fetchCategories.js';
import { createProduct } from '../utils/createProduct.js';

// Fonction pour créer le formulaire de produit
function createProductForm(categories, csrfToken) {
    const createInputElement = (type, name, placeholder, required) => {
        const input = document.createElement('input');
        input.type = type;
        input.name = name;
        input.placeholder = placeholder;
        input.required = required;
        input.classList.add('w-full', 'px-3', 'py-2', 'border', 'border-gray-300', 'rounded-md', 'focus:outline-none', 'focus:border-blue-500');
        return input;
    };

    const createTextareaElement = (name, placeholder, required) => {
        const textarea = document.createElement('textarea');
        textarea.name = name;
        textarea.placeholder = placeholder;
        textarea.required = required;
        textarea.classList.add('w-full', 'px-3', 'py-2', 'border', 'border-gray-300', 'rounded-md', 'focus:outline-none', 'focus:border-blue-500');
        return textarea;
    };

    const createSelectElement = (name) => {
        const select = document.createElement('select');
        select.name = name;
        select.classList.add('w-full', 'px-3', 'py-2', 'border', 'border-gray-300', 'rounded-md', 'focus:outline-none', 'focus:border-blue-500');
        return select;
    };

    const form = document.createElement('form');
    form.id = 'productForm';
    form.classList.add('space-y-4', 'max-w-md', 'mx-auto', 'p-6', 'bg-white', 'rounded-md', 'shadow-md');

    const createLabelElement = (textContent) => {
        const label = document.createElement('label');
        label.textContent = textContent;
        label.classList.add('block', 'text-sm', 'font-medium', 'text-gray-700');
        return label;
    };

    const nameLabel = createLabelElement('Nom:');
    const nameInput = createInputElement('text', 'name', 'Nom du produit', true);

    const descriptionLabel = createLabelElement('Description:');
    const descriptionInput = createTextareaElement('description', 'Description du produit', true);

    const priceLabel = createLabelElement('Prix:');
    const priceInput = createInputElement('number', 'price', 'Prix du produit', true);
    priceInput.step = '0.01';

    const imagesLabel = createLabelElement('Images:');
    const imagesInput = createInputElement('file', 'images', 'Sélectionner des images', true);
    imagesInput.multiple = true;

    const categoryLabel = createLabelElement('Catégorie:');
    const categoryDropdown = createSelectElement('category');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categoryDropdown.appendChild(option);
    });

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Créer le produit';
    submitButton.classList.add('w-full', 'bg-blue-500', 'text-white', 'py-2', 'px-4', 'rounded-md', 'hover:bg-blue-600', 'transition-colors');

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

        // Création du champ caché pour le jeton CSRF
        const csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = '_csrf';
        csrfInput.value = csrfToken;
    
        // Ajout du champ caché au formulaire
        form.appendChild(csrfInput);

    return form;
}

// Fonction pour initialiser la page
async function initializePage() {
    const navbarElement = document.getElementById('navbar');
    createNavbar(navbarElement);

    const productListElement = document.getElementById('productList');
    const productFormContainer = document.getElementById('productFormContainer');

    try {
        const [products, categories] = await Promise.all([fetchProducts(), fetchCategories()]);

        displayProducts(productListElement, products, true);

        const productForm = createProductForm(categories);
        productFormContainer.appendChild(productForm);

        // Écouter l'événement de soumission du formulaire
        productForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const body = {
                name: productForm.elements.name.value,
                description: productForm.elements.description.value,
                price:  productForm.elements.price.value,
                category_id: productForm.elements.category.value,
                images: []
            }
            const imagesFiles = productForm.elements.images.files;
    for (const file of imagesFiles) {
        body.images.push(file.name);
    }
        
            try {
                // Créer le produit en envoyant les données du formulaire

                const response = await createProduct(body);
        
                // Afficher un message de succès ou effectuer d'autres actions
                console.log('Produit créé avec succès:', response);
            } catch (error) {
                console.error('Erreur lors de la création du produit:', error);
            }
        });
        
    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', initializePage);

