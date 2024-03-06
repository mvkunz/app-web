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
    <form onSubmit={handleSubmit}>
      <h1>Registrar Produto</h1>
      <div>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="brand">Marca:</label>
        <input
          type="text"
          id="brand"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="model">Modelo:</label>
        <input
          type="text"
          id="model"
          name="model"
          value={formData.model}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="price">Preço:</label>
        <input
          type="text"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="color">Cor:</label>
        <input
          type="text"
          id="color"
          name="color"
          value={formData.color}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Registrar</button>
    </form>
  );
}

export default ProductForm1;
