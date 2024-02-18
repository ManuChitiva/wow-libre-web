"use client";

import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faCoins,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import "./index.css";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  price: number;
}

const WowMenu: React.FC = () => {
  const { user, setUser } = useUserContext();

  const [cart, setCart] = useState<Product[]>([]);
  const [money, setMoney] = useState<number>(500);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<string>("Promociones");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  const productsPerPage = 2; // Cantidad de productos por página
  const offset = currentPage * productsPerPage;

  // Ejemplo de productos para cada sección (reemplázalo con tus propios datos)
  const productsBySection: Record<string, Product[]> = {
    Promociones: [
      { id: 1, name: "Espada Épica", price: 100 },
      { id: 2, name: "Gema Rara", price: 50 },
      { id: 3, name: "Poción de Salud", price: 20 },
    ],
    Armas: [
      { id: 4, name: "Armadura Mística", price: 120 },
      { id: 5, name: "Varita Encantada", price: 80 },
      { id: 6, name: "Varita Encantada", price: 80 },
      { id: 7, name: "Varita Encantada", price: 80 },
      { id: 58, name: "Varita Encantada", price: 80 },
      { id: 52, name: "Varita Encantada", price: 80 },
      { id: 523, name: "Varita Encantada", price: 80 },
    ],
    Monturas: [
      { id: 6, name: "Mapa del Tesoro", price: 30 },
      { id: 7, name: "Mapa del Tesoro", price: 30 },
      { id: 8, name: "Mapa del Tesoro", price: 30 },
      { id: 9, name: "Mapa del Tesoro", price: 30 },
      { id: 10, name: "Mapa del Tesoro", price: 30 },
      { id: 11, name: "Mapa del Tesoro", price: 30 },
      { id: 12, name: "Mapa del Tesoro", price: 30 },
    ],
  };

  const currentProducts = productsBySection[selectedTab] || [];
  const paginatedProducts = currentProducts.slice(
    offset,
    offset + productsPerPage
  );

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const buyItems = () => {
    const total = calculateTotal();
    if (total > money) {
      alert("No tienes suficiente dinero para comprar estos artículos.");
    } else {
      setMoney(money - total);
      setCart([]);
      alert("Compra realizada con éxito.");
    }
  };

  const pageCount = Math.ceil(currentProducts.length / productsPerPage);

  const handlePageClick = (selected: { selected: number }) => {
    setCurrentPage(selected.selected);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const [isCartMenuOpen, setIsCartMenuOpen] = useState<boolean>(false);

  const openCartMenu = () => {
    setIsCartMenuOpen(true);
  };

  const closeCartMenu = () => {
    setIsCartMenuOpen(false);
  };

  const removeCartItem = (productId: number) => {
    removeFromCart(productId);
    closeCartMenu(); // Cierra el menú después de eliminar un item del carrito
  };

  const handleLogin = () => {
    router.push("/");
  };

  if (user === null || user.logged_in === false) {
    return (
      <>
        {" "}
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              ¡Bienvenido a WoW Store!
            </h1>
            <p className="mb-4">
              Debes iniciar sesión en World of Warcraft para acceder a la
              tienda.
            </p>
            <button
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Iniciar sesión en WoW
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex items-center justify-center bg-gray-50 container ">
      {/* Sidebar (para dispositivos de escritorio) */}
      <div className="hidden md:flex w-4/3 bg-gray-50 text-black p-8">
        <Tabs>
          <TabList className="border-b border-white-600">
            {Object.keys(productsBySection).map((section) => (
              <Tab
                key={section}
                className={`py-2 px-20 hover:bg-white-700 cursor-pointer ${
                  selectedTab === section ? "bg-orange-500 text-white" : ""
                }`}
                onClick={() => setSelectedTab(section)}
              >
                <span className="text-lg">{section}</span>
              </Tab>
            ))}
          </TabList>
        </Tabs>
      </div>

      {/* Contenido principal */}
      <div className="w-4/6 mx-auto my-10 ">
        {/* Barra de navegación móvil */}
        <div className="md:hidden  flex justify-between items-center bg-midnight p-4">
          <h1 className="text-2xl font-bold text-white">WoW Store</h1>
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            {isMobileMenuOpen ? "Cerrar" : "Menú"}
          </button>
        </div>

        {/* Menú lateral para dispositivos móviles */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-midnight text-white p-4">
            <Tabs>
              <TabList className="border-b border-gray-600">
                {Object.keys(productsBySection).map((section) => (
                  <Tab
                    key={section}
                    className={`py-2 px-4 hover:bg-gray-700 cursor-pointer ${
                      selectedTab === section ? "bg-gray-700" : ""
                    }`}
                    onClick={() => {
                      setSelectedTab(section);
                      toggleMobileMenu();
                    }}
                  >
                    {section}
                  </Tab>
                ))}
              </TabList>
              <div className="mt-4">
                {Object.keys(productsBySection).map((section) => (
                  <TabPanel key={section}>
                    <p>Contenido de la pestaña de {section}</p>
                  </TabPanel>
                ))}
              </div>
            </Tabs>
          </div>
        )}
        {/* Sección del carrito y dinero */}
        <div className="mt-4  flex justify-end mr-44 container">
          {/* Sección del carrito */}
          <div className="mr-8 relative">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-2xl mr-2 cursor-pointer"
              onClick={openCartMenu}
            />
            <span className="font-semibold cursor-pointer">
              Carrito ({cart.length})
            </span>

            {/* Menú del carrito */}
            {isCartMenuOpen && (
              <div className="absolute right-0 top-10 bg-white p-4 border rounded-md shadow-md">
                <h2 className="text-lg font-semibold mb-2">Carrito</h2>
                {cart.length === 0 ? (
                  <p>El carrito está vacío.</p>
                ) : (
                  <ul>
                    {cart.map((item) => (
                      <li key={item.id} className="mb-2">
                        {item.name} - ${item.price}
                        <button
                          onClick={() => removeCartItem(item.id)}
                          className="ml-2 text-red-500"
                        >
                          Eliminar
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-2 font-semibold">
                  Total: ${calculateTotal()}
                </div>
                <button
                  onClick={buyItems}
                  className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Comprar
                </button>
                <button
                  onClick={closeCartMenu}
                  className="mt-2 ml-2 text-gray-500"
                >
                  Cerrar
                </button>
              </div>
            )}
          </div>

          {/* Sección del dinero disponible */}
          <div>
            <FontAwesomeIcon icon={faCoins} className="text-2xl mr-2" />
            <span className="font-semibold">Dinero Disponible: ${money}</span>
          </div>
        </div>
        {/* Resto del contenido principal */}
        <div className="p-4">
          {/* Contenido principal de la página */}
          <h1 className="text-4xl font-bold mb-6"> {selectedTab}</h1>
          <p>
            Descubre los mejores items para tu épica aventura en Azeroth.
            Equípate con lo extraordinario y prepárate para desafíos
            inolvidables. ¡Haz cada elección clave y transforma tu viaje en algo
            legendario!
          </p>

          <div className="flex flex-wrap pt-5">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="max-w-xs bg-white p-4 m-2 rounded-md shadow-md"
              >
                <img
                  className="w-full h-32 object-cover object-center mb-4"
                  src={""} // Agrega la URL de la imagen si tienes una
                  alt={product.name}
                />
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-700">${product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Agregar al carrito
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Paginación */}
        <div className="mt-6 flex justify-center mb-10">
          <ReactPaginate
            pageCount={pageCount}
            forcePage={currentPage}
            previousLabel={"Anterior"}
            nextLabel={"Siguiente"}
            breakLabel={"..."}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageClassName={"pagination-item"}
            activeClassName={"active"}
            previousClassName={"pagination-item"}
            nextClassName={"pagination-item"}
            previousLinkClassName={"pagination-link"}
            nextLinkClassName={"pagination-link"}
            breakClassName={"pagination-item break"}
          />
        </div>
      </div>
    </div>
  );
};

export default WowMenu;
