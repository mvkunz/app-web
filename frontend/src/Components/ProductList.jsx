import NavBar from "./NavBar";
import ProductsForm from "./ProductForm";
import ProductsFilter from "./ProductFilter";
import Table from "./Table";

const ProductsList = () => {
  return (
    <div>
      <NavBar />
      <h1 className="text-2xl font-bold">
      LIST OF PRODUCTS
      </h1>
      <ProductsForm />
      <ProductsFilter />
      <Table />
    </div>
  )
};

export default ProductsList;