import { backendUrl } from './constant.js';

export async function fetchCategories() {
    try {
        const response = await fetch(`${backendUrl}/categories`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des catégories');
        }
        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error.message);
        return []; 
    }
}
