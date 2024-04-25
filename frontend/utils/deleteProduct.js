import { backendUrl } from "./constant";
async function deleteProduct(productId) {
    try {

        const token = localStorage.getItem('token');
        const response = await fetch(`${backendUrl}/manage/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
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
