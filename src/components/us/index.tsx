import React from "react";
import "./index.css"; // Asegúrate de tener tus estilos CSS configurados correctamente

const Us = () => {
  return (
    <section className="bg-gradient-to-r from-transparent via-blue-950 to-blue-950 py-24">
      <div className="container mx-auto px-4 ">
        <div className="flex flex-wrap items-center ">
          <div className="w-full md:w-1/2 relative">
            <div className="bg-paper-image bg-no-repeat bg-cover bg-center h-80 rounded-lg overflow-hidden">
              <div className="text-white text-center absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                <p className="text-xl title-wow ">Unete a la comunidad libre</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 text-white text-center md:text-left p-4 ">
            <h2 className="text-4xl font-bold mb-4">
              Datos de WoW <span className="text-blue-500">LIBRE</span>{" "}
              Empoderando a la Comunidad de Jugadores
            </h2>
            <p className="text-gray-200 leading-relaxed">
              En el mundo digital de World of Warcraft, la comunidad posee un
              tesoro invaluable: los datos generados por su pasión y dedicación.
              En WoW Libre, esta riqueza se convierte en un recurso libremente
              accesible, disponible para su exportación y migración a otros
              servidores interesados en unirse. Las APIs de WoW Libre,
              completamente gratuitas, son un puente abierto que permite a otros
              servidores vincularse y extraer datos, fomentando la colaboración
              y el intercambio de información para enriquecer la experiencia de
              juego de todos. En este universo dinámico, el poder reside en la
              comunidad, y su capacidad para compartir y expandir el
              conocimiento define el rumbo del futuro de Azeroth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Us;
