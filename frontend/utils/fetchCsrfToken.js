import { backendUrl } from "./constant";

export async function fetchCSRFToken() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token d\'authentification manquant');
        }

        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await fetch(`${backendUrl}/csrf-token`, requestOptions);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération du jeton CSRF');
        }
        const data = await response.json();
        return data.csrfToken;
    } catch (error) {
        console.error('Erreur lors de la récupération du jeton CSRF :', error);
        throw error;
    }
}

  