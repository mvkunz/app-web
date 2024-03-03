import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../Components/Login";
import ProductsList from "../Components/ProductList";
import ProductsForm from "../Components/ProductForm";

const Routes = () => {
  return (
    <Router>
      <Route path='/auth/login' component={Login} />
      <Route path='/products' component={ProductsList} />
      <Route path='/products' component={ProductsForm} />
      <Route path='products/:id' component={ProductsForm} />
    </Router>
  )
}

export default Routes;
