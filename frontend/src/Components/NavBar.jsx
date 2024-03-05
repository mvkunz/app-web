import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="flex justify-end mt-4 mr-4 mt-0">
      <button
        type="button"
        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
        <NavLink to="/product/create">
          ADD PRODUCT
        </NavLink>
      </button>
      <button
        type="button"
        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
        <NavLink to="/auth/login">
          EXIT
        </NavLink>
      </button>
    </nav>
  );
}

export default NavBar;
