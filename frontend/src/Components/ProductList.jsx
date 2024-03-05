import NavBar from "./NavBar";
import ProductsFilter from "./ProductFilter";
import Table from "./Table";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProductsList = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyLocalStorage = () => {
      if (!localStorage.getItem('token')) {
        navigate('/auth/login')
      }
    }
    verifyLocalStorage();
  }, [navigate]);

  return (
    <div>
      <NavBar />
      <ProductsFilter />
      <Table />
    </div>
  )
};

export default ProductsList;