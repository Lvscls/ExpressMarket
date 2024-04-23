import { createNavbar } from '../components/navbar.js';

const navbarElement = document.getElementById('navbar');
createNavbar(navbarElement);
// Créer le formulaire d'inscription
function createSignupForm() {
    const form = document.createElement('form');
    form.id = 'signupForm';
    form.classList.add('space-y-4');

    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.name = 'username';
    usernameInput.placeholder = 'Nom d\'utilisateur';
    usernameInput.required = true;
    usernameInput.classList.add('w-full', 'px-4', 'py-2', 'border', 'border-gray-300', 'rounded-md', 'focus:outline-none', 'focus:border-blue-500');

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.name = 'password';
    passwordInput.placeholder = 'Mot de passe';
    passwordInput.required = true;
    passwordInput.classList.add('w-full', 'px-4', 'py-2', 'border', 'border-gray-300', 'rounded-md', 'focus:outline-none', 'focus:border-blue-500');

    const passwordConfirmInput = document.createElement('input');
    passwordConfirmInput.type = 'password';
    passwordConfirmInput.name = 'passwordConfirm';
    passwordConfirmInput.placeholder = 'Confirmer le mot de passe';
    passwordConfirmInput.required = true;
    passwordConfirmInput.classList.add('w-full', 'px-4', 'py-2', 'border', 'border-gray-300', 'rounded-md', 'focus:outline-none', 'focus:border-blue-500');

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'S\'inscrire';
    submitButton.classList.add('w-full', 'bg-blue-500', 'text-white', 'py-2', 'px-4', 'rounded-md', 'hover:bg-blue-600', 'transition-colors');

    form.appendChild(usernameInput);
    form.appendChild(passwordInput);
    form.appendChild(passwordConfirmInput);
    form.appendChild(submitButton);

    return form;
}

// Ajouter le formulaire d'inscription à la page
document.addEventListener('DOMContentLoaded', function() {
    const signupFormContainer = document.getElementById('signupFormContainer');
    const signupForm = createSignupForm();
    signupFormContainer.appendChild(signupForm);
});
