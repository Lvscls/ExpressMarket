import { backendUrl } from "./constant";

export async function fetchCategoryStats() {
    try {
        const response = await fetch(`${backendUrl}/stats`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des statistiques des catégories');
        }
        const categoryStats = await response.json();
        console.log(categoryStats)
        return categoryStats;
    } catch (error) {
        console.error('Erreur:', error.message);
        return [];
    }
}