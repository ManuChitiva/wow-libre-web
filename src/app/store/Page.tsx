"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "tailwindcss/tailwind.css"; // Importa los estilos de Tailwind CSS
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
import Products from "@/components/store/products";
interface Product {
  id: number;
  name: string;
  image: string; // URL de la imagen del producto
  price: number; // Precio del producto
}
interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
  products: Product[];
}

const WowMenu: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [cart, setCart] = useState<Product[]>([]);

  // Ejemplo de lista de productos
  const products: Product[] = [
    {
      id: 4,
      name: "World of Warcraft®: Prueba gratuita",
      image: "https://i.ibb.co/NrDPFTH/wow-sub-2022-CMS-RD01-1920x1080.webp",
      price: 102,
    },
    {
      id: 3,
      name: "World of Warcraft®: Oferta especial de suscripción",
      image:
        "https://i.ibb.co/44JwcQ9/WOW-Shop-Browsing-Card-pve-stat-enus-1920x1080-12-Month.jpg",
      price: 20,
    },
    { id: 1, name: "Product 3", image: "URL_IMAGEN_3", price: 15 },
    { id: 2, name: "Product 4", image: "URL_IMAGEN_4", price: 25 },
    // Agrega más productos según sea necesario
  ];
  const products2: Product[] = [
    { id: 1, name: "Product 52", image: "URL_IMAGEN_1", price: 10 },
    { id: 2, name: "Product 32", image: "URL_IMAGEN_2", price: 20 },
    { id: 3, name: "Product 213", image: "URL_IMAGEN_3", price: 15 },
    // Agrega más productos según sea necesario
  ];
  const products4: Product[] = [
    { id: 1, name: "Product 52", image: "URL_IMAGEN_1", price: 10 },
    { id: 2, name: "Product 32", image: "URL_IMAGEN_2", price: 20 },
    { id: 3, name: "Product 213", image: "URL_IMAGEN_3", price: 15 },
    { id: 4, name: "Product 213", image: "URL_IMAGEN_3", price: 15 },
    { id: 5, name: "Product 213", image: "URL_IMAGEN_3", price: 15 },
    { id: 6, name: "Product 213", image: "URL_IMAGEN_3", price: 15 },
    { id: 7, name: "Product 215", image: "URL_IMAGEN_3", price: 15 },

    // Agrega más productos según sea necesario
  ];
  const category: Category[] = [
    {
      id: 1,
      name: "Electrónica",
      description: "Productos electrónicos",
      icon: "fa",
      products: products,
    },
    {
      id: 2,
      name: "Ropa",
      icon: "fa",
      description: "Productos electrónicos",
      products: products2,
    },
    {
      id: 2,
      name: "Rop2a",
      icon: "fa",
      description: "Productos electrónicos",
      products: products4,
    },
  ];

  const productsPerPage = 5; // Cantidad de productos por página
  const offset = currentPage * productsPerPage;

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
        <div className="flex justify-center mb-4">
          {category.map((categoryItem) => (
            <a
              key={categoryItem.id}
              href={`#${categoryItem.name.toLowerCase()}`} // Usa el nombre de la categoría como ID
              className="mx-2 text-lg text-gray-500"
            >
              <FontAwesomeIcon icon={faCoins} className="mr-2" />
              {categoryItem.name}
            </a>
          ))}
        </div>

        {/* Lista de productos */}
        {category.map((categoryItem, index) => (
          <div key={categoryItem.id} id={categoryItem.name.toLowerCase()}>
            <div className="mt-10">
              <Products
                products={categoryItem.products.slice(
                  offset,
                  offset + productsPerPage
                )}
                category={categoryItem.name}
                description={categoryItem.description}
              />
            </div>
            {index !== category.length - 1 && (
              <hr className="my-8 border-t border-gray-700" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WowMenu;
