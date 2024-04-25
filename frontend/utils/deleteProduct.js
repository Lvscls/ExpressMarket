import { backendUrl } from "./constant";
import { fetchCSRFToken } from './fetchCsrfToken'; // Importez la fonction pour récupérer le jeton CSRF

async function deleteProduct(productId) {
    try {
        const token = localStorage.getItem('token');
        const csrfToken = await fetchCSRFToken(); // Récupérez le jeton CSRF

        const response = await fetch(`${backendUrl}/manage/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'x-csrf-token': csrfToken // Ajoutez le jeton CSRF à l'en-tête
            }
        });

        if (!response.ok) {
            throw new Error('La suppression du produit a échoué');
        }

        return response; 
    } catch (error) {
        throw new Error(`Erreur lors de la suppression du produit : ${error.message}`);
    }
}

export { deleteProduct };
