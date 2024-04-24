import { createNavbar } from '../components/navbar.js';
import { backendUrl } from './constant.js';

const navbarElement = document.getElementById('navbar');
createNavbar(navbarElement);
function createLoginForm() {
    const form = document.createElement('form');
    form.id = 'loginForm';
    form.classList.add('space-y-4');

    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.id = 'username';
    usernameInput.name = 'username';
    usernameInput.placeholder = 'Nom d\'utilisateur';
    usernameInput.required = true;
    usernameInput.classList.add('w-full', 'px-4', 'py-2', 'border', 'border-gray-300', 'rounded-md', 'focus:outline-none', 'focus:border-blue-500');

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password';
    passwordInput.name = 'password';
    passwordInput.placeholder = 'Mot de passe';
    passwordInput.required = true;
    passwordInput.classList.add('w-full', 'px-4', 'py-2', 'border', 'border-gray-300', 'rounded-md', 'focus:outline-none', 'focus:border-blue-500');

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Se connecter';
    submitButton.classList.add('w-full', 'bg-blue-500', 'text-white', 'py-2', 'px-4', 'rounded-md', 'hover:bg-blue-600', 'transition-colors');

    form.appendChild(usernameInput);
    form.appendChild(passwordInput);
    form.appendChild(submitButton);

    return form;
}

document.addEventListener('DOMContentLoaded', function() {
    const loginFormContainer = document.getElementById('loginFormContainer');
    const loginForm = createLoginForm();
    loginFormContainer.appendChild(loginForm);

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const username = loginForm.username.value;
        const password = loginForm.password.value;

        const formData = {
            username: username,
            password: password
        };

        fetch(`${backendUrl}/login`, {
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
            return response; 
        })
        .then(data => {
            console.log('Connexion réussie:', data);
            window.location.href = '/dashboard'; 
        })
        .catch(error => {
            console.error('Erreur:', error.message);
        });
    });
});
