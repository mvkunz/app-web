import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './Components/Login';
import Register from './Components/Register';
import ProductsList from './Components/ProductList';
// import ProductsForm from './Components/ProductsForm';
import NotFound from './Components/NotFound';

function App() {

  return (
    <>
      <Routes>
        <Route path="/auth/login" element={ <Login /> } />
        <Route path="/auth/register" element={ <Register /> } />
        <Route path="/products" element={ <ProductsList />} />
        {/* <Route path="/products" element={ProductsForm} />
        <Route path="products/:id" element={ProductsForm} /> */}
        <Route path="/*" element={ <NotFound /> } />
      </Routes>
    </>
  )
}

export default App
