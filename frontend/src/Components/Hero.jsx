import SearchBar from "./SearchBar";
import heroSectionImage from "../assets/heroSectionImage.svg";

const Hero = () => {
  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 lg:py-20 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div className="text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Find a job that suits <br className="hidden sm:block" />
            your interest & skills.
          </h1>

          <p className="text-gray-500 mt-4 max-w-lg mx-auto lg:mx-0 text-sm sm:text-base">
            Aliquam vitae turpis in diam convallis finibus in at risus.
            Nullam in scelerisque leo, eget sollicitudin velit vestibulum.
          </p>

          {/* Search Bar */}
          <div className="mt-6 flex justify-center lg:justify-start">
            <SearchBar />
          </div>

          <p className="text-xs text-gray-400 mt-3 max-w-md mx-auto lg:mx-0">
            Suggestion: Designer, Programming,{" "}
            <span className="text-[#0A65CC]">
              Digital Marketing
            </span>, Video, Animation.
          </p>
        </div>

        {/* Right Illustration */}
        <div className="flex justify-center">
          <img
            src={heroSectionImage}
            alt="Hero"
            className="w-72 sm:w-96 lg:w-full max-w-md lg:max-w-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
