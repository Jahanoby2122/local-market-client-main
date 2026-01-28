import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LoadingPages from "./LoadingPages";

const AdvertiseMentSection = () => {
  const [ads, setAds] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://local-market-server.vercel.app/advertisements")
      .then((res) => {
        const approved = res.data.filter(
          (ad) => ad.status === "approved"
        );
        setAds(approved);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % ads.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + ads.length) % ads.length);
  };

  if (loading) return <LoadingPages />;

  if (ads.length === 0) return null;

  return (
    <section className="py-24 bg-[#faf7f2]">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-gray-900 mb-3">
            Advertisement Highlights
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Explore current promotions and vendor ads from local markets
          </p>
        </div>

        {/* Slider */}
        <div className="relative max-w-6xl mx-auto">

          {/* Slide Card */}
          <div className="relative overflow-hidden rounded-[28px] shadow-xl h-[420px]">

            {/* Image */}
            <img
              src={ads[index].image}
              alt={ads[index].title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

            {/* Content */}
            <div className="relative h-full flex items-end p-8 md:p-12">
              <div className="max-w-xl text-white">

                {/* Vendor */}
                <span className="inline-block bg-yellow-400 text-black text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                  {ads[index].vendor || "Local Vendor"}
                </span>

                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-serif font-semibold mb-3">
                  {ads[index].title}
                </h3>

                {/* Description */}
                <p className="text-gray-200 text-base mb-6">
                  {ads[index].description}
                </p>

              </div>
            </div>

            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:scale-105 transition"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:scale-105 transition"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {ads.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index
                    ? "w-6 bg-green-600"
                    : "w-2 bg-green-300"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AdvertiseMentSection;
