import { UserPlus, UploadCloud, Search, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <UserPlus className="w-6 h-6 text-blue-600" />,
      title: "Create account",
      desc: "Aliquam facilisis egestas sapien, nec tempor leo tristique at."
    },
    {
      icon: <Search className="w-6 h-6 text-blue-600" />,
      title: "Find suitable job",
      desc: "Phasellus quis eleifend ex. Morbi nec fringilla nibh."
    },
    {
      icon: <UploadCloud className="w-6 h-6 text-blue-600" />,
      title: "Upload CV/Resume",
      desc: "Curabitur sit amet maximus ligula. Nam a nulla ante."
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
      title: "Apply job",
      desc: "Curabitur sit amet maximus ligula. Nam sodales purus."
    }
  ];

  return (
    <div className="bg-gray-100 py-12 sm:py-16 px-4">
      
      <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-10">
        How HireFlow Works
      </h2>

      <div className="relative max-w-7xl mx-auto">

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center relative"
            >
              {/* Circle */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white shadow-md flex items-center justify-center mb-4">
                {item.icon}
              </div>

              <h3 className="font-semibold text-base sm:text-lg">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 mt-2 max-w-xs">
                {item.desc}
              </p>

              {/* Connector line (Desktop only) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-7 right-[-40%]  w-50 border-t-2 border-dashed border-blue-300"></div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
