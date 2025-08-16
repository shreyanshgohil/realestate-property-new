import BreadcrumbMenu from "@/components/common/BreadcrumbMenu";
import PropertyCard from "@/components/common/PropertyCard";
import Pagination from "@/components/common/Pagination";
import ResultPerPage from "@/components/common/ResultPerPage";
import Layout from "@/components/layout";
import Filters from "@/components/pages/properties/filters";
import SEO from "@/components/common/SEO";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import { FaListUl, FaMapMarkerAlt } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";

const PropertiesContent = (props) => {
  const router = useRouter();
  const {
    properties: initialProperties,
    facets: initialFacets,
    totalCount: initialTotalCount,
    currentPage: initialCurrentPage,
    resultsPerPage: initialResultsPerPage,
  } = props;

  // State for dynamic data
  const [properties, setProperties] = useState(initialProperties);
  const [facets, setFacets] = useState(initialFacets);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);
  const [resultsPerPage, setResultsPerPage] = useState(initialResultsPerPage);

  // Initialize filters from URL query parameters with dynamic ranges from facets
  const [filters, setFilters] = useState({
    propertyType: [],
    listingType: [],
    city: [],
    constructionStatus: [],
    furnishingStatus: [],
    priceMin: {
      min: facets?.priceMin?.min || 0,
      max: facets?.priceMin?.max || 100000000,
    },
    totalArea: {
      min: facets?.totalArea?.min || 0,
      max: facets?.totalArea?.max || 10000,
    },
    builtUpArea: {
      min: facets?.builtUpArea?.min || 0,
      max: facets?.builtUpArea?.max || 10000,
    },
    carpetArea: {
      min: facets?.carpetArea?.min || 0,
      max: facets?.carpetArea?.max || 10000,
    },
  });

  // Add loading state for filters
  const [isFiltering, setIsFiltering] = useState(false);

  // Debounced filter application for range filters
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  // Helper function to format property types for display
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

  // Helper function to format listing types for display
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

  // Helper function to format construction status for display
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

  // Helper function to format furnishing status for display
  const formatFurnishingStatus = (status) => {
    switch (status) {
      case "FURNISHED":
        return "Furnished";
      case "SEMI_FURNISHED":
        return "Semi Furnished";
      case "UNFURNISHED":
        return "Unfurnished";
      default:
        return status;
    }
  };

  // Function to fetch data from API
  const fetchData = useCallback(async (queryParams) => {
    try {
      setIsFiltering(true);
      const baseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

      const url = `${baseUrl}/properties${
        queryParams ? `?${queryParams}` : ""
      }`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.data) {
        setProperties(data.data.properties || []);
        setFacets(data.data.facets || {});
        setTotalCount(data.data.totalCount || 0);
        setCurrentPage(data.data.currentPage || 1);
        setResultsPerPage(data.data.resultsPerPage || 12);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setIsFiltering(false);
    }
  }, []);

  // Watch for router query changes and fetch data
  useEffect(() => {
    if (router.isReady) {
      fetchData(window.location.href.split("?")[1]);
    }
  }, [router.query, router.isReady, fetchData]);

  // Apply debounced filters after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (JSON.stringify(debouncedFilters) !== JSON.stringify(filters)) {
        setDebouncedFilters(filters);
        updateURLWithFilters(filters);
      }
    }, 500); // 500ms delay for range filters

    return () => clearTimeout(timer);
  }, [debouncedFilters, filters]);

  // Sync filters with URL query parameters and update ranges when facets change
  useEffect(() => {
    if (router.isReady) {
      const queryFilters = {};

      // Parse array filters
      if (router.query.propertyType) {
        queryFilters.propertyType = Array.isArray(router.query.propertyType)
          ? router.query.propertyType
          : [router.query.propertyType];
      }

      if (router.query.listingType) {
        queryFilters.listingType = Array.isArray(router.query.listingType)
          ? router.query.listingType
          : [router.query.listingType];
      }

      if (router.query.city) {
        queryFilters.city = Array.isArray(router.query.city)
          ? router.query.city
          : [router.query.city];
      }

      if (router.query.constructionStatus) {
        queryFilters.constructionStatus = Array.isArray(
          router.query.constructionStatus
        )
          ? router.query.constructionStatus
          : [router.query.constructionStatus];
      }

      if (router.query.furnishingStatus) {
        queryFilters.furnishingStatus = Array.isArray(
          router.query.furnishingStatus
        )
          ? router.query.furnishingStatus
          : [router.query.furnishingStatus];
      }

      // Parse range filters
      if (router.query.priceMinMin || router.query.priceMinMax) {
        queryFilters.priceMin = {
          min: parseInt(router.query.priceMinMin) || facets?.priceMin?.min || 0,
          max:
            parseInt(router.query.priceMinMax) ||
            facets?.priceMin?.max ||
            100000000,
        };
      }

      if (router.query.totalAreaMin || router.query.totalAreaMax) {
        queryFilters.totalArea = {
          min:
            parseInt(router.query.totalAreaMin) || facets?.totalArea?.min || 0,
          max:
            parseInt(router.query.totalAreaMax) ||
            facets?.totalArea?.max ||
            10000,
        };
      }

      if (router.query.builtUpAreaMin || router.query.builtUpAreaMax) {
        queryFilters.builtUpArea = {
          min:
            parseInt(router.query.builtUpAreaMin) ||
            facets?.builtUpArea?.min ||
            0,
          max:
            parseInt(router.query.builtUpAreaMax) ||
            facets?.builtUpArea?.max ||
            10000,
        };
      }

      if (router.query.carpetAreaMin || router.query.carpetAreaMax) {
        queryFilters.carpetArea = {
          min:
            parseInt(router.query.carpetAreaMin) ||
            facets?.carpetArea?.min ||
            0,
          max:
            parseInt(router.query.carpetAreaMax) ||
            facets?.carpetArea?.max ||
            10000,
        };
      }

      setFilters((prev) => ({ ...prev, ...queryFilters }));
    }
  }, [router.isReady, router.query, facets]);

  const updateURLWithFilters = useCallback(
    (newFilters) => {
      const query = { ...router.query };

      // Update array filters
      if (newFilters.propertyType?.length > 0) {
        query.propertyType = newFilters.propertyType;
      } else {
        delete query.propertyType;
      }

      if (newFilters.listingType?.length > 0) {
        query.listingType = newFilters.listingType;
      } else {
        delete query.listingType;
      }

      if (newFilters.city?.length > 0) {
        query.city = newFilters.city;
      } else {
        delete query.city;
      }

      if (newFilters.constructionStatus?.length > 0) {
        query.constructionStatus = newFilters.constructionStatus;
      } else {
        delete query.constructionStatus;
      }

      if (newFilters.furnishingStatus?.length > 0) {
        query.furnishingStatus = newFilters.furnishingStatus;
      } else {
        delete query.furnishingStatus;
      }

      // Update range filters
      if (
        newFilters.priceMin?.min > (facets?.priceMin?.min || 0) ||
        newFilters.priceMin?.max < (facets?.priceMin?.max || 100000000)
      ) {
        query.priceMinMin = newFilters.priceMin.min;
        query.priceMinMax = newFilters.priceMin.max;
      } else {
        delete query.priceMinMin;
        delete query.priceMinMax;
      }

      if (
        newFilters.totalArea?.min > (facets?.totalArea?.min || 0) ||
        newFilters.totalArea?.max < (facets?.totalArea?.max || 10000)
      ) {
        query.totalAreaMin = newFilters.totalArea.min;
        query.totalAreaMax = newFilters.totalArea.max;
      } else {
        delete query.totalAreaMin;
        delete query.totalAreaMax;
      }

      if (
        newFilters.builtUpArea?.min > (facets?.builtUpArea?.min || 0) ||
        newFilters.builtUpArea?.max < (facets?.builtUpArea?.max || 10000)
      ) {
        query.builtUpAreaMin = newFilters.builtUpArea.min;
        query.builtUpAreaMax = newFilters.builtUpArea.max;
      } else {
        delete query.builtUpAreaMin;
        delete query.builtUpAreaMax;
      }

      if (
        newFilters.carpetArea?.min > (facets?.carpetArea?.min || 0) ||
        newFilters.carpetArea?.max < (facets?.carpetArea?.max || 10000)
      ) {
        query.carpetAreaMin = newFilters.carpetArea.min;
        query.carpetAreaMax = newFilters.carpetArea.max;
      } else {
        delete query.carpetAreaMin;
        delete query.carpetAreaMax;
      }

      // Reset to page 1 when filters change
      delete query.page;

      // Update URL - useEffect will automatically fetch data when query changes
      router.push(
        {
          pathname: router.pathname,
          query,
        },
        undefined,
        { shallow: true }
      );
    },
    [router, facets]
  );

  const filtersChangeHandler = ({ type, key, value }) => {
    const tempCopy = JSON.parse(JSON.stringify(filters));

    if (type === "customRefinement") {
      if (tempCopy?.[key]?.includes(value)) {
        tempCopy[key] = tempCopy[key].filter((item) => item !== value);
      } else if (tempCopy?.[key]) {
        tempCopy[key] = [...tempCopy[key], value];
      } else {
        tempCopy[key] = [value];
      }

      // Apply checkbox filters immediately
      setFilters(tempCopy);
      updateURLWithFilters(tempCopy);
    } else if (type === "range") {
      tempCopy[key] = value;

      // For range filters, just update local state (debounced application will handle URL update)
      setFilters(tempCopy);
    }
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      propertyType: [],
      listingType: [],
      city: [],
      constructionStatus: [],
      furnishingStatus: [],
      priceMin: {
        min: facets?.priceMin?.min || 0,
        max: facets?.priceMin?.max || 100000000,
      },
      totalArea: {
        min: facets?.totalArea?.min || 0,
        max: facets?.totalArea?.max || 10000,
      },
      builtUpArea: {
        min: facets?.builtUpArea?.min || 0,
        max: facets?.builtUpArea?.max || 10000,
      },
      carpetArea: {
        min: facets?.carpetArea?.min || 0,
        max: facets?.carpetArea?.max || 10000,
      },
    };
    setFilters(clearedFilters);
    updateURLWithFilters(clearedFilters);
  };

  const hasActiveFilters = () => {
    return (
      filters.propertyType.length > 0 ||
      filters.listingType.length > 0 ||
      filters.city.length > 0 ||
      filters.constructionStatus.length > 0 ||
      filters.furnishingStatus.length > 0 ||
      filters.priceMin.min > (facets?.priceMin?.min || 0) ||
      filters.priceMin.max < (facets?.priceMin?.max || 100000000) ||
      filters.totalArea.min > (facets?.totalArea?.min || 0) ||
      filters.totalArea.max < (facets?.totalArea?.max || 10000) ||
      filters.builtUpArea.min > (facets?.builtUpArea?.min || 0) ||
      filters.builtUpArea.max < (facets?.builtUpArea?.max || 10000) ||
      filters.carpetArea.min > (facets?.carpetArea?.min || 0) ||
      filters.carpetArea.max < (facets?.carpetArea?.max || 10000)
    );
  };

  return (
    <main className="bg-brand-gray-300">
      <div className="container--boxed">
        <div>
          <BreadcrumbMenu />
        </div>
        <div className="grid grid-cols-12 lg:gap-6 xl:gap-8">
          <div className="col-span-3 hidden lg:block pb-8">
            <Filters
              facets={facets}
              filters={filters}
              filtersChangeHandler={filtersChangeHandler}
              clearAllFilters={clearAllFilters}
              hasActiveFilters={hasActiveFilters()}
              isFiltering={isFiltering}
              onApplyFilters={() => updateURLWithFilters(filters)}
            />
          </div>
          <div className="col-span-12 lg:col-span-9">
            <h1 className="heading--h3 text-brand-blue-700 font-semibold mb-4">
              Properties for Sale and Rent
            </h1>
            <div className="mb-10">
              <div className="mb-4">
                <p className="text-brand-gray mb-4">
                  We've found <strong>{totalCount || properties.length}</strong>{" "}
                  result{totalCount !== 1 ? "s" : ""} that match
                  {totalCount !== 1 ? "" : "es"} your criteria. All of our
                  properties are carefully verified to ensure they meet your
                  expectations. Learn more about them below.
                </p>
                {hasActiveFilters() && (
                  <div className="mb-4 p-4 bg-brand-theme/5 border border-brand-theme/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-brand-theme">
                        Active Filters:
                      </span>
                      <button
                        onClick={clearAllFilters}
                        className="text-sm text-brand-theme hover:underline font-medium"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {filters.propertyType.length > 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-theme/10 text-brand-theme">
                          Property Type:{" "}
                          {filters.propertyType
                            .map(formatPropertyType)
                            .join(", ")}
                        </span>
                      )}
                      {filters.listingType.length > 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-theme/10 text-brand-theme">
                          Listing Type:{" "}
                          {filters.listingType
                            .map(formatListingType)
                            .join(", ")}
                        </span>
                      )}
                      {filters.city.length > 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-theme/10 text-brand-theme capitalize">
                          City: {filters.city.join(", ")}
                        </span>
                      )}
                      {filters.constructionStatus.length > 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-theme/10 text-brand-theme">
                          Construction:{" "}
                          {filters.constructionStatus
                            .map(formatConstructionStatus)
                            .join(", ")}
                        </span>
                      )}
                      {filters.furnishingStatus.length > 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-theme/10 text-brand-theme">
                          Furnishing:{" "}
                          {filters.furnishingStatus
                            .map(formatFurnishingStatus)
                            .join(", ")}
                        </span>
                      )}
                      {(filters.priceMin.min > (facets?.priceMin?.min || 0) ||
                        filters.priceMin.max <
                          (facets?.priceMin?.max || 100000000)) && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-theme/10 text-brand-theme">
                          Price: ₹{filters.priceMin.min.toLocaleString()} - ₹
                          {filters.priceMin.max.toLocaleString()}
                        </span>
                      )}
                      {(filters.totalArea.min > (facets?.totalArea?.min || 0) ||
                        filters.totalArea.max <
                          (facets?.totalArea?.max || 10000)) && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-theme/10 text-brand-theme">
                          Total Area: {filters.totalArea.min.toLocaleString()} -{" "}
                          {filters.totalArea.max.toLocaleString()} sq ft
                        </span>
                      )}
                      {(filters.builtUpArea.min >
                        (facets?.builtUpArea?.min || 0) ||
                        filters.builtUpArea.max <
                          (facets?.builtUpArea?.max || 10000)) && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-theme/10 text-brand-theme">
                          Built Up Area:{" "}
                          {filters.builtUpArea.min.toLocaleString()} -{" "}
                          {filters.builtUpArea.max.toLocaleString()} sq ft
                        </span>
                      )}
                      {(filters.carpetArea.min >
                        (facets?.carpetArea?.min || 0) ||
                        filters.carpetArea.max <
                          (facets?.carpetArea?.max || 10000)) && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-theme/10 text-brand-theme">
                          Carpet Area: {filters.carpetArea.min.toLocaleString()}{" "}
                          - {filters.carpetArea.max.toLocaleString()} sq ft
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <nav className="border-b border-b-brand-blue-700/25 mb-6 hidden lg:flex ">
                <ul className="flex gap-6">
                  <li
                    className={`-mb-px transition-opacity h-10 inline-flex items-center cursor-pointer border-b-2 border-b-brand-theme text-brand-theme font-semibold text-sm`}
                  >
                    <FaListUl className="mr-2" />
                    Grid view
                  </li>
                  <li
                    className={`-mb-px transition-opacity h-10 inline-flex items-center text-brand-gray cursor-not-allowed text-sm`}
                  >
                    <FaMapMarkerAlt className="mr-2" />
                    List view (coming soon)
                  </li>
                </ul>
              </nav>
              <div className={`lg:hidden mt-8 grid gap-22`}>
                <button className="text-brand-gray rounded-md flex items-center gap-1.5 flex-1 justify-center py-3 px-4 border border-solid border-brand-gray-500 transition-all duration-300 hover:bg-brand-theme/10 hover:border-brand-theme hover:text-brand-theme font-semibold mb-8">
                  <VscSettings className="mr-2 font-semibold text-lg" />
                  Filters
                </button>
              </div>

              <div className="grid gap-6 px-4 md:px-0 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 ">
                {properties.length > 0 ? (
                  properties.map((property, key) => (
                    <PropertyCard key={key} property={property} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="max-w-md mx-auto">
                      <div className="text-6xl mb-4">🏠</div>
                      <h3 className="text-xl font-semibold text-brand-gray-700 mb-2">
                        No properties found
                      </h3>
                      <p className="text-brand-gray mb-6">
                        {hasActiveFilters()
                          ? "Try adjusting your filters or clearing some of them to see more results."
                          : "There are currently no properties available. Please check back later."}
                      </p>
                      {hasActiveFilters() && (
                        <button
                          onClick={clearAllFilters}
                          className="inline-flex items-center px-4 py-2 bg-brand-theme text-white rounded-md hover:bg-brand-theme/90 transition-colors"
                        >
                          Clear All Filters
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
              <ResultPerPage
                currentLimit={resultsPerPage || 12}
                onLimitChange={(newLimit) => {
                  const newQuery = {
                    ...router.query,
                    limit: newLimit,
                    page: 1,
                  };
                  router.push(
                    {
                      pathname: router.pathname,
                      query: newQuery,
                    },
                    undefined,
                    { shallow: true }
                  );
                  // useEffect will automatically fetch data when query changes
                }}
              />
              <Pagination
                currentPage={currentPage || 1}
                totalPages={Math.ceil(
                  (totalCount || properties.length) / (resultsPerPage || 12)
                )}
                onPageChange={(page) => {
                  const newQuery = { ...router.query, page };
                  router.push(
                    {
                      pathname: router.pathname,
                      query: newQuery,
                    },
                    undefined,
                    { shallow: true }
                  );
                  // useEffect will automatically fetch data when query changes
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const Properties = ({ data }) => {
  const { facets, properties, totalCount, currentPage, resultsPerPage } = data;
  return (
    <>
      <SEO
        title="Properties for Sale and Rent | 11yards Real Estate"
        description="Browse thousands of verified properties for sale, rent, and lease across India. Find apartments, houses, commercial properties, and plots with detailed information, virtual tours, and RERA verification."
        keywords="properties for sale, properties for rent, real estate listings, apartments, houses, commercial properties, plots, property search, 11yards, India"
        url="/creators"
      />
      <Layout>
        <PropertiesContent
          facets={facets}
          properties={properties}
          totalCount={totalCount}
          currentPage={currentPage}
          resultsPerPage={resultsPerPage}
        />
      </Layout>
    </>
  );
};

export async function getServerSideProps({ query }) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

    // Build query string for backend
    const queryParams = new URLSearchParams();

    // Add filter parameters
    if (query.propertyType) {
      if (Array.isArray(query.propertyType)) {
        query.propertyType.forEach((type) => {
          queryParams.append("propertyType", type);
        });
      } else {
        queryParams.append("propertyType", query.propertyType);
      }
    }

    if (query.listingType) {
      if (Array.isArray(query.listingType)) {
        query.listingType.forEach((type) => {
          queryParams.append("listingType", type);
        });
      } else {
        queryParams.append("listingType", query.listingType);
      }
    }

    if (query.city) {
      if (Array.isArray(query.city)) {
        query.city.forEach((city) => {
          queryParams.append("city", city);
        });
      } else {
        queryParams.append("city", query.city);
      }
    }

    if (query.constructionStatus) {
      if (Array.isArray(query.constructionStatus)) {
        query.constructionStatus.forEach((status) => {
          queryParams.append("constructionStatus", status);
        });
      } else {
        queryParams.append("constructionStatus", query.constructionStatus);
      }
    }

    if (query.furnishingStatus) {
      if (Array.isArray(query.furnishingStatus)) {
        query.furnishingStatus.forEach((status) => {
          queryParams.append("furnishingStatus", status);
        });
      } else {
        queryParams.append("furnishingStatus", query.furnishingStatus);
      }
    }

    // Add range filter parameters
    if (query.priceMinMin) queryParams.append("priceMin", query.priceMinMin);
    if (query.priceMinMax) queryParams.append("priceMax", query.priceMinMax);
    if (query.totalAreaMin)
      queryParams.append("totalAreaMin", query.totalAreaMin);
    if (query.totalAreaMax)
      queryParams.append("totalAreaMax", query.totalAreaMax);
    if (query.builtUpAreaMin)
      queryParams.append("builtUpAreaMin", query.builtUpAreaMin);
    if (query.builtUpAreaMax)
      queryParams.append("builtUpAreaMax", query.builtUpAreaMax);
    if (query.carpetAreaMin)
      queryParams.append("carpetAreaMin", query.carpetAreaMin);
    if (query.carpetAreaMax)
      queryParams.append("carpetAreaMax", query.carpetAreaMax);

    // Add pagination parameters
    if (query.page) queryParams.append("page", query.page);
    if (query.limit) queryParams.append("limit", query.limit);

    const queryString = queryParams.toString();
    const url = `${baseUrl}/properties${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(url);
    const data = await res.json();

    return {
      props: {
        data: data.data || {
          facets: {},
          properties: [],
          totalCount: 0,
          currentPage: 1,
          resultsPerPage: 12,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching properties:", error);
    return {
      props: {
        data: {
          facets: {},
          properties: [],
          totalCount: 0,
          currentPage: 1,
          resultsPerPage: 12,
        },
      },
    };
  }
}

export default Properties;
