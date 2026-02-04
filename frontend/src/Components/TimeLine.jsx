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
    <div className="bg-gray-100 py-16">
      <h2 className="text-center text-3xl font-semibold mb-12">
        How HireFlow work
      </h2>

      <div className="flex justify-center gap-16 px-6">
        {steps.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center max-w-xs text-center relative">
            
            <div className="w-16 h-16 rounded-full bg-white shadow flex items-center justify-center mb-4">
              {item.icon}
            </div>

            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-sm text-gray-500 mt-2">{item.desc}</p>

            
            {idx < steps.length - 1 && (
              <div className="absolute top-8 -right-20 w-32 h-10 border-t-2 border-dashed border-blue-300 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
