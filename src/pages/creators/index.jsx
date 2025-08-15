import BreadcrumbMenu from "@/components/common/BreadcrumbMenu";
import InfluencerCard from "@/components/common/InfluencerCard";
import Pagination from "@/components/common/Pagination";
import ResultPerPage from "@/components/common/ResultPerPage";
import Layout from "@/components/layout";
import Filters from "@/components/pages/creators/filters";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import { FaListUl, FaMapMarkerAlt } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";

const InfluencersContent = (props) => {
  const router = useRouter();
  const {
    creators: initialCreators,
    facets: initialFacets,
    totalCount: initialTotalCount,
    currentPage: initialCurrentPage,
    resultsPerPage: initialResultsPerPage,
  } = props;

  // State for dynamic data
  const [creators, setCreators] = useState(initialCreators);
  const [facets, setFacets] = useState(initialFacets);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);
  const [resultsPerPage, setResultsPerPage] = useState(initialResultsPerPage);

  // Initialize filters from URL query parameters with dynamic ranges from facets
  const [filters, setFilters] = useState({
    mainAdvertizingPlatforms: [],
    typesOfProjectAvailableToWork: [],
    startingPrice: {
      min: facets?.startingPrice?.min || 0,
      max: facets?.startingPrice?.max || 10000,
    },
    instagramFollowers: {
      min: facets?.instagramFollowers?.min || 0,
      max: facets?.instagramFollowers?.max || 1000000,
    },
    youtubeSubscribers: {
      min: facets?.youtubeSubscribers?.min || 0,
      max: facets?.youtubeSubscribers?.max || 1000000,
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
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

      const url = `${baseUrl}/creator${queryParams ? `?${queryParams}` : ""}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.data) {
        setCreators(data.data.creators || []);
        setFacets(data.data.facets || {});
        setTotalCount(data.data.totalCount || 0);
        setCurrentPage(data.data.currentPage || 1);
        setResultsPerPage(data.data.resultsPerPage || 12);
      }
    } catch (error) {
      console.error("Error fetching creators:", error);
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
      if (router.query.mainAdvertizingPlatforms) {
        queryFilters.mainAdvertizingPlatforms = Array.isArray(
          router.query.mainAdvertizingPlatforms
        )
          ? router.query.mainAdvertizingPlatforms
          : [router.query.mainAdvertizingPlatforms];
      }

      if (router.query.typesOfProjectAvailableToWork) {
        queryFilters.typesOfProjectAvailableToWork = Array.isArray(
          router.query.typesOfProjectAvailableToWork
        )
          ? router.query.typesOfProjectAvailableToWork
          : [router.query.typesOfProjectAvailableToWork];
      }

      // Parse range filters
      if (router.query.startingPriceMin || router.query.startingPriceMax) {
        queryFilters.startingPrice = {
          min:
            parseInt(router.query.startingPriceMin) ||
            facets?.startingPrice?.min ||
            0,
          max:
            parseInt(router.query.startingPriceMax) ||
            facets?.startingPrice?.max ||
            10000,
        };
      }

      if (
        router.query.instagramFollowersMin ||
        router.query.instagramFollowersMax
      ) {
        queryFilters.instagramFollowers = {
          min:
            parseInt(router.query.instagramFollowersMin) ||
            facets?.instagramFollowers?.min ||
            0,
          max:
            parseInt(router.query.instagramFollowersMax) ||
            facets?.instagramFollowers?.max ||
            1000000,
        };
      }

      if (
        router.query.youtubeSubscribersMin ||
        router.query.youtubeSubscribersMax
      ) {
        queryFilters.youtubeSubscribers = {
          min:
            parseInt(router.query.youtubeSubscribersMin) ||
            facets?.youtubeSubscribers?.min ||
            0,
          max:
            parseInt(router.query.youtubeSubscribersMax) ||
            facets?.youtubeSubscribers?.max ||
            1000000,
        };
      }

      setFilters((prev) => ({ ...prev, ...queryFilters }));
    }
  }, [router.isReady, router.query, facets]);

  const updateURLWithFilters = useCallback(
    (newFilters) => {
      const query = { ...router.query };

      // Update array filters
      if (newFilters.mainAdvertizingPlatforms?.length > 0) {
        query.mainAdvertizingPlatforms = newFilters.mainAdvertizingPlatforms;
      } else {
        delete query.mainAdvertizingPlatforms;
      }

      if (newFilters.typesOfProjectAvailableToWork?.length > 0) {
        query.typesOfProjectAvailableToWork =
          newFilters.typesOfProjectAvailableToWork;
      } else {
        delete query.typesOfProjectAvailableToWork;
      }

      // Update range filters
      if (
        newFilters.startingPrice?.min > (facets?.startingPrice?.min || 0) ||
        newFilters.startingPrice?.max < (facets?.startingPrice?.max || 10000)
      ) {
        query.startingPriceMin = newFilters.startingPrice.min;
        query.startingPriceMax = newFilters.startingPrice.max;
      } else {
        delete query.startingPriceMin;
        delete query.startingPriceMax;
      }

      if (
        newFilters.instagramFollowers?.min >
          (facets?.instagramFollowers?.min || 0) ||
        newFilters.instagramFollowers?.max <
          (facets?.instagramFollowers?.max || 1000000)
      ) {
        query.instagramFollowersMin = newFilters.instagramFollowers.min;
        query.instagramFollowersMax = newFilters.instagramFollowers.max;
      } else {
        delete query.instagramFollowersMin;
        delete query.instagramFollowersMax;
      }

      if (
        newFilters.youtubeSubscribers?.min >
          (facets?.youtubeSubscribers?.min || 0) ||
        newFilters.youtubeSubscribers?.max <
          (facets?.youtubeSubscribers?.max || 1000000)
      ) {
        query.youtubeSubscribersMin = newFilters.youtubeSubscribers.min;
        query.youtubeSubscribersMax = newFilters.youtubeSubscribers.max;
      } else {
        delete query.youtubeSubscribersMin;
      }

      // Reset to page 1 when filters change
      delete query.page;

      // Debug: Log the query object being built

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
      mainAdvertizingPlatforms: [],
      typesOfProjectAvailableToWork: [],
      startingPrice: {
        min: facets?.startingPrice?.min || 0,
        max: facets?.startingPrice?.max || 10000,
      },
      instagramFollowers: {
        min: facets?.instagramFollowers?.min || 0,
        max: facets?.instagramFollowers?.max || 1000000,
      },
      youtubeSubscribers: {
        min: facets?.youtubeSubscribers?.min || 0,
        max: facets?.youtubeSubscribers?.max || 1000000,
      },
    };
    setFilters(clearedFilters);
    updateURLWithFilters(clearedFilters);
  };

  const hasActiveFilters = () => {
    return (
      filters.mainAdvertizingPlatforms.length > 0 ||
      filters.typesOfProjectAvailableToWork.length > 0 ||
      filters.startingPrice.min > (facets?.startingPrice?.min || 0) ||
      filters.startingPrice.max < (facets?.startingPrice?.max || 10000) ||
      filters.instagramFollowers.min > (facets?.instagramFollowers?.min || 0) ||
      filters.instagramFollowers.max <
        (facets?.instagramFollowers?.max || 1000000) ||
      filters.youtubeSubscribers.min > (facets?.youtubeSubscribers?.min || 0) ||
      filters.youtubeSubscribers.max <
        (facets?.youtubeSubscribers?.max || 1000000)
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
              Online and phone Counsellors and Therapists
            </h1>
            <div className="mb-10">
              <div className="mb-4">
                <p className="text-brand-gray mb-4">
                  We've found <strong>{totalCount || creators.length}</strong>{" "}
                  result{totalCount !== 1 ? "s" : ""} that match
                  {totalCount !== 1 ? "" : "es"} your criteria. All of our
                  creators are carefully verified to ensure they meet your
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
                      {filters.mainAdvertizingPlatforms.length > 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-theme/10 text-brand-theme capitalize">
                          Platforms:{" "}
                          {filters.mainAdvertizingPlatforms.join(", ")}
                        </span>
                      )}
                      {filters.typesOfProjectAvailableToWork.length > 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-theme/10 text-brand-theme capitalize">
                          Content:{" "}
                          {filters.typesOfProjectAvailableToWork.join(", ")}
                        </span>
                      )}
                      {(filters.startingPrice.min >
                        (facets?.startingPrice?.min || 0) ||
                        filters.startingPrice.max <
                          (facets?.startingPrice?.max || 10000)) && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-theme/10 text-brand-theme">
                          Price: ${filters.startingPrice.min.toLocaleString()} -
                          ${filters.startingPrice.max.toLocaleString()}
                        </span>
                      )}
                      {(filters.instagramFollowers.min >
                        (facets?.instagramFollowers?.min || 0) ||
                        filters.instagramFollowers.max <
                          (facets?.instagramFollowers?.max || 1000000)) && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-theme/10 text-brand-theme">
                          Instagram:{" "}
                          {filters.instagramFollowers.min.toLocaleString()} -{" "}
                          {filters.instagramFollowers.max.toLocaleString()}{" "}
                          followers
                        </span>
                      )}
                      {(filters.youtubeSubscribers.min >
                        (facets?.youtubeSubscribers?.min || 0) ||
                        filters.youtubeSubscribers.max <
                          (facets?.youtubeSubscribers?.max || 1000000)) && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-theme/10 text-brand-theme">
                          YouTube:{" "}
                          {filters.youtubeSubscribers.min.toLocaleString()} -{" "}
                          {filters.youtubeSubscribers.max.toLocaleString()}{" "}
                          subscribers
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
                {creators.length > 0 ? (
                  creators.map((influencer, key) => (
                    <InfluencerCard key={key} influencer={influencer} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="max-w-md mx-auto">
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-xl font-semibold text-brand-gray-700 mb-2">
                        No creators found
                      </h3>
                      <p className="text-brand-gray mb-6">
                        {hasActiveFilters()
                          ? "Try adjusting your filters or clearing some of them to see more results."
                          : "There are currently no creators available. Please check back later."}
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
                  (totalCount || creators.length) / (resultsPerPage || 12)
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

const Influencers = ({ data }) => {
  const { facets, creators, totalCount, currentPage, resultsPerPage } = data;
  return (
    <Layout>
      <InfluencersContent
        facets={facets}
        creators={creators}
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
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

    // Build query string for backend
    const queryParams = new URLSearchParams();

    // Add filter parameters
    if (query.mainAdvertizingPlatforms) {
      if (Array.isArray(query.mainAdvertizingPlatforms)) {
        query.mainAdvertizingPlatforms.forEach((platform) => {
          queryParams.append("mainAdvertizingPlatforms", platform);
        });
      } else {
        queryParams.append(
          "mainAdvertizingPlatforms",
          query.mainAdvertizingPlatforms
        );
      }
    }

    if (query.typesOfProjectAvailableToWork) {
      if (Array.isArray(query.typesOfProjectAvailableToWork)) {
        query.typesOfProjectAvailableToWork.forEach((type) => {
          queryParams.append("typesOfProjectAvailableToWork", type);
        });
      } else {
        queryParams.append(
          "typesOfProjectAvailableToWork",
          query.typesOfProjectAvailableToWork
        );
      }
    }

    // Add range filter parameters
    if (query.startingPriceMin)
      queryParams.append("startingPriceMin", query.startingPriceMin);
    if (query.startingPriceMax)
      queryParams.append("startingPriceMax", query.startingPriceMax);
    if (query.instagramFollowersMin)
      queryParams.append("instagramFollowersMin", query.instagramFollowersMin);
    if (query.instagramFollowersMax)
      queryParams.append("instagramFollowersMax", query.instagramFollowersMax);
    if (query.youtubeSubscribersMin)
      queryParams.append("youtubeSubscribersMin", query.youtubeSubscribersMin);
    if (query.youtubeSubscribersMax)
      queryParams.append("youtubeSubscribersMax", query.youtubeSubscribersMax);

    // Add pagination parameters
    if (query.page) queryParams.append("page", query.page);
    if (query.limit) queryParams.append("limit", query.limit);

    const queryString = queryParams.toString();
    const url = `${baseUrl}/creator${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(url);
    const data = await res.json();

    return {
      props: {
        data: data.data || {
          facets: {},
          creators: [],
          totalCount: 0,
          currentPage: 1,
          resultsPerPage: 12,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching creators:", error);
    return {
      props: {
        data: {
          facets: {},
          creators: [],
          totalCount: 0,
          currentPage: 1,
          resultsPerPage: 12,
        },
      },
    };
  }
}

export default Influencers;
