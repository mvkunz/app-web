import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function ProductsForm() {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyLocalStorage = () => {
      if (!localStorage.getItem('token')) {
        navigate('/auth/login');
      }
    };
    verifyLocalStorage();
  }, [navigate]);

  const [showForm1, setShowForm1] = useState(false);
  const [showForm2, setShowForm2] = useState(false);

  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    price: '',
    color: ''
  }); // estrutura 1

  const [structureTwo, setStructureTwo] = useState({
    name: '',
    details: {
      brand: '',
      model: '',
      color: ''
    },
    price: '',
  });

  const handleShowForm1 = () => {
    setShowForm1(true);
    setShowForm2(false);
  }

  const handleShowForm2 = () => {
    setShowForm2(true);
    setShowForm1(false);

  }

  // atualiza o estado do formData com os valores do formulário
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (showForm1) {
      setFormData({
        ...formData,
        [name]: value
      });
    } else if (showForm2) {
      if (name === 'brand' || name === 'model' || name === 'color') {
        setStructureTwo(prevState => ({
          ...prevState,
          details: {
            ...prevState.details,
            [name]: value
          }
        }));
      } else {
        setStructureTwo({
          ...structureTwo,
          [name]: value
        });
      }
    }
  };
  // preenche o form
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let sendProduct;
      if (showForm1) {
        sendProduct = formData;
      } else if (showForm2) {
        sendProduct = structureTwo;
      }
      const response = await fetch('https://backend-products-b0316b247c2e.herokuapp.com/api/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(sendProduct),
      });
      if (!response.ok) {
        throw new Error('Erro ao registrar. Por favor, tente novamente.');
      }
      if (response.ok) {
        let newProduct;
        if (showForm1) {
          // Cria um novo objeto com os dados do formulário
          newProduct = {
            name: formData.name,
            brand: formData.brand,
            model: formData.model,
            price: formData.price,
            color: formData.color
          };
        } else if (showForm2) {
          // Cria um novo objeto com os dados do formulário
          newProduct = {
            name: structureTwo.name,
            details: {
              brand: structureTwo.details.brand,
              model: structureTwo.details.model,
              color: structureTwo.details.color,
            },
            price: structureTwo.price,
          };
        }
        console.log(newProduct);
        setProducts([...products, newProduct]);
      }
      // Limpa o formulário
      setFormData({
        name: '',
        brand: '',
        model: '',
        price: '',
        color: ''
      });
      setStructureTwo({
        name: '',
        details: {
          brand: '',
          model: '',
          color: '',
        },
        price: '',
      })
      alert('Produto registrado com sucesso!');
      navigate('/products');
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  };

  const handleSubmitStructureTwo = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://backend-products-b0316b247c2e.herokuapp.com/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(structureTwo),
      });
      if (!response.ok) {
        throw new Error('Erro ao registrar. Por favor, tente novamente.');
      }
      if (response.ok) {
        // Cria um novo objeto com os dados do formulário
        const newProduct = {
          name: structureTwo.name,
          details: {
            brand: structureTwo.details.brand,
            model: structureTwo.details.model,
            color: structureTwo.details.color,
          },
          price: structureTwo.price,
        };
        // Adiciona o novo produto ao array de produtos
        setProducts([...products, newProduct]);
      }
      // Limpa o formulário
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
      <h2 className="text-4xl font-bold text-white dark:text-white mt-8">CREATE A NEW PRODUCT:</h2>
      <div className="mt-5">
        <button
          type="button"
          onClick={handleShowForm1}
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
        >
          ADD ONE PRODUCT
        </button>
        {showForm1 && (
          <div>
            <form onSubmit={handleSubmit} className="flex flex-wrap justify-center items-center mt-20">
              <div className="flex flex-wrap mt-10">
                <div className="mt-10 ml-20">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-white dark:text-black">
                    Name
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2" placeholder="Xiaomi Redmi 9" required />
                  </label>
                </div>
                <div className="mt-10 ml-20">
                  <label htmlFor="brand" className="block mb-2 text-sm font-medium text-white dark:text-black">
                    Brand
                    <input type="text" id="brand" name="brand" value={formData.brand} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2" placeholder="Xiaomi" required />
                  </label>
                </div>
                <div className="mt-10 ml-20">
                  <label htmlFor="model" className="block mb-2 text-sm font-medium text-white dark:text-black">
                    Model
                    <input type="text" id="model" name="model" value={formData.model} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2" placeholder="Redmi 9" required />
                  </label>
                </div>
              </div>
              <div className="flex flex-wrap mt-10">
                <div className="mr-20">
                  <label htmlFor="price" className="block mb-2 text-sm font-medium text-white dark:text-black">
                    Price
                    <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2" placeholder="1000" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                  </label>
                </div>
                <div className="ml-20">
                  <label htmlFor="color" className="block mb-2 text-sm font-medium text-white dark:text-black">
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
                onClick={handleSubmit}
              >
                REGISTER
              </button>
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={handleShowForm2}
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
        >
          ADD PRODUCT DETAILS
        </button>
        {showForm2 && (
          <div>
            <form onSubmit={handleSubmitStructureTwo} className="flex flex-wrap justify-center items-center mt-20">
              <div className="flex flex-wrap mt-10">
                <div className="mt-10 ml-20">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-white dark:text-black">
                    Name
                    <input type="text" id="name" name="name" value={structureTwo.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2" placeholder="Xiaomi Redmi 9" required />
                  </label>
                </div>
                <div className="mt-10 ml-20">
                  <label htmlFor="price" className="block mb-2 text-sm font-medium text-white dark:text-black">
                    Price
                    <input type="number" id="price" name="price" value={structureTwo.price} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2" placeholder="1000" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                  </label>
                </div>
              </div>
              <div className="mt-10 ml-20">
                <h2 className="block mb-2 text-sm font-medium text-white dark:text-black">
                  DETAILS:
                </h2>
                <div className="flex flex-wrap">
                  <div className="mt-4 mr-20">
                    <label htmlFor="brand" className="block mb-2 text-sm font-medium text-white dark:text-black">
                      Brand
                      <input type="text" id="brand" name="brand" value={structureTwo.details.brand} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2" placeholder="Xiaomi" required />
                    </label>
                  </div>
                  <div className="mt-4 ml-20">
                    <label htmlFor="model" className="block mb-2 text-sm font-medium text-white dark:text-black">
                      Model
                      <input type="text" id="model" name="model" value={structureTwo.details.model} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2" placeholder="Redmi 9" required />
                    </label>
                  </div>
                  <div className="mt-4 ml-20">
                    <label htmlFor="color" className="block mb-2 text-sm font-medium text-white dark:text-black">
                      Color
                      <input type="text" id="color" name="color" value={structureTwo.details.color} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2" placeholder="Red" required />
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center mt-5">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-2 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleSubmit}
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
            </form>
          </div>
        )}
        <button
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
        >
          ADD MORE THAN ONE PRODUCT
        </button>
        <div className="flex justify-center mt-5">
          <button
            type="button"
            className="py-1 px-3 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <NavLink to="/products">BACK TO ALL PRODUCTS </NavLink>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductsForm;
