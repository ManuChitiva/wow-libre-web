import React from "react";

const Footer = () => {
  return (
    <>
      <div className="pl-2  flex flex-col items-center justify-center py-6 bg-midnight">
        <div className="flex flex-wrap justify-between items-center text-center gap-4 w-full">
          <div className="flex justify-center items-center flex-col text-center">
            <p className="text-white mb-4  title-wow">
              Síguenos en <br />
              nuestras redes sociales
            </p>
            <div className="flex justify-center items-center">
              <div className="flex flex-col items-center">
                <img
                  src="../resources/facebook.png"
                  alt="FacebookIcon"
                  className="w-8 h-8 mx-7 md:mx-4 rounded-full transition duration-300 ease-in-out transform hover:scale-110"
                />
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="../resources/instagram.png"
                  alt="InstagramIcon"
                  className="w-8 h-8 mx-7 md:mx-4 rounded-full transition duration-300 ease-in-out transform hover:scale-110"
                />
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="../resources/whatsapp.png"
                  alt="WhatsAppIcon"
                  className="w-8 h-8 mx-7 md:mx-4 rounded-full transition duration-300 ease-in-out transform hover:scale-110"
                />
              </div>
            </div>
          </div>
          <p className="w-full flex flex-col md:w-auto text-sm text-white">
            Derechos reservados Sierra-code@ 2023
          </p>

          <div className="flex">
            <p className="mx-4 text-white title-wow">Términos y condiciones</p>
            <p className="mx-4 text-white title-wow">Política de privacidad</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
