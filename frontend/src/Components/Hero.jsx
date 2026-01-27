import SearchBar from "./SearchBar";
import heroSectionImage from '../assets/heroSectionImage.svg'
const Hero = () => {
  return (
    <div className="max-w-7xl  mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">

      {/* Left Content */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          Find a job that suits <br /> your interest & skills.
        </h1>

        <p className="text-gray-500 mt-4 max-w-md">
          Aliquam vitae turpis in diam convallis finibus in at risus.
          Nullam in scelerisque leo, eget sollicitudin velit vestibulum.
        </p>

        {/* Search Bar */}
        <SearchBar />

        <p className="text-xs text-gray-400 mt-3">
          Suggestion: Designer, Programming,{" "}
          <span className="text-[#0A65CC]">Digital Marketing</span>, Video,
          Animation.
        </p>
      </div>

      {/* Right Illustration */}
      <div className="flex justify-center">
        <img
          src={heroSectionImage}
          alt="Hero"
          className="max-w-md"
        />
      </div>
    </div>
  );
};

export default Hero;
