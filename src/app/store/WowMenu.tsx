"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import {
  faSearch,
  faUser,
  faCoins,
  faTshirt,
  faLaptop,
  faGamepad,
  faBook,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { Product } from "./page";

export const WowMenu: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [cart, setCart] = useState<Product[]>([]);

  // Ejemplo de lista de productos
  const products: Product[] = [
    { id: 1, name: "Product 1", image: "URL_IMAGEN_1", price: 10 },
    { id: 2, name: "Product 2", image: "URL_IMAGEN_2", price: 20 },
    { id: 3, name: "Product 3", image: "URL_IMAGEN_3", price: 15 },
    { id: 4, name: "Product 4", image: "URL_IMAGEN_4", price: 25 },
    // Agrega más productos según sea necesario
  ];

  const productsPerPage = 5; // Cantidad de productos por página
  const offset = currentPage * productsPerPage;

  const paginatedProducts = products.slice(offset, offset + productsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="bg-midnight ">
      <div className="container mx-auto py-8 ">
        {/* Barra superior */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center  text-white">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            <span className="text-lg mr-4">Nombre de Usuario</span>
            <FontAwesomeIcon icon={faCoins} className="mr-2" />
            <span className="text-lg">Saldo: $100</span>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>

        {/* Banner */}
        <div className="w-full h-80 bg-gray-500 mb-4">
          {/* Contenido del banner, como texto o imagen */}
        </div>

        {/* Barra de categorías */}
        <div className="flex justify-center mb-4 ">
          <button className="mx-2 text-lg text-gray-300">
            <FontAwesomeIcon icon={faTshirt} className="mr-2 " />
            Todos
          </button>
          <button className="mx-2 text-lg text-gray-500">
            <FontAwesomeIcon icon={faLaptop} className="mr-2" />
            Electrónica
          </button>
          <button className="mx-2 text-lg text-gray-500">
            <FontAwesomeIcon icon={faGamepad} className="mr-2" />
            Videojuegos
          </button>
          <button className="mx-2 text-lg text-gray-500">
            <FontAwesomeIcon icon={faBook} className="mr-2" />
            Libros
          </button>
          <button className="mx-2 text-lg text-gray-500">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Otros
          </button>
        </div>

        {/* Lista de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Columna de la izquierda */}
          <div className="sm:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Título de la Columna</h2>
            <p>Aquí puedes agregar cualquier texto que desees mostrar.</p>
            {/* Agrega más contenido según sea necesario */}
          </div>

          {/* Columna de la derecha con los productos */}
          <div className="sm:col-span-1">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col justify-between bg-white p-4 rounded-md shadow-md"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover mb-4"
                />
                <div className="flex justify-between items-center">
                  <p className="text-lg">{product.name}</p>
                  <div className="flex items-center">
                    <p className="text-gray-600">${product.price}</p>
                    <button
                      className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      onClick={() => addToCart(product)}
                    >
                      <FontAwesomeIcon icon={faComment} className="mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Paginación */}
        <ReactPaginate
          pageCount={Math.ceil(products.length / productsPerPage)}
          forcePage={currentPage}
          onPageChange={handlePageChange}
          previousLabel={"Previous"}
          nextLabel={"Next"}
          containerClassName={"flex justify-center mt-4"}
          previousClassName={
            "border rounded-l-md px-4 py-2 border-blue-500 bg-blue-500 text-white hover:bg-blue-600"
          }
          nextClassName={
            "border rounded-r-md px-4 py-2 border-blue-500 bg-blue-500 text-white hover:bg-blue-600"
          }
          pageClassName={
            "border px-4 py-2 border-blue-500 text-blue-500 hover:bg-blue-100"
          }
          breakClassName={
            "border px-4 py-2 border-blue-500 text-blue-500 hover:bg-blue-100"
          }
          activeClassName={"bg-blue-500 text-white"}
          disabledClassName={"opacity-50"}
        />
      </div>
    </div>
  );
};
