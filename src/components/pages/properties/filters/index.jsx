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
        title={"Property Type"}
        toggleAccordionHandler={toggleAccordionHandler}
        data={facets?.propertyType}
      >
        <CustomRefinement
          attribute="propertyType"
          data={facets?.propertyType}
          filters={filters.propertyType}
          filtersChangeHandler={filtersChangeHandler}
        />
      </AccordionWrapper>

      <AccordionWrapper
        isOpen={openAccordions.includes(2)}
        index={2}
        title={"Listing Type"}
        toggleAccordionHandler={toggleAccordionHandler}
        attribute="listingType"
        isLast={false}
      >
        <CustomRefinement
          attribute="listingType"
          data={facets?.listingType}
          filters={filters.listingType}
          filtersChangeHandler={filtersChangeHandler}
        />
      </AccordionWrapper>

      <AccordionWrapper
        isOpen={openAccordions.includes(3)}
        index={3}
        title={"City"}
        toggleAccordionHandler={toggleAccordionHandler}
        attribute="city"
        isLast={false}
      >
        <CustomRefinement
          attribute="city"
          data={facets?.city}
          filters={filters.city}
          filtersChangeHandler={filtersChangeHandler}
        />
      </AccordionWrapper>

      <AccordionWrapper
        isOpen={openAccordions.includes(4)}
        index={4}
        title={"Construction Status"}
        toggleAccordionHandler={toggleAccordionHandler}
        attribute="constructionStatus"
        isLast={false}
      >
        <CustomRefinement
          attribute="constructionStatus"
          data={facets?.constructionStatus}
          filters={filters.constructionStatus}
          filtersChangeHandler={filtersChangeHandler}
        />
      </AccordionWrapper>

      <AccordionWrapper
        isOpen={openAccordions.includes(5)}
        index={5}
        title={"Furnishing Status"}
        toggleAccordionHandler={toggleAccordionHandler}
        attribute="furnishingStatus"
        isLast={false}
      >
        <CustomRefinement
          attribute="furnishingStatus"
          data={facets?.furnishingStatus}
          filters={filters.furnishingStatus}
          filtersChangeHandler={filtersChangeHandler}
        />
      </AccordionWrapper>

      <AccordionWrapper
        isOpen={openAccordions.includes(6)}
        index={6}
        title={"Price Range"}
        toggleAccordionHandler={toggleAccordionHandler}
      >
        <CustomRangeSlider
          attribute="priceMin"
          filters={filters.priceMin}
          filtersChangeHandler={filtersChangeHandler}
          min={facets?.priceMin?.min || 0}
          max={facets?.priceMin?.max || 100000000}
          symbol="₹"
          facetData={facets?.priceMin}
        />
      </AccordionWrapper>

      <AccordionWrapper
        isOpen={openAccordions.includes(7)}
        index={7}
        title={"Total Area"}
        toggleAccordionHandler={toggleAccordionHandler}
      >
        <CustomRangeSlider
          attribute="totalArea"
          filters={filters.totalArea}
          filtersChangeHandler={filtersChangeHandler}
          min={facets?.totalArea?.min || 0}
          max={facets?.totalArea?.max || 10000}
          facetData={facets?.totalArea}
        />
      </AccordionWrapper>

      <AccordionWrapper
        isOpen={openAccordions.includes(8)}
        index={8}
        title={"Built Up Area"}
        toggleAccordionHandler={toggleAccordionHandler}
      >
        <CustomRangeSlider
          attribute="builtUpArea"
          filters={filters.builtUpArea}
          filtersChangeHandler={filtersChangeHandler}
          min={facets?.builtUpArea?.min || 0}
          max={facets?.builtUpArea?.max || 10000}
          facetData={facets?.builtUpArea}
        />
      </AccordionWrapper>

      <AccordionWrapper
        isOpen={openAccordions.includes(9)}
        index={9}
        title={"Carpet Area"}
        toggleAccordionHandler={toggleAccordionHandler}
        isLast={true}
      >
        <CustomRangeSlider
          attribute="carpetArea"
          filters={filters.carpetArea}
          filtersChangeHandler={filtersChangeHandler}
          min={facets?.carpetArea?.min || 0}
          max={facets?.carpetArea?.max || 10000}
          facetData={facets?.carpetArea}
        />
      </AccordionWrapper>
    </div>
  );
};

export default Filters;
