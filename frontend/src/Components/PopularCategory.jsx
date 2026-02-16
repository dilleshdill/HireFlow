import {
  ArrowRight,
  Megaphone,
  Code,
  Music,
  Briefcase,
  Video,
  HeartPulse,
  BarChart,
  Database,
} from "lucide-react";
import { useState } from "react";

const categories = [
  { icon: <Code size={20} />, title: "Code & Programming", count: "312 Open position" },
  { icon: <Megaphone size={20} />, title: "Digital Marketing", count: "297 Open position" },
  { icon: <Video size={20} />, title: "Video & Animation", count: "247 Open position" },
  { icon: <Music size={20} />, title: "Music & Audio", count: "204 Open position" },
  { icon: <BarChart size={20} />, title: "Account & Finance", count: "167 Open position" },
  { icon: <HeartPulse size={20} />, title: "Health & Care", count: "125 Open position" },
  { icon: <Briefcase size={20} />, title: "Graphics & Design", count: "357 Open position" },
  { icon: <Database size={20} />, title: "Data & Science", count: "57 Open position" },
  { icon: <Code size={20} />, title: "Code & Programming", count: "312 Open position" },
  { icon: <Megaphone size={20} />, title: "Digital Marketing", count: "297 Open position" },
  { icon: <Video size={20} />, title: "Video & Animation", count: "247 Open position" },
  { icon: <Music size={20} />, title: "Music & Audio", count: "204 Open position" },
  { icon: <BarChart size={20} />, title: "Account & Finance", count: "167 Open position" },
  { icon: <HeartPulse size={20} />, title: "Health & Care", count: "125 Open position" },
  { icon: <Briefcase size={20} />, title: "Graphics & Design", count: "357 Open position" },
  { icon: <Database size={20} />, title: "Data & Science", count: "57 Open position"},
];

const PopularCategory = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleCategories = showAll ? categories : categories.slice(0, 8);

  return (
    <section className="w-full py-12 sm:py-16 bg-white px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Popular Category
          </h2>

          <button
            onClick={() => setShowAll(!showAll)}
            className="self-start sm:self-auto flex items-center gap-2 text-blue-600 font-medium border border-blue-200 hover:bg-blue-50 px-4 py-2 rounded-lg transition"
          >
            {showAll ? "View Less" : "View All"}
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {visibleCategories.map((item, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 p-4 rounded-xl border bg-white shadow-sm hover:shadow-md transition duration-200 cursor-pointer
              ${item.highlight ? "bg-blue-600 text-white shadow-lg border-none" : "border-gray-200"}`}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-md
                ${item.highlight ? "bg-blue-700 text-white" : "bg-blue-50 text-blue-600"}`}
              >
                {item.icon}
              </div>

              <div>
                <h3 className={`font-medium text-sm sm:text-base ${item.highlight ? "text-white" : "text-gray-800"}`}>
                  {item.title}
                </h3>
                <p className={`text-xs sm:text-sm mt-1 ${item.highlight ? "text-blue-100" : "text-gray-500"}`}>
                  {item.count}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategory;
