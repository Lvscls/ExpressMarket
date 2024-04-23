import { products } from './pages/products.js';

export function getProductById(productId) {
    return products.find(product => product.id == productId);
}
