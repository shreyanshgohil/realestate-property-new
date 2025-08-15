import React from "react";
import Link from "next/link";
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const PropertyCard = ({ property }) => {
  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  const formatPropertyType = (type) => {
    switch (type) {
      case "APARTMENT":
        return "Apartment";
      case "HOUSE":
        return "House";
      case "COMMERCIAL":
        return "Commercial";
      case "PLOT":
        return "Plot";
      default:
        return type;
    }
  };

  const formatListingType = (type) => {
    switch (type) {
      case "SALE":
        return "For Sale";
      case "RENT":
        return "For Rent";
      case "LEASE":
        return "For Lease";
      default:
        return type;
    }
  };

  const formatConstructionStatus = (status) => {
    switch (status) {
      case "UNDER_CONSTRUCTION":
        return "Under Construction";
      case "READY_TO_MOVE":
        return "Ready to Move";
      case "PLANNED":
        return "Planned";
      case "COMPLETED":
        return "Completed";
      default:
        return status;
    }
  };

  const getPropertyTypeColor = (type) => {
    const colors = {
      APARTMENT: "bg-blue-100 text-blue-800",
      HOUSE: "bg-green-100 text-green-800",
      COMMERCIAL: "bg-purple-100 text-purple-800",
      PLOT: "bg-orange-100 text-orange-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const getListingTypeColor = (type) => {
    const colors = {
      SALE: "bg-red-100 text-red-800",
      RENT: "bg-blue-100 text-blue-800",
      LEASE: "bg-yellow-100 text-yellow-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Property Image */}
      <div className="relative h-48 bg-gray-200">
        {property.images && property.images.length > 0 ? (
          <img
            src={property.images[0].url}
            alt={property.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <FaBed className="text-4xl" />
          </div>
        )}

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getPropertyTypeColor(
              property.propertyType
            )}`}
          >
            {formatPropertyType(property.propertyType)}
          </span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getListingTypeColor(
              property.listingType
            )}`}
          >
            {formatListingType(property.listingType)}
          </span>
        </div>

        {/* Verified Badge */}
        {property.verified && (
          <div className="absolute top-3 right-3">
            <MdVerified className="text-blue-500 text-xl" />
          </div>
        )}

        {/* Featured Badge */}
        {property.featured && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="p-4">
        {/* Property Name and Location */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
            {property.name}
          </h3>
          <div className="flex items-center text-gray-600 text-sm">
            <FaMapMarkerAlt className="mr-1" />
            <span>
              {property.city}, {property.stateName}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-3">
          <div className="text-xl font-bold text-gray-800">
            {property.priceMin === property.priceMax
              ? formatPrice(parseInt(property.priceMin))
              : `${formatPrice(parseInt(property.priceMin))} - ${formatPrice(
                  parseInt(property.priceMax)
                )}`}
          </div>
          {property.listingType === "RENT" && (
            <span className="text-sm text-gray-600">per month</span>
          )}
        </div>

        {/* Property Specifications */}
        <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
          {property.totalArea && (
            <div className="flex items-center">
              <FaRulerCombined className="mr-1" />
              <span>{property.totalArea} sq ft</span>
            </div>
          )}
          {property.floorPlanDetails &&
            property.floorPlanDetails.length > 0 && (
              <div className="flex items-center">
                <FaBed className="mr-1" />
                <span>{property.floorPlanDetails[0].rooms} BHK</span>
              </div>
            )}
          {property.floorPlanDetails &&
            property.floorPlanDetails.length > 0 && (
              <div className="flex items-center">
                <FaBath className="mr-1" />
                <span>{property.floorPlanDetails[0].bathroom} Bath</span>
              </div>
            )}
        </div>

        {/* Amenities */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {property.security && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                Security
              </span>
            )}
            {property.lift && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                Lift
              </span>
            )}
            {property.parking && (
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                Parking
              </span>
            )}
            {property.swimmingPool && (
              <span className="bg-cyan-100 text-cyan-800 px-2 py-1 rounded text-xs">
                Pool
              </span>
            )}
            {property.gymnasium && (
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                Gym
              </span>
            )}
          </div>
        </div>

        {/* Property Status */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              property.status === "ACTIVE"
                ? "bg-green-100 text-green-800"
                : property.status === "SOLD"
                ? "bg-red-100 text-red-800"
                : property.status === "RENTED"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {property.status}
          </span>
          {property.constructionStatus && (
            <span className="text-xs text-gray-600">
              {formatConstructionStatus(property.constructionStatus)}
            </span>
          )}
        </div>

        {/* View Details Button */}
        <Link
          href={`/properties/${property._id}`}
          className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
