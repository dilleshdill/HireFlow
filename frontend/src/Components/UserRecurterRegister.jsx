import { ArrowRight } from "lucide-react";
import React from "react";

const UserRecurterRegister = () => {
  return (
    <section className="w-full bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Candidate Card */}
        <div className="flex flex-col justify-between bg-gray-100 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition duration-300">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Become a Candidate
            </h1>

            <p className="text-gray-500 mt-3 text-sm sm:text-base">
              Register now to create your candidate profile and start applying
              for top jobs that match your skills.
            </p>
          </div>

          <button className="mt-6 flex items-center gap-2 bg-white text-blue-600 font-medium px-5 py-3 rounded-xl w-fit shadow hover:shadow-lg transition">
            Register Now
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Recruiter Card */}
        <div className="flex flex-col justify-between bg-blue-900 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition duration-300">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-white">
              Become a Recruiter
            </h1>

            <p className="text-blue-100 mt-3 text-sm sm:text-base">
              Create your recruiter account to post jobs, manage candidates,
              and hire the best talent efficiently.
            </p>
          </div>

          <button className="mt-6 flex items-center gap-2 bg-white text-blue-600 font-medium px-5 py-3 rounded-xl w-fit shadow hover:shadow-lg transition">
            Register Now
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default UserRecurterRegister;
