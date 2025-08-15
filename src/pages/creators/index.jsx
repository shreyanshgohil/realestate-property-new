import BreadcrumbMenu from "@/components/common/BreadcrumbMenu";
import PropertyCard from "@/components/common/PropertyCard";
import Pagination from "@/components/common/Pagination";
import ResultPerPage from "@/components/common/ResultPerPage";
import Layout from "@/components/layout";
import Filters from "@/components/pages/properties/filters";
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
      const query = router.query;
      const newFilters = {
        propertyType: query.propertyType
          ? Array.isArray(query.propertyType)
            ? query.propertyType
            : [query.propertyType]
          : [],
        listingType: query.listingType
          ? Array.isArray(query.listingType)
            ? query.listingType
            : [query.listingType]
          : [],
        city: query.city
          ? Array.isArray(query.city)
            ? query.city
            : [query.city]
          : [],
        constructionStatus: query.constructionStatus
          ? Array.isArray(query.constructionStatus)
            ? query.constructionStatus
            : [query.constructionStatus]
          : [],
        furnishingStatus: query.furnishingStatus
          ? Array.isArray(query.furnishingStatus)
            ? query.furnishingStatus
            : [query.furnishingStatus]
          : [],
        priceMin: {
          min: parseInt(query.priceMinMin) || facets?.priceMin?.min || 0,
          max:
            parseInt(query.priceMinMax) || facets?.priceMin?.max || 100000000,
        },
        totalArea: {
          min: parseInt(query.totalAreaMin) || facets?.totalArea?.min || 0,
          max: parseInt(query.totalAreaMax) || facets?.totalArea?.max || 10000,
        },
        builtUpArea: {
          min: parseInt(query.builtUpAreaMin) || facets?.builtUpArea?.min || 0,
          max:
            parseInt(query.builtUpAreaMax) || facets?.builtUpArea?.max || 10000,
        },
        carpetArea: {
          min: parseInt(query.carpetAreaMin) || facets?.carpetArea?.min || 0,
          max:
            parseInt(query.carpetAreaMax) || facets?.carpetArea?.max || 10000,
        },
      };
      setFilters(newFilters);
    }
  }, [router.query, router.isReady, facets]);

  // Update URL with current filters
  const updateURLWithFilters = (currentFilters) => {
    const query = { ...router.query };

    // Update array filters
    if (currentFilters.propertyType.length > 0) {
      query.propertyType = currentFilters.propertyType;
    } else {
      delete query.propertyType;
    }

    if (currentFilters.listingType.length > 0) {
      query.listingType = currentFilters.listingType;
    } else {
      delete query.listingType;
    }

    if (currentFilters.city.length > 0) {
      query.city = currentFilters.city;
    } else {
      delete query.city;
    }

    if (currentFilters.constructionStatus.length > 0) {
      query.constructionStatus = currentFilters.constructionStatus;
    } else {
      delete query.constructionStatus;
    }

    if (currentFilters.furnishingStatus.length > 0) {
      query.furnishingStatus = currentFilters.furnishingStatus;
    } else {
      delete query.furnishingStatus;
    }

    // Update range filters
    if (currentFilters.priceMin.min > facets?.priceMin?.min) {
      query.priceMinMin = currentFilters.priceMin.min;
    } else {
      delete query.priceMinMin;
    }

    if (currentFilters.priceMin.max < facets?.priceMin?.max) {
      query.priceMinMax = currentFilters.priceMin.max;
    } else {
      delete query.priceMinMax;
    }

    if (currentFilters.totalArea.min > facets?.totalArea?.min) {
      query.totalAreaMin = currentFilters.totalArea.min;
    } else {
      delete query.totalAreaMin;
    }

    if (currentFilters.totalArea.max < facets?.totalArea?.max) {
      query.totalAreaMax = currentFilters.totalArea.max;
    } else {
      delete query.totalAreaMax;
    }

    if (currentFilters.builtUpArea.min > facets?.builtUpArea?.min) {
      query.builtUpAreaMin = currentFilters.builtUpArea.min;
    } else {
      delete query.builtUpAreaMin;
    }

    if (currentFilters.builtUpArea.max < facets?.builtUpArea?.max) {
      query.builtUpAreaMax = currentFilters.builtUpArea.max;
    } else {
      delete query.builtUpAreaMax;
    }

    if (currentFilters.carpetArea.min > facets?.carpetArea?.min) {
      query.carpetAreaMin = currentFilters.carpetArea.min;
    } else {
      delete query.carpetAreaMin;
    }

    if (currentFilters.carpetArea.max < facets?.carpetArea?.max) {
      query.carpetAreaMax = currentFilters.carpetArea.max;
    } else {
      delete query.carpetAreaMax;
    }

    // Reset to page 1 when filters change
    query.page = 1;

    router.push({
      pathname: router.pathname,
      query,
    });
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Handle range filter changes
  const handleRangeFilterChange = (filterType, range) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: range,
    }));
  };

  // Handle page change
  const handlePageChange = (page) => {
    const query = { ...router.query, page };
    router.push({
      pathname: router.pathname,
      query,
    });
  };

  // Handle results per page change
  const handleResultsPerPageChange = (limit) => {
    const query = { ...router.query, limit, page: 1 };
    router.push({
      pathname: router.pathname,
      query,
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
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
    router.push({
      pathname: router.pathname,
      query: {},
    });
  };

  return (
    <div className="min-h-screen bg-brand-gray-300">
      <div className="container mx-auto px-4 py-8">
        <BreadcrumbMenu
          items={[
            { label: "Home", href: "/" },
            { label: "Properties", href: "/properties" },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  <VscSettings className="inline mr-2" />
                  Filters
                </h2>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear All
                </button>
              </div>

              <Filters
                facets={facets}
                filters={filters}
                onFilterChange={handleFilterChange}
                onRangeFilterChange={handleRangeFilterChange}
                isFiltering={isFiltering}
              />
            </div>
          </div>

          {/* Properties List */}
          <div className="lg:w-3/4">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    Properties
                  </h1>
                  <p className="text-gray-600">{totalCount} properties found</p>
                </div>
                <div className="flex items-center gap-4">
                  <ResultPerPage
                    current={resultsPerPage}
                    onChange={handleResultsPerPageChange}
                    options={[12, 24, 48]}
                  />
                </div>
              </div>
            </div>

            {/* Properties Grid */}
            {isFiltering ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 animate-pulse"
                  >
                    <div className="h-48 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalCount > 0 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(totalCount / resultsPerPage)}
                  onPageChange={handlePageChange}
                />
              </div>
            )}

            {/* No Results */}
            {!isFiltering && properties.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🏠</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No properties found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters to find more properties.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Properties = ({ data }) => {
  const { facets, properties, totalCount, currentPage, resultsPerPage } = data;

  return (
    <Layout>
      <PropertiesContent
        facets={facets}
        properties={properties}
        totalCount={totalCount}
        currentPage={currentPage}
        resultsPerPage={resultsPerPage}
      />
    </Layout>
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
