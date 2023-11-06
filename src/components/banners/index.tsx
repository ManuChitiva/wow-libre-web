"use client";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const banners = [
  {
    image: "https://i.postimg.cc/MpWKrGyt/peakpx.jpg",
    alt: "Banner 1",
  },
  {
    image:
      "https://i.postimg.cc/wBCCZWCH/wow-classic-vanilla-3840x1080-dual-screen-by-nedelon-dd7iy8j-pre.jpg",
    alt: "Banner 2",
  },
  {
    image: "https://i.postimg.cc/ZnJ3RSch/Rectangle-6.png",
    alt: "Banner 3",
  },
  {
    image:
      "https://i.postimg.cc/VvqY2WF4/HD-wallpaper-wow-knights-of-the-frozen-throne-heroes-world-of-warcraft.jpg",
    alt: "Banner 3",
  },
];

const Advertising = () => {
  return (
    <div>
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
        showThumbs={false}
        dynamicHeight={false}
        showIndicators={false}
        showStatus={false}
        width={"100%"}
      >
        {banners.map((banner, index) => (
          <div key={index} className="relative">
            <img
              src={banner.image}
              alt={banner.alt}
              className="rounded-lg"
              style={{
                maxWidth: "100%",
                maxHeight: "32rem", // Limita la altura máxima de la imagen
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Advertising;
