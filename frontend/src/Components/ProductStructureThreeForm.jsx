import { useState } from 'react';

function StructureThreeForm() {
  const [products, setProducts] = useState([]);

  const handleAddProduct = () => {
    const newProduct = {
      name: "",
      brand: "",
      model: "",
      data: [{ price: '', color: '' }]
    };
    setProducts([...products, newProduct]);
  };

  const handleChange = (index, dataIndex, field, value) => {
    const updatedProducts = [...products];
    if (dataIndex === null) {
      // Update the product's name, brand, or model
      updatedProducts[index][field] = value;
    } else {
      // Update the nested data's price or color
      updatedProducts[index].data[dataIndex][field] = value;
    }
    setProducts(updatedProducts);
  };

  const handleAddData = (index) => {
    const newData = { price: '', color: '' };
    const updatedProducts = [...products];
    updatedProducts[index].data.push(newData);
    setProducts(updatedProducts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Assuming `products` is the state holding all the product data to be submitted
    // If your data structure is different, adjust accordingly
    const sendProduct = products ; // Wrapping products in an object if the API expects an object
  
    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure localStorage.getItem('token') retrieves the correct token
        },
        body: JSON.stringify(sendProduct),
      });
  
      if (!response.ok) {
        throw new Error('Error registering products. Please try again.');
      }
      setProducts([]);
  
      alert('Products registered successfully!');
      // navigate('/products');
    } catch (error) {
      console.error('Error submitting products:', error);
      alert(error.message);
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-bold mb-4">Add Products (Structure 3)</h2>
        <button type="button" onClick={handleAddProduct} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">Add Product</button>
        {products.map((product, index) => (
          <div key={index} className="border p-4 rounded space-y-2">
            <input
              type="text"
              placeholder="Product Name"
              value={product.name}
              onChange={(e) => handleChange(index, null, 'name', e.target.value)}
              className="input input-bordered w-full max-w-xs p-2 rounded border-gray-300 shadow-sm"
            />
            <input
              type="text"
              placeholder="Brand"
              value={product.brand}
              onChange={(e) => handleChange(index, null, 'brand', e.target.value)}
              className="input input-bordered w-full max-w-xs p-2 rounded border-gray-300 shadow-sm"
            />
            <input
              type="text"
              placeholder="Model"
              value={product.model}
              onChange={(e) => handleChange(index, null, 'model', e.target.value)}
              className="input input-bordered w-full max-w-xs p-2 rounded border-gray-300 shadow-sm"
            />
            {product.data.map((data, dataIndex) => (
              <div key={dataIndex} className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Price"
                  value={data.price}
                  onChange={(e) => handleChange(index, dataIndex, 'price', e.target.value)}
                  className="input input-bordered w-full max-w-xs p-2 rounded border-gray-300 shadow-sm"
                />
                <input
                  type="text"
                  placeholder="Color"
                  value={data.color}
                  onChange={(e) => handleChange(index, dataIndex, 'color', e.target.value)}
                  className="input input-bordered w-full max-w-xs p-2 rounded border-gray-300 shadow-sm"
                />
              </div>
            ))}
            <button type="button" onClick={() => handleAddData(index)} className="py-1 px-3 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none">Add Color & Price</button>
          </div>
        ))}
        <button type="submit" className="py-2 px-4 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none">Submit Products</button>
      </form>
    </div>
  );
}

export default StructureThreeForm;
