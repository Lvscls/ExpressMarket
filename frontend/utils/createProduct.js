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
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'X-CSRF-TOKEN': productData._csrf 
            },
            body: JSON.stringify(productData) 
        };


        const response = await fetch(`${backendUrl}/manage`, requestOptions);


        if (!response.ok) {
            throw new Error('Erreur lors de la requête');
        }

        const responseData = await response;

        return responseData;
    } catch (error) {
        console.error('Erreur lors de la création du produit:', error);
        throw error; 
    }
}
