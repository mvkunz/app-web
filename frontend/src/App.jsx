import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './Components/Login';
// import ProductsList from './Components/ProductsList';
// import ProductsForm from './Components/ProductsForm';

function App() {

  return (
    <>
      <Routes>
        <Route path="/auth/login" element={ <Login /> } />
        {/* <Route path="/products" element={ProductsList} />
        <Route path="/products" element={ProductsForm} />
        <Route path="products/:id" element={ProductsForm} /> */}
      </Routes>
    </>
  )
}

export default App
