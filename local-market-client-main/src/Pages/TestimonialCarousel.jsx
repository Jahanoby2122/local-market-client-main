import React from "react";

const testimonials = [
  {
    name: "Rahim Ahmed",
    role: "Regular Customer",
    text:
      "কাঁচাবাজার has completely changed how I shop. I can now compare prices across markets before leaving home!",
    initial: "R",
  },
  {
    name: "Fatima Khan",
    role: "Home Chef",
    text:
      "As someone who cooks daily, knowing the prices beforehand helps me plan my budget much better. Highly recommended!",
    initial: "F",
  },
  {
    name: "Kamal Hossain",
    role: "Vendor at Karwan Bazar",
    text:
      "Being a vendor on this platform has increased my customer reach. The system is easy to use and very helpful.",
    initial: "K",
  },
];

const TestimonialCarousel = () => {
  return (
    <section className="bg-[#f7f5f0] py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Header */}
        <h2 className="text-4xl font-serif font-semibold text-gray-900">
          What Our Users Say
        </h2>
        <p className="mt-3 text-gray-600">
          Join thousands of satisfied customers and vendors using{" "}
          <span className="font-medium">কাঁচাবাজার</span>
        </p>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl p-8 shadow-sm"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-6 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                “
              </div>

              {/* Stars */}
              <div className="flex gap-1 text-orange-400 mb-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i}>★</span>
                  ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 leading-relaxed mb-8">
                “{item.text}”
              </p>

              {/* User */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-semibold">
                  {item.initial}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
