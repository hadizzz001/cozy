"use client";
import React, { useState, useEffect } from "react";

const MyCarousel = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch("/api/banner");
        const data = await res.json();
        const allImages = data.flatMap(b => b.img);
        setBanners(allImages);
      } catch (error) {
        console.error("Failed to fetch banners:", error);
      }
    };
    fetchBanners();
  }, []);

  // Auto-slide
  useEffect(() => {
    if (!banners.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners]);

  if (!banners.length) return null; // No banners to show

  return (
    <div className="relative w-full h-[250px] md:h-[400px] lg:h-[500px] overflow-hidden mt-60">
      {banners.map((imgUrl, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={imgUrl}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Centered Button */}
          <div className="absolute inset-0 flex items-center justify-center mt-20">
              <div className="text-center">
                <button
                  className='myinsidebtn'
                  onClick={() => router.push("/shop")}
                >
                  Shop All
                </button>
              </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyCarousel;
