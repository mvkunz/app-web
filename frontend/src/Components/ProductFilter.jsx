import { useState, useEffect } from "react";
import PropTypes from 'prop-types';


function ProductFilter({ onFilterUpdate, allProducts }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('All');
  const [input, setInput] = useState('');


  const handleInputChange = (event) => {
    setInput(event.target.value);
  }

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setDropdownVisible(false);
  }

  useEffect(() => {
    // Filtro dos produtos baseado na opção selecionada e no input
    let filteredResults = allProducts;

    if (input.trim() !== '' && selectedOption !== 'All') {
      filteredResults = allProducts.filter((product) => {
        const fieldValue = product[selectedOption.toLowerCase()];
        return fieldValue && fieldValue.toString().toLowerCase().includes(input.toLowerCase());
      });
    }

    // Chama a função de callback passada pelo componente pai para atualizar os produtos filtrados
    onFilterUpdate(filteredResults);
  }, [input, selectedOption, allProducts, onFilterUpdate]); // Dependências do useEffect


  return (
    <form className="mb-10" onSubmit={(e) => e.preventDefault()}>
      <div className="flex relative">
        {/* CAMPO DROPDOWN */}
        <div>
          <button
            id="dropdown-button"
            data-dropdown-toggle="dropdown"
            onClick={() => setDropdownVisible(!dropdownVisible)}
            className={`flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 ${dropdownVisible ? 'bg-blue-500 text-white' : ''}`}
            type="button">
            {selectedOption}
            <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>
          {dropdownVisible && (
            <div id="dropdown" className="z-10 w-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                <li>
                  <a href="#" onClick={() => handleOptionClick('Name')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Name</a>
                </li>
                <li>
                  <a href="#" onClick={() => handleOptionClick('Brand')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Brand</a>
                </li>
                <li>
                  <a href="#" onClick={() => handleOptionClick('Model')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Model</a>
                </li>
                <li>
                  <a href="#" onClick={() => handleOptionClick('Price')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Price</a>
                </li>
                <li>
                  <a href="#" onClick={() => handleOptionClick('Color')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Color</a>
                </li>
              </ul>
            </div>
          )}
        </div>
        {/* CAMPO PESQUISAR */}
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            value={input}
            onChange={handleInputChange}
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Search"
            required />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </button>
        </div>
      </div>
    </form>
  )
}

ProductFilter.propTypes = {
  onFilterUpdate: PropTypes.func.isRequired,
  allProducts: PropTypes.array.isRequired
};

export default ProductFilter;