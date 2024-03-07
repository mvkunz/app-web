import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";
import ProductsFilter from "./ProductFilter";
import Table from "./Table";

const ProductsList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const verifyLocalStorage = () => {
      if (!localStorage.getItem('token')) {
        navigate('/auth/login');
      } else {
        fetchProducts(); // Chama a função para carregar os produtos após a verificação do token
      }
    };

    const fetchProducts = async () => {
      // Implemente a lógica de busca dos produtos aqui
      // Exemplo:
      try {
        const response = await fetch('https://backend-products-b0316b247c2e.herokuapp.com/api/products', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Falha ao carregar produtos');
        }
        const data = await response.json();
        setProducts(data); // Atualiza o estado dos produtos
        setFilteredProducts(data); // Inicializa os produtos filtrados com todos os produtos
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    };

    verifyLocalStorage();
  }, [navigate]);

  const handleFilterUpdate = (filtered) => {
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <NavBar />
      <ProductsFilter onFilterUpdate={handleFilterUpdate} allProducts={products} />
      <Table products={filteredProducts} />
    </div>
  );
};

export default ProductsList;
