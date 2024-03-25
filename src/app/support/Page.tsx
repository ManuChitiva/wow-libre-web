"use client";
import Characters from "@/components/support/characters";
import CustomerSupport from "@/components/support/customerSupport";

const Support = () => {
  return (
    <div className="bg-midnight p-8">
      <div className="container">
        <div className="text-white text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Tu viaje sin obstáculos en WowLibre
          </h1>
          <p className="text-lg">
            Estamos aquí para brindarte soporte, resolver tus dudas y crear
            experiencias épicas.
          </p>
          <p className="text-lg">¡Disfruta al máximo tu aventura!</p>
        </div>
        <div className="grid grid-cols-1 gap-8">
          <div>
            <Characters />
          </div>
          <div>
            <CustomerSupport />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
