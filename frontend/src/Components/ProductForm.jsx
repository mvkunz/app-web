import { useState } from 'react';
import { NavLink } from "react-router-dom";

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
      <h2 className="text-4xl font-bold dark:text-white mt-8">CREATE A NEW PRODUCT:</h2>
      <form onSubmit={handleSubmit} className="flex flex-wrap justify-center items-center mt-20">
        <div className="flex flex-wrap mt-10">
          <div className="mt-10 ml-20">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Name
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2" placeholder="Xiaomi Redmi 9" required />
            </label>
          </div>
          <div className="mt-10 ml-20">
            <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Brand
              <input type="text" id="brand" name="brand" value={formData.brand} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2" placeholder="Xiaomi" required />
            </label>
          </div>
          <div className="mt-10 ml-20">
            <label htmlFor="model" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Model
              <input type="text" id="model" name="model" value={formData.model} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2" placeholder="Redmi 9" required />
            </label>
          </div>
        </div> 
        <div className="flex flex-wrap mt-10">
          <div className="mr-20">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Price
              <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2" placeholder="1000" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
            </label>
          </div>
          <div className="ml-20">
            <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Color
              <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2" placeholder="Red" required />
            </label>
          </div>
        </div>
      </form>
      <div className="flex flex-col items-center mt-5">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-2 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          REGISTER
        </button>
        <button
          type="button"
          className="py-1 px-3 me-2 mb-2 mt-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <NavLink to="/products">BACK TO ALL PRODUCTS </NavLink>
        </button>
      </div>

      {/* Lista de produto add pelo usuário */}
      <div>
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
