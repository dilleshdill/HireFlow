import { ArrowRight, Megaphone, Code, Music, Briefcase, Video, HeartPulse, BarChart, Database } from "lucide-react";
import { useState } from "react";

const categories = [
  { icon: <Code size={20} />, title: "Code & Programming", count: "312 Open position" },
  { icon: <Megaphone size={20} />, title: "Digital Marketing", count: "297 Open position" },
  { icon: <Video size={20} />, title: "Video & Animation", count: "247 Open position" },
  { icon: <Music size={20} />, title: "Music & Audio", count: "204 Open position" },
  { icon: <BarChart size={20} />, title: "Account & Finance", count: "167 Open position" },
  { icon: <HeartPulse size={20} />, title: "Health & Care", count: "125 Open position" },
  { icon: <Briefcase size={20} />, title: "Graphics & Design", count: "357 Open position" },
  { icon: <Database size={20} />, title: "Data & Science", count: "57 Open position", highlight: true },
  { icon: <Code size={20} />, title: "Code & Programming", count: "312 Open position" },
  { icon: <Megaphone size={20} />, title: "Digital Marketing", count: "297 Open position" },
  { icon: <Video size={20} />, title: "Video & Animation", count: "247 Open position" },
  { icon: <Music size={20} />, title: "Music & Audio", count: "204 Open position" },
  { icon: <BarChart size={20} />, title: "Account & Finance", count: "167 Open position" },
  { icon: <HeartPulse size={20} />, title: "Health & Care", count: "125 Open position" },
  { icon: <Briefcase size={20} />, title: "Graphics & Design", count: "357 Open position" },
  { icon: <Database size={20} />, title: "Data & Science", count: "57 Open position", highlight: true },
];




const PopularCategory = ()  => {
    const [showIndex,setIndex] = useState(16)
    const [showLess,setLess] = useState(false)
  return (
    <div className="w-full py-16 flex flex-col items-center bg-white">

      <div className="w-4/5 flex items-center justify-between mb-10">
        <h2 className="text-3xl font-semibold text-gray-900">Popular Category</h2>

        {
            showLess ? (
                <button 
                    onClick = {() => {
                        setIndex(8)
                        setLess(false)
                    }
                    }
                
                    className="flex items-center gap-2 text-blue-600 font-medium border border-blue-200 hover:bg-blue-50 px-4 py-2 rounded-lg transition">
                    View Less <ArrowRight size={18} />
                    </button>
            ):(
                <button 
                    onClick = {() => {
                        setIndex(16)
                        setLess(true)
                    }
                    }
                
                    className="flex items-center gap-2 text-blue-600 font-medium border border-blue-200 hover:bg-blue-50 px-4 py-2 rounded-lg transition">
                    View All <ArrowRight size={18} />
                    </button>
            )
        }
      </div> 



      
      <div className="w-4/5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((item, index) => (
          
            index < showIndex && 
            <div
            key={index}
            className={`flex items-start gap-3 p-4 rounded-xl border bg-white shadow-sm hover:shadow-md cursor-pointer transition
            ${item.highlight ? "bg-blue-600 text-white shadow-lg" : "border-gray-200"}`}
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-md
              ${item.highlight ? "bg-blue-700" : "bg-blue-50 text-blue-600"}`}
            >
              {item.icon}
            </div>

            <div>
              <h3 className={`font-medium ${item.highlight ? "text-white" : "text-gray-800"}`}>
                {item.title}
              </h3>
              <p className={`text-sm mt-1 ${item.highlight ? "text-blue-100" : "text-gray-500"}`}>
                {item.count}
              </p>
            </div>
          </div>
          
        ))}
      </div>
    </div>
  );
}

export default PopularCategory