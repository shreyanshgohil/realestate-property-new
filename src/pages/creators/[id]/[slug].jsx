import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import BreadcrumbMenu from "@/components/common/BreadcrumbMenu";

const PropertyDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPropertyDetails();
    }
  }, [id]);

  const fetchPropertyDetails = async () => {
    try {
      setLoading(true);
      const baseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
      const response = await fetch(`${baseUrl}/properties/${id}`);
      const data = await response.json();

      if (data.data) {
        setProperty(data.data);
      }
    } catch (error) {
      console.error("Error fetching property details:", error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-brand-gray-300">
          <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!property) {
    return (
      <Layout>
        <div className="min-h-screen bg-brand-gray-300">
          <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Property Not Found
              </h1>
              <p className="text-gray-600">
                The property you're looking for doesn't exist.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-brand-gray-300">
        <div className="container mx-auto px-4 py-8">
          <BreadcrumbMenu
            items={[
              { label: "Home", href: "/" },
              { label: "Properties", href: "/creators" },
              { label: property.name, href: "#" },
            ]}
          />

          <div className="mt-8">
            {/* Property Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getPropertyTypeColor(
                        property.propertyType
                      )}`}
                    >
                      {formatPropertyType(property.propertyType)}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getListingTypeColor(
                        property.listingType
                      )}`}
                    >
                      {formatListingType(property.listingType)}
                    </span>
                    {property.verified && (
                      <MdVerified className="text-blue-500 text-xl" />
                    )}
                  </div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {property.name}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>
                      {property.city}, {property.stateName}
                    </span>
                  </div>
                  <p className="text-gray-600">{property.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-800">
                    {property.priceMin === property.priceMax
                      ? formatPrice(parseInt(property.priceMin))
                      : `${formatPrice(
                          parseInt(property.priceMin)
                        )} - ${formatPrice(parseInt(property.priceMax))}`}
                  </div>
                  {property.listingType === "RENT" && (
                    <span className="text-sm text-gray-600">per month</span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Property Images */}
                {property.images && property.images.length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Property Images
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {property.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image.url}
                            alt={image.caption || `Property image ${index + 1}`}
                            className="w-full h-64 object-cover rounded-lg"
                          />
                          {image.caption && (
                            <p className="text-sm text-gray-600 mt-2">
                              {image.caption}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Property Details */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Property Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <FaRulerCombined className="mr-3 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Total Area</p>
                          <p className="font-semibold">
                            {property.totalArea} sq ft
                          </p>
                        </div>
                      </div>
                      {property.builtUpArea && (
                        <div className="flex items-center">
                          <FaRulerCombined className="mr-3 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-600">
                              Built Up Area
                            </p>
                            <p className="font-semibold">
                              {property.builtUpArea} sq ft
                            </p>
                          </div>
                        </div>
                      )}
                      {property.carpetArea && (
                        <div className="flex items-center">
                          <FaRulerCombined className="mr-3 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-600">Carpet Area</p>
                            <p className="font-semibold">
                              {property.carpetArea} sq ft
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      {property.floorPlanDetails &&
                        property.floorPlanDetails.length > 0 && (
                          <>
                            <div className="flex items-center">
                              <FaBed className="mr-3 text-gray-500" />
                              <div>
                                <p className="text-sm text-gray-600">
                                  Bedrooms
                                </p>
                                <p className="font-semibold">
                                  {property.floorPlanDetails[0].rooms}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <FaBath className="mr-3 text-gray-500" />
                              <div>
                                <p className="text-sm text-gray-600">
                                  Bathrooms
                                </p>
                                <p className="font-semibold">
                                  {property.floorPlanDetails[0].bathroom}
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      {property.constructionStatus && (
                        <div className="flex items-center">
                          <FaBuilding className="mr-3 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-600">
                              Construction Status
                            </p>
                            <p className="font-semibold">
                              {formatConstructionStatus(
                                property.constructionStatus
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Amenities
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.security && (
                      <span className="flex items-center text-sm">
                        ✅ Security
                      </span>
                    )}
                    {property.lift && (
                      <span className="flex items-center text-sm">✅ Lift</span>
                    )}
                    {property.parking && (
                      <span className="flex items-center text-sm">
                        ✅ Parking
                      </span>
                    )}
                    {property.gymnasium && (
                      <span className="flex items-center text-sm">
                        ✅ Gymnasium
                      </span>
                    )}
                    {property.swimmingPool && (
                      <span className="flex items-center text-sm">
                        ✅ Swimming Pool
                      </span>
                    )}
                    {property.clubHouse && (
                      <span className="flex items-center text-sm">
                        ✅ Club House
                      </span>
                    )}
                    {property.garden && (
                      <span className="flex items-center text-sm">
                        ✅ Garden
                      </span>
                    )}
                    {property.terrace && (
                      <span className="flex items-center text-sm">
                        ✅ Terrace
                      </span>
                    )}
                    {property.balcony && (
                      <span className="flex items-center text-sm">
                        ✅ Balcony
                      </span>
                    )}
                    {property.modularKitchen && (
                      <span className="flex items-center text-sm">
                        ✅ Modular Kitchen
                      </span>
                    )}
                    {property.airConditioning && (
                      <span className="flex items-center text-sm">
                        ✅ Air Conditioning
                      </span>
                    )}
                    {property.powerBackup && (
                      <span className="flex items-center text-sm">
                        ✅ Power Backup
                      </span>
                    )}
                  </div>
                </div>

                {/* Highlights */}
                {property.highlights && property.highlights.length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Highlights
                    </h2>
                    <ul className="space-y-2">
                      {property.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* FAQ */}
                {property.faq && property.faq.length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                      {property.faq.map((item, index) => (
                        <div
                          key={index}
                          className="border-b border-gray-200 pb-4 last:border-b-0"
                        >
                          <h3 className="font-semibold text-gray-800 mb-2">
                            {item.question}
                          </h3>
                          <p className="text-gray-600">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Information */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Listed by</p>
                      <p className="font-semibold">{property.creatorName}</p>
                    </div>
                    <div className="space-y-2">
                      <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600">
                        <FaWhatsapp />
                        Contact on WhatsApp
                      </button>
                      <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600">
                        <FaPhone />
                        Call Now
                      </button>
                      <button className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-600">
                        <FaEnvelope />
                        Send Email
                      </button>
                    </div>
                  </div>
                </div>

                {/* Property Information */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Property Information
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property ID</span>
                      <span className="font-semibold">{property._id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">RERA Number</span>
                      <span className="font-semibold">{property.reraNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          property.status === "ACTIVE"
                            ? "bg-green-100 text-green-800"
                            : property.status === "SOLD"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {property.status}
                      </span>
                    </div>
                    {property.verified && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Verified</span>
                        <span className="text-green-600 font-semibold">
                          Yes
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PropertyDetailPage;
