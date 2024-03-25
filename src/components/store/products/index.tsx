import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  image: string; // URL de la imagen del producto
  price: number; // Precio del producto
}

interface ProductsProps {
  products: Product[]; // Arreglo de productos
  category: string; // Título como string
  description: string; // Descripción como string
}

const Products = ({ products, category, description }: ProductsProps) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2">
      {/* Columna de la izquierda */}
      <div className="sm:col-span-1 h-auto max-h-[200px] overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-4">{category}</h2>{" "}
        <p>{description}</p>
        {/* Agrega más contenido según sea necesario */}
      </div>

      {/* Columna de la derecha con los productos */}
      <div className="sm:col-span-2 lg:col-span-2 xl:col-span-2 flex flex-wrap justify-between">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <div
              className="flex flex-col p-4 rounded-md shadow-md mb-4 relative transition ease-out duration-200 transform hover:scale-105"
              style={{
                backgroundColor: "#2d2f35",
                maxHeight: "30rem",
                minHeight: "25rem",
                maxWidth: "20rem",
                minWidth: "20rem",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover mb-2"
                style={{
                  maxHeight: "10rem",
                  minHeight: "10rem",
                }}
              />
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {product.name}
                </h3>
                <p className="text-gray-400 mb-2 line-clamp-2">
                  {product.name}
                </p>
                {/* Limita el nombre del producto a 2 líneas */}
              </div>
              <p className="absolute bottom-0 left-0 text-gray-200 font-semibold mb-2 ml-4 text-lg">
                Desde ${product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
