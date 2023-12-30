import React from "react";

const Store = () => {
  const productos = [
    {
      id: 1,
      nombre: "Espada de la Alianza",
      precio: 50,
      imagen: "",
    },
    {
      id: 2,
      nombre: "Escudo de Orgrimmar",
      precio: 40,
      imagen: "",
    },

    // Agrega más productos si es necesario
  ];

  const Producto = ({ producto }: any) => {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
        <img className="w-full" src={producto.imagen} alt={producto.nombre} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{producto.nombre}</div>
          <p className="text-gray-700 text-base mb-2">
            Precio: ${producto.precio}
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Comprar
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold mb-6">Tienda de WoW</h1>
      <div className="flex flex-wrap justify-center">
        {productos.map((producto) => (
          <Producto key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
};

export default Store;
