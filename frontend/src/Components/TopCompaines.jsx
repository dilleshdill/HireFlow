import React from "react";

const cardsData = [
  {
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    name: "Google",
    handle: "@google",
  },
  {
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    name: "Avery Johnson",
    handle: "@averywrites",
  },
  {
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
    name: "Jordan Lee",
    handle: "@jordantalks",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
    name: "Avery Johnson",
    handle: "@averywrites",
  },
];

const CompanyCard = ({ card }) => (
  <div className="p-4 rounded-xl mx-3 sm:mx-4 shadow-md hover:shadow-xl transition-all duration-300 w-64 sm:w-72 shrink-0 bg-white hover:scale-105">
    <div className="flex gap-3 items-center">
      <img
        className="w-11 h-11 rounded-full object-cover"
        src={card.image}
        alt={card.name}
      />
      <div>
        <p className="font-medium text-gray-800 text-sm sm:text-base">
          {card.name}
        </p>
        <span className="text-xs text-slate-500">
          {card.handle}
        </span>
      </div>
    </div>

    <p className="text-sm py-4 text-gray-700">
      Radiant made undercutting all of our competitors an absolute breeze.
    </p>
  </div>
);

const TopCompanies = () => {
  return (
    <section className="w-full bg-gray-100 py-12 sm:py-16 overflow-hidden">

      {/* Heading */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
          Top Companies Hiring Now
        </h2>
      </div>

      <style>
        {`
          @keyframes marqueeScroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }

          .marquee-inner {
            animation: marqueeScroll 30s linear infinite;
          }

          @media (max-width: 640px) {
            .marquee-inner {
              animation: marqueeScroll 45s linear infinite;
            }
          }

          .marquee-reverse {
            animation-direction: reverse;
          }
        `}
      </style>

      {/* Row 1 */}
      <div className="relative max-w-7xl mx-auto overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-16 sm:w-24 z-10 pointer-events-none bg-gradient-to-r from-gray-100 to-transparent"></div>

        <div className="marquee-inner flex min-w-[200%] py-6">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CompanyCard key={index} card={card} />
          ))}
        </div>

        <div className="absolute right-0 top-0 h-full w-16 sm:w-24 z-10 pointer-events-none bg-gradient-to-l from-gray-100 to-transparent"></div>
      </div>

      {/* Row 2 */}
      <div className="relative max-w-7xl mx-auto overflow-hidden mt-4">
        <div className="absolute left-0 top-0 h-full w-16 sm:w-24 z-10 pointer-events-none bg-gradient-to-r from-gray-100 to-transparent"></div>

        <div className="marquee-inner marquee-reverse flex min-w-[200%] py-6">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CompanyCard key={index} card={card} />
          ))}
        </div>

        <div className="absolute right-0 top-0 h-full w-16 sm:w-24 z-10 pointer-events-none bg-gradient-to-l from-gray-100 to-transparent"></div>
      </div>
    </section>
  );
};

export default TopCompanies;
