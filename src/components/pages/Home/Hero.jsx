import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiInstagram, FiYoutube } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";

const Hero = ({ typesOfProjectAvailableToWork }) => {
  const router = useRouter();

  // State management for platform selection
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedTypeOfContent, setSelectedTypeOfContent] = useState("");

  // Handle platform selection/deselection
  const handlePlatformToggle = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  // Handle search button click - navigate to influencers page with refinements
  const handleSearch = () => {
    const query = {};

    // ✅ Send platforms as an array (so backend gets array directly)
    if (selectedPlatforms.length > 0) {
      query.mainAdvertizingPlatforms = selectedPlatforms;
    }

    // Add selected type of content if chosen
    if (selectedTypeOfContent) {
      query.typesOfProjectAvailableToWork = selectedTypeOfContent;
    }

    router.push({
      pathname: "/creators",
      query,
    });
  };

  const typeOfContentRefineHandler = (event) => {
    const value = event.target.value;

    if (value !== "initial") {
      setSelectedTypeOfContent(value);
    } else {
      setSelectedTypeOfContent("");
    }
  };

  return (
    <section className="section--sm pt-8 md:pt-16 pb-20 md:pb-28 relative overflow-hidden">
      <Image
        src={"/images/home/hero-illustration.png"}
        height={500}
        width={900}
        alt=""
        style={{ width: "900px", height: "500px" }}
        className="absolute md:-right-32 lg:right-0 top-24 pointer-events-none hidden md:block "
      />
      <div className="container--boxed flex justify-center md:justify-start">
        <div
          className="px-4 py-8 md:p-12 bg-white rounded-lg shadow-md relative z-10"
          style={{ maxWidth: "544px" }}
        >
          <h1 className="heading--h2 text-brand-blue-700 mb-5 md:mb-8">
            Find the right content creator to elevate your brand
          </h1>

          {/* Platform Selection */}
          <div>
            <p className="text-brand-blue-700 font-semibold mb-2">
              Which type of platform promotion are you looking for?
            </p>
            <div className="flex gap-2 md:gap-3 mb-6 md:mb-4 flex-col md:flex-row">
              <button
                onClick={() => handlePlatformToggle("Instagram")}
                className={`text-brand-gray flex items-center gap-1.5 flex-1 justify-center py-3 px-4 border border-solid border-brand-gray-300 transition-all duration-300 hover:bg-brand-theme/10 hover:border-brand-theme hover:text-brand-theme ${
                  selectedPlatforms.includes("Instagram")
                    ? "bg-brand-theme/10 border-brand-theme text-brand-theme"
                    : ""
                }`}
                style={{ borderRadius: "4px" }}
              >
                <FiInstagram />
                <span>Instagram</span>
              </button>

              <button
                onClick={() => handlePlatformToggle("YouTube")}
                className={`text-brand-gray flex items-center gap-1.5 flex-1 justify-center py-3 p-4 border border-solid border-brand-gray-300 transition-all duration-300 hover:bg-brand-theme/10 hover:border-brand-theme hover:text-brand-theme ${
                  selectedPlatforms.includes("YouTube")
                    ? "bg-brand-theme/10 border-brand-theme text-brand-theme"
                    : ""
                }`}
                style={{ borderRadius: "4px" }}
              >
                <FiYoutube />
                YouTube
              </button>
            </div>
          </div>

          {/* Content Type Selection */}
          <div>
            <p className="text-brand-blue-700 font-semibold mb-2">
              What kind of content do you want to promote?
            </p>
            <div className="flex gap-3 mb-2.5">
              <select
                className="select border border-brand-gray-300 outline-none w-full text-brand-gray cursor-pointer focus:border-brand-gray-300 focus:ring-0 capitalize"
                style={{ borderRadius: "4px", height: "50px" }}
                onChange={typeOfContentRefineHandler}
                defaultValue="initial"
              >
                <option value="initial">Choose content type</option>
                {typesOfProjectAvailableToWork.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.value}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="button--primary flex items-center w-full justify-center font-medium gap-1.5 mt-8"
          >
            <IoSearch className="text-base" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
