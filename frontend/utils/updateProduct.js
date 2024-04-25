import { backendUrl } from "./constant";


export async function updateProduct(productId, updatedData) {
    console.log(updatedData)
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token d\'authentification manquant');
        }

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` ,
                'X-CSRF-TOKEN': updatedData._csrf
            },
            body: JSON.stringify(updatedData) 
        };

        const response = await fetch(`${backendUrl}/manage/${productId}`, requestOptions);


        const updatedProduct = await response;
        return updatedProduct;
    } catch (error) {
        throw new Error(error.message);
    }
}
