import { backendUrl } from "./constant";

export async function createProduct(productData) {
    console.log(productData)
    try {
        // Récupérer le token d'authentification depuis le localStorage
        const token = localStorage.getItem('token');

        // Vérifier si le token existe
        if (!token) {
            throw new Error('Token d\'authentification manquant');
        }

        // Construire les options pour la requête fetch
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Ajouter le token dans l'en-tête Authorization
            },
            body: JSON.stringify(productData) // Convertir les données du produit en JSON
        };

        // Envoyer la requête POST vers /manage avec les options
        const response = await fetch(`${backendUrl}/manage`, requestOptions);

        // Vérifier si la requête a réussi
        if (!response.ok) {
            throw new Error('Erreur lors de la requête');
        }

        // Récupérer les données de la réponse
        const responseData = await response;

        // Retourner les données de la réponse
        return responseData;
    } catch (error) {
        console.error('Erreur lors de la création du produit:', error);
        throw error; // Propager l'erreur pour la gérer à un niveau supérieur si nécessaire
    }
}
