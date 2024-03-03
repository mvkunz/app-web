function ProductsForm() {
  return (
    <div>
      <h3 className="text-1xl font-bold">ADD NEW PRODUCT</h3>
      <form>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                    Name
                    <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Xiaomi Redmi 9" required />
                  </label>
              </div>
              <div>
                  <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                    Brand
                    <input type="text" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Xiaomi" required />
                  </label>
              </div>
              <div>
                  <label htmlFor="model" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                    Model
                    <input type="text" id="model" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Redmi 9" required />
                  </label>
              </div>  
              <div>
                  <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                    Price
                    <input type="tel" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1000" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                  </label>
              </div>
          </div>
          <div className="mb-6">
              <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Color
                <input type="email" id="color" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Red" required />
              </label>
          </div> 
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-2 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            REGISTER
          </button>
      </form>

    </div>
  )
}

export default ProductsForm;
