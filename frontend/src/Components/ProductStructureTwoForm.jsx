import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductForm2() {
  const navigate = useNavigate();

  const [structureTwo, setStructureTwo] = useState({
    name: '',
    details: {
      brand: '',
      model: '',
      color: '',
    },
    price: '',
  });

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/auth/login');
    }
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'brand' || name === 'model' || name === 'color') {
      setStructureTwo(prevState => ({
        ...prevState,
        details: {
          ...prevState.details,
          [name]: value,
        },
      }));
    } else {
      setStructureTwo({
        ...structureTwo,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://backend-products-b0316b247c2e.herokuapp.com/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(structureTwo),
      });
      if (!response.ok) {
        throw new Error('Erro ao registrar. Por favor, tente novamente.');
      }
      setStructureTwo({
        name: '',
        details: {
          brand: '',
          model: '',
          color: '',
        },
        price: '',
      });
      alert('Produto registrado com sucesso!');
      navigate('/products');
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mt-8">Product Structure Two Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap mt-10 ml-20">
          <div className="mt-10 ml-10">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-white dark:text-black">
              Nome:
              <input
                type="text"
                id="name"
                name="name"
                value={structureTwo.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2" placeholder="Xiaomi Redmi 9"
                required
              />
            </label>
          </div>
          <div className="mt-10 ml-20">
            <label htmlFor="brand" className="block mb-2 text-sm font-medium text-white dark:text-black">
              Marca:
              <input
                type="text"
                id="brand"
                name="brand"
                value={structureTwo.details.brand}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2" placeholder="Xiaomi" required
              />
            </label>
          </div>
          <div className="mt-10 ml-20">
            <label htmlFor="model" className="block mb-2 text-sm font-medium text-white dark:text-black">
              Modelo:
              <input
                type="text"
                id="model"
                name="model"
                value={structureTwo.details.model}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2" placeholder="Redmi 9" required
              />
            </label>
          </div>
          <div className="flex flex-wrap mt-10 ml-80">
            <div className="mr-100">
              <label htmlFor="color" className="block mb-2 text-sm font-medium text-white dark:text-black">
                Cor:
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={structureTwo.details.color}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
                  placeholder="1000"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  required
                />
              </label>
            </div>
            <div className="ml-20">
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-white dark:text-black">
                Preço:
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={structureTwo.price}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
                  placeholder="1000"
                  required
                />
              </label>
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
    </div>
  );
}

export default ProductForm2;
