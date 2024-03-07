import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductForm1() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    price: '',
    color: '',
  });

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/auth/login');
    }
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Erro ao registrar. Por favor, tente novamente.');
      }
      setFormData({
        name: '',
        brand: '',
        model: '',
        price: '',
        color: '',
      });
      alert('Produto registrado com sucesso!');
      navigate('/products');
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap justify-center items-center mt-20">
      <h1 className="text-4xl font-bold dark:text-white mt-8">Registrar Produto</h1 >
      <div className="flex flex-wrap mt-10 ml-20">
        <div className="mt-10 ml-10">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2" placeholder="Xiaomi Redmi 9" required
          />
        </div>
        <div className="mt-10 ml-20">
          <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Marca:</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2" placeholder="Xiaomi" required
          />
        </div>
        <div className="mt-10 ml-20">
          <label htmlFor="model" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Modelo:</label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2" placeholder="Redmi 9" required
          />
        </div>
        <div className="flex flex-wrap mt-10 ml-80">
          <div className="mr-100">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Preço:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
              placeholder="1000"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              required
            />
          </div>
          <div className="ml-20">
            <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Cor:</label>
            <input
              type="text"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
              placeholder="Red"
              required
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-5">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-2 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Registrar
        </button>
      </div>
    </form>
  );
}

export default ProductForm1;