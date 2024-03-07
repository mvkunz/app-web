import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './Components/Login';
import Register from './Components/Register';
import ProductsList from './Components/ProductList';
import ProductForm from './Components/ProductForm';
import NotFound from './Components/NotFound';
import StructureThreeForm from './Components/ProductStructureThreeForm';
import ProductStructureOneForm from './Components/ProductStructureOneForm';
import ProductStructureTwoForm from './Components/ProductStructureTwoForm';

function App() {

  return (
    <>
      <Routes>
        <Route path="/auth/login" element={ <Login /> } />
        <Route path="/auth/register" element={ <Register /> } />
        <Route path="/products" element={ <ProductsList />} />
        <Route path="/product/create" element={<ProductForm />} />
        <Route path="/*" element={ <NotFound /> } />
        <Route path="/product/create/structurethree" element={ <StructureThreeForm /> } />
        <Route path="/product/create/structureone" element={ <ProductStructureOneForm /> } />
        <Route path="/product/create/structuretwo" element={ <ProductStructureTwoForm /> } />
        <Route path="/product/update/:id" element={ <StructureThreeForm /> } />

      </Routes>
    </>
  )
}

export default App
