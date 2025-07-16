import React, { useState, useEffect } from "react";
import slide1 from "../../public/bags.jpg"
import slide2 from "../../public/glasses.png"
import slide3 from "../../public/iqos.jpeg"
import slide4 from "../../public/jackets.jpg"
import slide5 from "../../public/jeans.jpg"

const images = [
  slide1,
  slide2,
  slide3,
  slide4,
  slide5,
];
const MainSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full   overflow-hidden rounded-xl shadow-lg">
      <div className="relative h-64  sm:h-96">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MainSlider;
