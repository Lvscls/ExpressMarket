export function SearchBar({onSearch}) {
    const handleSearch = (event) => {
      const query = event.target.value.trim();
      onSearch(query)
    };
  
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('placeholder', 'Rechercher un produit...');
    inputElement.classList.add('px-4', 'py-2', 'border', 'border-gray-300', 'rounded-md', 'focus:outline-none', 'focus:border-blue-500');
    inputElement.addEventListener('input', handleSearch);
  
    return inputElement;
}