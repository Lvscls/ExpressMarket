import { createNavbar } from '../components/navbar.js';
import { backendUrl } from './constant.js';

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


document.addEventListener('DOMContentLoaded', function() {
    const signupFormContainer = document.getElementById('signupFormContainer');
    const signupForm = createSignupForm();
    signupFormContainer.appendChild(signupForm);

    const messageContainer = document.getElementById('messageContainer'); 

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const username = signupForm.username.value;
        const password = signupForm.password.value;
        const passwordConfirm = signupForm.passwordConfirm.value;
        if (password !== passwordConfirm) {
            console.error("Les mots de passe ne correspondent pas");
            return; 
        }

        const formData = {
            username: username,
            password: password
        };

        fetch(`${backendUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
            return response
        })
        .then(data => {
            console.log('Inscription réussie:', data);
            const messageContainer = document.createElement('div');
            messageContainer.id = 'messageContainer';
            messageContainer.textContent = 'Inscription réussie !';
            messageContainer.classList.add('bg-green-100', 'border', 'border-green-400', 'text-green-700', 'px-4', 'py-3', 'rounded', 'relative', 'mt-4');
            signupFormContainer.appendChild(messageContainer);
            signupForm.username.value = '';
            signupForm.password.value = '';
            signupForm.passwordConfirm.value = '';
        })
        .catch(error => {
            console.error('Erreur:', error.message);
        });
    });
});

