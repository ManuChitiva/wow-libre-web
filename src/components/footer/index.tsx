import React from "react";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-6 bg-midnight">
        <div className="flex flex-wrap justify-center text-center gap-4 w-full">
          <span className="w-full md:w-auto bg-gray-200 p-2 rounded-lg">
            FACEBOOK
          </span>
          <span className="w-full md:w-auto bg-gray-200 p-2 rounded-lg">
            FACEBOOK
          </span>
          <span className="w-full md:w-auto bg-gray-200 p-2 rounded-lg">
            FACEBOOK
          </span>
          <p className="w-full md:w-auto ml-auto text-sm text-white">
            Derechos reservados Sierra-code@ 2023
          </p>
          <p className="w-full md:w-auto mx-4 text-white">
            Terminos y condiciones
          </p>
          <p className="w-full md:w-auto mx-4 text-white">
            Politica de privacidad
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
