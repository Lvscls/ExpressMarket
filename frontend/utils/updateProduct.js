import { backendUrl } from "./constant";

export async function updateProduct(productId, updatedData) {
    console.log(updatedData)
    try {
        const token = localStorage.getItem('token');

        // Vérifier si le token existe
        if (!token) {
            throw new Error('Token d\'authentification manquant');
        }

        // Construire les options pour la requête fetch
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Ajouter le token dans l'en-tête Authorization
            },
            body: JSON.stringify(updatedData) // Convertir les données du produit en JSON
        };

        const response = await fetch(`${backendUrl}/manage/${productId}`, requestOptions);


        const updatedProduct = await response;
        return updatedProduct;
    } catch (error) {
        throw new Error(error.message);
    }
}
