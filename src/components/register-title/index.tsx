import React from "react";

interface TitleRegisterProps {
  title: string;
  description: string;
}

const TitleRegister = ({ title, description }: TitleRegisterProps) => {
  return (
    <>
      <h2 className="text-center mb-11 text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl title-wow ">
        {title}
        <br />
        WOW <span id="libre">LIBRE</span>
      </h2>
      <p className="container pt-6 text-center text-lg mb-4 leading-tight sm:text-xl md:text-1xl lg:text-1xl xl:text-1xl">
        {description}
      </p>
    </>
  );
};

export default TitleRegister;
