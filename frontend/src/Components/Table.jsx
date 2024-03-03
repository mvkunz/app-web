import { useEffect, useState } from 'react';

const Table = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    // Função para carregar os produtos da API
    const fetchProducts = async () => {
      try {
        const response = await fetch('url_da_sua_api/produtos');
        if (!response.ok) {
          throw new Error('Falha ao carregar produtos');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    };
    // Carrega os produtos ao montar o componente
    fetchProducts();
  }, []);

  const handleDetele = async (id) => {
    try {
      const response = await fetch(`url_da_sua_api/produtos/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Falha ao deletar produto');
    }
    setProducts(products.filter((product) => product.id !== id));
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
  }
};

  return (     
    <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-[#457B9D] dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Brand
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Model
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Color
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th scope="row" className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white">
                      {product.name}
                    </th>
                    <td className="px-6 py-4">
                      {product.brand}
                    </td>
                    <td className="px-6 py-4">
                      {product.model}
                    </td>
                    <td className="px-6 py-4">
                      {product.price}
                    </td>
                    <td className="px-6 py-4">
                      {product.color}
                    </td>
                    <td className="px-6 py-4">
                      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">UPDATE</button>
                      {' '}
                      <button
                        type="button"
                        onClick={() => handleDetele(product.id)}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))}
                 {/* aqui embaixo esta sem o map, escrevi a mao */}
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                    <th scope="row" className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white">
                      Xiaomi Redmi 9
                    </th>
                    <td className="px-6 py-4">
                      Xiaomi
                    </td>
                    <td className="px-6 py-4">
                      Redmi 9
                    </td>
                    <td className="px-6 py-4">
                      $10000
                    </td>
                    <td className="px-6 py-4">
                      Red
                    </td>
                    <td className="px-6 py-4">
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">UPDATE</button>
                      {' '}
                      <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">DELETE</button>
                    </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white">
                      Xiaomi Redmi 9
                    </th>
                    <td className="px-6 py-4">
                      Xiaomi
                    </td>
                    <td className="px-6 py-4">
                      Redmi 9
                    </td>
                    <td className="px-6 py-4">
                      $10000
                    </td>
                    <td className="px-6 py-4">
                      Red
                    </td>
                    <td className="px-6 py-4">
                      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">UPDATE</button>
                      {' '}
                      <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">DELETE</button>

                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
};

export default Table;