import AccordionWrapper from "@/components/common/Accordion";
import { useState } from "react";
import { VscSettings } from "react-icons/vsc";
import CustomRefinement from "../CustomRefinment";
import CustomRangeSlider from "../CustomRangeSlider";

const Filters = ({
  facets,
  filters,
  filtersChangeHandler,
  clearAllFilters,
  hasActiveFilters,
  isFiltering,
  onApplyFilters,
}) => {
  const [openAccordions, setOpenAccordions] = useState([]);

  const toggleAccordionHandler = (index) => {
    if (openAccordions.includes(index)) {
      setOpenAccordions(
        openAccordions.filter((filterItem) => filterItem !== index)
      );
    } else {
      setOpenAccordions([...openAccordions, index]);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md" style={{ borderRadius: "4px" }}>
      <div className="flex items-center justify-between border-b border-solid pb-4">
        <div className="flex items-center">
          <VscSettings className="mr-2 font-semibold text-lg" />
          <p className="text-1.5xl font-semibold text-brand-blue-700">
            Filters
          </p>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-brand-theme hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <AccordionWrapper
        isOpen={openAccordions.includes(1)}
        index={1}
        title={"Advertisement Platform"}
        toggleAccordionHandler={toggleAccordionHandler}
        data={facets?.mainAdvertizingPlatforms}
      >
        <CustomRefinement
          attribute="mainAdvertizingPlatforms"
          data={facets?.mainAdvertizingPlatforms}
          filters={filters.mainAdvertizingPlatforms}
          filtersChangeHandler={filtersChangeHandler}
        />
      </AccordionWrapper>

      <AccordionWrapper
        isOpen={openAccordions.includes(5)}
        index={5}
        title={"What content do you want to promote?"}
        toggleAccordionHandler={toggleAccordionHandler}
        attribute="typesOfProjectAvailableToWork"
        isLast={false}
      >
        <CustomRefinement
          attribute="typesOfProjectAvailableToWork"
          data={facets?.typesOfProjectAvailableToWork}
          filters={filters.typesOfProjectAvailableToWork}
          filtersChangeHandler={filtersChangeHandler}
        />
      </AccordionWrapper>

      <AccordionWrapper
        isOpen={openAccordions.includes(2)}
        index={2}
        title={"Cost"}
        toggleAccordionHandler={toggleAccordionHandler}
      >
        <CustomRangeSlider
          attribute="startingPrice"
          filters={filters.startingPrice}
          filtersChangeHandler={filtersChangeHandler}
          min={facets?.startingPrice?.min || 0}
          max={facets?.startingPrice?.max || 10000}
          symbol="$"
          facetData={facets?.startingPrice}
        />
      </AccordionWrapper>

      <AccordionWrapper
        isOpen={openAccordions.includes(3)}
        index={3}
        title={"Instagram Followers"}
        toggleAccordionHandler={toggleAccordionHandler}
      >
        <CustomRangeSlider
          attribute="instagramFollowers"
          filters={filters.instagramFollowers}
          filtersChangeHandler={filtersChangeHandler}
          min={facets?.instagramFollowers?.min || 0}
          max={facets?.instagramFollowers?.max || 1000000}
          facetData={facets?.instagramFollowers}
        />
      </AccordionWrapper>

      <AccordionWrapper
        isOpen={openAccordions.includes(4)}
        index={4}
        title={"YouTube Subscribers"}
        toggleAccordionHandler={toggleAccordionHandler}
        isLast={true}
      >
        <CustomRangeSlider
          attribute="youtubeSubscribers"
          filters={filters.youtubeSubscribers}
          filtersChangeHandler={filtersChangeHandler}
          min={facets?.youtubeSubscribers?.min || 0}
          max={facets?.youtubeSubscribers?.max || 1000000}
          facetData={facets?.youtubeSubscribers}
        />
      </AccordionWrapper>
    </div>
  );
};

export default Filters;
