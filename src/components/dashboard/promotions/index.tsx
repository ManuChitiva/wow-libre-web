"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick"; // Import react-slick
import "slick-carousel/slick/slick.css"; // Import carousel styles
import "slick-carousel/slick/slick-theme.css";

interface Promotion {
  id: number;
  name: string;
  description: string;
  discount: string;
}

const PromotionsDashboard: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [totalElements, setTotalElements] = useState<number>(0);

  // Mock promotions data
  const fetchPromotions = async () => {
    const mockData: Promotion[] = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Promotion ${i + 1}`,
      description: `Description for Promotion ${i + 1}`,
      discount: `${10 + (i % 10) * 5}%`,
    }));

    const filteredData = mockData.filter((promo) =>
      promo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedData = filteredData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    setPromotions(paginatedData);
    setTotalElements(filteredData.length);
  };

  useEffect(() => {
    fetchPromotions();
  }, [searchTerm, currentPage, itemsPerPage]);

  const totalPages =
    totalElements && itemsPerPage ? Math.ceil(totalElements / itemsPerPage) : 0;

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

  const carouselItems = [
    {
      image: "https://via.placeholder.com/400x200?text=Promotion+1",
      title: "Promotion 1",
      description: "This is the first promotion",
      buttonText: "Learn More",
    },
    {
      image: "https://via.placeholder.com/400x200?text=Promotion+2",
      title: "Promotion 2",
      description: "This is the second promotion",
      buttonText: "Shop Now",
    },
    {
      image: "https://via.placeholder.com/400x200?text=Promotion+3",
      title: "Promotion 3",
      description: "This is the third promotion",
      buttonText: "Get Started",
    },
    {
      image: "https://via.placeholder.com/400x200?text=Promotion+4",
      title: "Promotion 4",
      description: "This is the fourth promotion",
      buttonText: "Explore",
    },
  ];

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-900 text-gray-300 p-6 rounded-lg shadow-lg">
      {/* Carousel */}
      <h1 className="text-center text-3xl font-extrabold mb-6 text-blue-400">
        Promotions
      </h1>
      <div className="mb-6 max-w-screen-lg mx-auto">
        <Slider {...carouselSettings}>
          {carouselItems.map((item, index) => (
            <div key={index} className="flex justify-center items-center px-4">
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden w-80">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h2 className="text-lg font-bold text-blue-400">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-400">{item.description}</p>
                  <button className="mt-2 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 text-sm">
                    {item.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Table */}
      <h2 className="text-center text-2xl font-bold mb-4 text-blue-300">
        Promotion List
      </h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search promotions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => alert("Crear nueva promoción")}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 shadow-lg"
        >
          Crear Promoción
        </button>
      </div>
      <div
        className="overflow-x-auto"
        style={{ height: "400px", overflowY: "auto" }}
      >
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-800 text-gray-400">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Discount</th>
            </tr>
          </thead>
          <tbody>
            {promotions.map((promo, index) => (
              <tr
                key={promo.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                } hover:bg-gray-600 transition`}
              >
                <td className="px-4 py-2 border-b border-gray-600">
                  {promo.id}
                </td>
                <td className="px-4 py-2 border-b border-gray-600">
                  {promo.name}
                </td>
                <td className="px-4 py-2 border-b border-gray-600">
                  {promo.description}
                </td>
                <td className="px-4 py-2 border-b border-gray-600">
                  {promo.discount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <label htmlFor="itemsPerPage" className="mr-2">
            Show:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
            className="px-2 py-1 rounded bg-gray-800 text-gray-400"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || totalPages === 0}
            className="px-3 py-1 rounded bg-gray-700 text-gray-400 hover:bg-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {totalPages > 0 ? currentPage : 0} of{" "}
            {totalPages > 0 ? totalPages : 0}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1 rounded bg-gray-700 text-gray-400 hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionsDashboard;
