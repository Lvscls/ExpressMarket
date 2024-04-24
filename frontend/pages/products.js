export const products = [
    {
        id: 1,
        name: 'Pain',
        description: 'Pain de qualité supérieure.',
        price: 2.18
    },
    {
        name: 'Dentifrice',
        description: 'Dentifrice rafraîchissant.',
        price: 1.16
    },
    {
        name: 'Chocolat',
        description: 'Chocolat noir fait avec des fèves de cacao.',
        price: 3.99
    },
    {
        name: 'Café',
        description: 'Café colombien fraîchement moulu.',
        price: 5.49
    },
    {
        name: 'Pâtes',
        description: 'Pâtes italiennes de qualité artisanale.',
        price: 1.99
    },
    {
        name: 'Savon',
        description: 'Savon naturel aux huiles essentielles.',
        price: 4.75
    },
    {
        name: 'Jus d\'orange',
        description: 'Jus d\'orange pressé à froid.',
        price: 2.99
    },
    {
        name: 'Fromage',
        description: 'Fromage affiné au lait de vache.',
        price: 7.25
    },
    {
        name: 'Lait',
        description: 'Lait frais de la ferme locale.',
        price: 1.89
    },
    {
        name: 'Yaourt',
        description: 'Yaourt grec à la vanille.',
        price: 3.25
    }
];

export function displayProducts(productListElement, filteredProducts, query) {
    try {
        productListElement.innerHTML = '';

        const productGrid = document.createElement('div');
        productGrid.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-4');
        
        const productsToDisplay = filteredProducts || products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );

        productsToDisplay.forEach(product => {
            const productElement = document.createElement('div');
            productElement.innerHTML = `
                <a href="product-details.html?id=${product.id}">
                    <div class="bg-white p-4 rounded-lg shadow-md">
                        <h3 class="text-lg font-semibold">${product.name}</h3>
                        <p class="text-gray-600">${product.description}</p>
                        <p class="text-gray-800 font-bold mt-2">${product.price} €</p>
                    </div>
                </a>
            `;
            productGrid.appendChild(productElement);
        });

        productListElement.appendChild(productGrid);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

