import { backendUrl } from "./constant";

export async function getProductDetails(productId) {
    try {
        const response = await fetch(`${backendUrl}/products/${productId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }
        const product = await response.json();
        return product;
    } catch (error) {
        console.error('Error fetching product details:', error);
        throw error; // Renvoie l'erreur pour une gestion ultérieure
    }
}
