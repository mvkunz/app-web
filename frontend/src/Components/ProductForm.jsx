import { useState } from 'react';

function ProductsForm() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    price: '',
    color: ''
  });

  // atualiza o estado do formData com os valores do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  // preenche o form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Cria um novo objeto com os dados do formulário
    const newProduct = {
      name: formData.name,
      brand: formData.brand,
      model: formData.model,
      price: formData.price,
      color: formData.color
    };
    // Adiciona o novo produto ao array de produtos
    setProducts([...products, newProduct]);
    // Limpa o formulário
    setFormData({
      name: '',
      brand: '',
      model: '',
      price: '',
      color: ''
    });
  };

  return (
    <div>
      <h3 className="text-1xl font-bold">ADD NEW PRODUCT</h3>
      <form onSubmit={handleSubmit}>
          <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Name
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Xiaomi Redmi 9" required />
              </label>
          </div>
          <div>
              <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Brand
                <input type="text" id="brand" name="brand" value={formData.brand} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Xiaomi" required />
              </label>
          </div>
          <div>
              <label htmlFor="model" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Model
                <input type="text" id="model" name="model" value={formData.model} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Redmi 9" required />
              </label>
          </div>  
          <div>
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Price
                <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1000" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
              </label>
          </div>
          <div>
              <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Color
                <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Red" required />
              </label>
          </div> 
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-2 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            REGISTER
          </button>
      </form>

      {/* Lista de produto add pelo usuário */}
      <div>
        <h3 className="text-1xl font-bold">PRODUCTS LIST</h3>
        {products.map((product, index) => (
          <div key={index}>
            <p>Name: {product.name}</p>
            <p>Brand: {product.brand}</p>
            <p>Model: {product.model}</p>
            <p>Price: {product.price}</p>
            <p>Color: {product.color}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsForm;
