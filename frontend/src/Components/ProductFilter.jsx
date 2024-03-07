import { useState } from "react";

function ProductFilter() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [input, setInput] = useState('');
  const [resultsApi, setResultsApi] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // função para buscar produtos
  const handleSearch = async () => {
    try {
      // faz uma solicitação a API
      const response = await fetch(`https://backend-products-b0316b247c2e.herokuapp.com/api/products/${input}`);
      if (!response.ok) {
        throw new Error('Falha ao buscar dados');
      }
      const data = await response.json();
      // atualiza o estado com os resultados da pesquisa
      setResultsApi(data.results);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

//   useEffect(() => {
//     const handleSearch = async () => {
//       try {
//         const response = await fetch(`https://backend-products-b0316b247c2e.herokuapp.com/api/products/${input}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         if (!response.ok) {
//           throw new Error('Falha ao buscar dados');
//         }
//         const data = await response.json();
//         console.log('Data:', data.results);
//         setResultsApi(resultsApi.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())));
//     } catch (error) {
//       console.error('Erro ao buscar dados:', error);
//     }
//   };
//   handleSearch();
// }, [input]);

  return (
    <form className="mb-10">
      <div className="flex relative">
        {/* CAMPO DROPDOWN */}
        <div>
          <button
            id="dropdown-button"
            data-dropdown-toggle="dropdown"
            onClick={() => setDropdownVisible(!dropdownVisible)}
            className={`flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 ${dropdownVisible ? 'bg-blue-500 text-white' : ''}`}
            type="button">
            All
            <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>
          {dropdownVisible && (
            <div id="dropdown" className="z-10 w-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Name</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Brand</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Model</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Price</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Color</a>
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
            value={ searchTerm }
            onChange={(event) => setSearchTerm(event.target.value)}
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Search"
            required />
          <button
            type="submit"
            onClick={handleSearch}
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

export default ProductFilter;
