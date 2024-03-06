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
      const response = await fetch('http://localhost:3000/api/products', {
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
      <h1>Product Structure Two Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            id="name"
            name="name"
            value={structureTwo.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="brand">
          Marca:
          <input
            type="text"
            id="brand"
            name="brand"
            value={structureTwo.details.brand}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="model">
          Modelo:
          <input
            type="text"
            id="model"
            name="model"
            value={structureTwo.details.model}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="color">
          Cor:
          <input
            type="text"
            id="color"
            name="color"
            value={structureTwo.details.color}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Preço:
          <input
            type="text"
            id="price"
            name="price"
            value={structureTwo.price}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default ProductForm2;
