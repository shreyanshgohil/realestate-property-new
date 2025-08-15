import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaHome, FaBuilding, FaStore, FaMapMarkedAlt } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const Hero = ({ propertyTypes }) => {
  const router = useRouter();

  // State management for property type selection
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [selectedListingType, setSelectedListingType] = useState("");

  // Handle property type selection/deselection
  const handlePropertyTypeToggle = (propertyType) => {
    if (selectedPropertyTypes.includes(propertyType)) {
      setSelectedPropertyTypes(
        selectedPropertyTypes.filter((p) => p !== propertyType)
      );
    } else {
      setSelectedPropertyTypes([...selectedPropertyTypes, propertyType]);
    }
  };

  // Handle search button click - navigate to properties page with refinements
  const handleSearch = () => {
    const query = {};

    // Send property types as an array
    if (selectedPropertyTypes.length > 0) {
      query.propertyType = selectedPropertyTypes;
    }

    // Add selected listing type if chosen
    if (selectedListingType) {
      query.listingType = selectedListingType;
    }

    router.push({
      pathname: "/creators", // This will be the properties page
      query,
    });
  };

  const listingTypeRefineHandler = (event) => {
    const value = event.target.value;

    if (value !== "initial") {
      setSelectedListingType(value);
    } else {
      setSelectedListingType("");
    }
  };

  const getPropertyTypeIcon = (type) => {
    switch (type) {
      case "APARTMENT":
        return { icon: <FaHome />, label: "Apartment" };
      case "HOUSE":
        return { icon: <FaHome />, label: "House" };
      case "COMMERCIAL":
        return { icon: <FaStore />, label: "Commercial" };
      case "PLOT":
        return { icon: <FaMapMarkedAlt />, label: "Plot" };
      default:
        return { icon: <FaBuilding />, label: "Property" };
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
            Find your perfect property
          </h1>

          {/* Property Type Selection */}
          <div>
            <p className="text-brand-blue-700 font-semibold mb-2">
              What type of property are you looking for?
            </p>
            <div className="grid grid-cols-2 gap-2 md:gap-3 mb-6 md:mb-4">
              {propertyTypes &&
                propertyTypes.map((item, index) => {
                  const propertyType =
                    typeof item === "string" ? item : item.value;
                  return (
                    <button
                      key={index}
                      onClick={() => handlePropertyTypeToggle(propertyType)}
                      className={`text-brand-gray flex items-center gap-1.5 justify-center py-3 px-4 border border-solid border-brand-gray-300 transition-all duration-300 hover:bg-brand-theme/10 hover:border-brand-theme hover:text-brand-theme ${
                        selectedPropertyTypes.includes(propertyType)
                          ? "bg-brand-theme/10 border-brand-theme text-brand-theme"
                          : ""
                      }`}
                      style={{ borderRadius: "4px" }}
                    >
                      {getPropertyTypeIcon(propertyType).icon}
                      <span>{getPropertyTypeIcon(propertyType).label}</span>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Listing Type Selection */}
          <div>
            <p className="text-brand-blue-700 font-semibold mb-2">
              What type of listing do you prefer?
            </p>
            <div className="flex gap-3 mb-2.5">
              <select
                className="select border border-brand-gray-300 outline-none w-full text-brand-gray cursor-pointer focus:border-brand-gray-300 focus:ring-0 capitalize"
                style={{ borderRadius: "4px", height: "50px" }}
                onChange={listingTypeRefineHandler}
                defaultValue="initial"
              >
                <option value="initial">Choose listing type</option>
                <option value="SALE">For Sale</option>
                <option value="RENT">For Rent</option>
                <option value="LEASE">For Lease</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="button--primary flex items-center w-full justify-center font-medium gap-1.5 mt-8"
          >
            <IoSearch className="text-base" />
            <span>Search Properties</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
