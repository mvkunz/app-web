import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Table = ({ products }) => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/product/update/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://backend-products-b0316b247c2e.herokuapp.com/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Falha ao deletar produto');
      }
      // Emitir um evento ou chamar uma prop callback para informar o componente pai que o produto foi deletado.
      alert('Produto deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  return (
    <div className="relative overflow-x-auto rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-[#457B9D] dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Brand</th>
            <th scope="col" className="px-6 py-3">Model</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-6 py-3">Color</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white">
                {product.name}
              </th>
              <td className="px-6 py-4">{product.brand}</td>
              <td className="px-6 py-4">{product.model}</td>
              <td className="px-6 py-4">{product.price}</td>
              <td className="px-6 py-4">{product.color}</td>
              <td className="px-6 py-4">
                <button
                  type="button"
                  onClick={() => handleEdit(product.id)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  UPDATE
                </button>
                {' '}
                <button
                  type="button"
                  onClick={() => handleDelete(product.id)}
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  products: PropTypes.array.isRequired
};

export default Table;
