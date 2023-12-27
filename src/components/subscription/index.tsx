import React from "react";

const Subscription = () => {
  return (
    <div className="bg-midnight rounded-lg overflow-hidden  mb-20 pt-5">
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          <div className="bg-gradient-to-br from-pink-600 to-indigo-900 rounded-t-lg">
            <h2 className="text-2xl font-bold  p-6 text-white">
              Suscríbete al nivel 6
            </h2>
          </div>
        </div>

        <div className=" bg-white rounded-b-md">
          <p className="text-gray-700 p-4">
            Consigue los mejores beneficios en WoW Libre
          </p>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="rounded-full h-24 w-24 bg-gray-300 mx-auto mb-2"></div>
              <p className="text-black">Texto de la imagen 1</p>
            </div>
            <div className="text-center">
              <div className="rounded-full h-24 w-24 bg-gray-300 mx-auto mb-2"></div>
              <p className="text-black">Texto de la imagen 2</p>
            </div>
            <div className="text-center">
              <div className="rounded-full h-24 w-24 bg-gray-300 mx-auto mb-2"></div>
              <p className="text-black">Texto de la imagen 3</p>
            </div>
          </div>
          <div className="flex justify-end pr-4 pb-4">
            {" "}
            {/* Se agregó pr-4 para dar margen derecho al botón */}
            <button className="bg-pink-600 text-white py-3 px-7 rounded-lg hover:bg-pink-700">
              Suscribirse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
