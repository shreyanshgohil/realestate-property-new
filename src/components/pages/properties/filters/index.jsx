import React from "react";
import CustomRefinement from "../CustomRefinment";
import CustomRangeSlider from "../CustomRangeSlider";

const Filters = ({
  facets,
  filters,
  onFilterChange,
  onRangeFilterChange,
  isFiltering,
}) => {
  const formatPrice = (value) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(1)}Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    } else {
      return `₹${value.toLocaleString()}`;
    }
  };

  const formatArea = (value) => {
    return `${value} sq ft`;
  };

  return (
    <div className="space-y-6">
      {/* Property Type */}
      {facets?.propertyType && (
        <CustomRefinement
          title="Property Type"
          items={facets.propertyType}
          selectedItems={filters.propertyType}
          onChange={(items) => onFilterChange("propertyType", items)}
          isLoading={isFiltering}
        />
      )}

      {/* Listing Type */}
      {facets?.listingType && (
        <CustomRefinement
          title="Listing Type"
          items={facets.listingType}
          selectedItems={filters.listingType}
          onChange={(items) => onFilterChange("listingType", items)}
          isLoading={isFiltering}
        />
      )}

      {/* City */}
      {facets?.city && (
        <CustomRefinement
          title="City"
          items={facets.city}
          selectedItems={filters.city}
          onChange={(items) => onFilterChange("city", items)}
          isLoading={isFiltering}
        />
      )}

      {/* Construction Status */}
      {facets?.constructionStatus && (
        <CustomRefinement
          title="Construction Status"
          items={facets.constructionStatus}
          selectedItems={filters.constructionStatus}
          onChange={(items) => onFilterChange("constructionStatus", items)}
          isLoading={isFiltering}
        />
      )}

      {/* Furnishing Status */}
      {facets?.furnishingStatus && (
        <CustomRefinement
          title="Furnishing Status"
          items={facets.furnishingStatus}
          selectedItems={filters.furnishingStatus}
          onChange={(items) => onFilterChange("furnishingStatus", items)}
          isLoading={isFiltering}
        />
      )}

      {/* Price Range */}
      {facets?.priceMin && (
        <CustomRangeSlider
          title="Price Range"
          min={facets.priceMin.min || 0}
          max={facets.priceMin.max || 100000000}
          value={filters.priceMin}
          onChange={(range) => onRangeFilterChange("priceMin", range)}
          formatValue={formatPrice}
          isLoading={isFiltering}
        />
      )}

      {/* Total Area Range */}
      {facets?.totalArea && (
        <CustomRangeSlider
          title="Total Area"
          min={facets.totalArea.min || 0}
          max={facets.totalArea.max || 10000}
          value={filters.totalArea}
          onChange={(range) => onRangeFilterChange("totalArea", range)}
          formatValue={formatArea}
          isLoading={isFiltering}
        />
      )}

      {/* Built Up Area Range */}
      {facets?.builtUpArea && (
        <CustomRangeSlider
          title="Built Up Area"
          min={facets.builtUpArea.min || 0}
          max={facets.builtUpArea.max || 10000}
          value={filters.builtUpArea}
          onChange={(range) => onRangeFilterChange("builtUpArea", range)}
          formatValue={formatArea}
          isLoading={isFiltering}
        />
      )}

      {/* Carpet Area Range */}
      {facets?.carpetArea && (
        <CustomRangeSlider
          title="Carpet Area"
          min={facets.carpetArea.min || 0}
          max={facets.carpetArea.max || 10000}
          value={filters.carpetArea}
          onChange={(range) => onRangeFilterChange("carpetArea", range)}
          formatValue={formatArea}
          isLoading={isFiltering}
        />
      )}

      {/* Amenities */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Amenities</h3>

        {/* Security */}
        {facets?.security && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="security"
              className="mr-2"
              checked={filters.security === true}
              onChange={(e) => onFilterChange("security", e.target.checked)}
              disabled={isFiltering}
            />
            <label htmlFor="security" className="text-sm text-gray-700">
              Security (
              {facets.security.find((s) => s.value === true)?.count || 0})
            </label>
          </div>
        )}

        {/* Lift */}
        {facets?.lift && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="lift"
              className="mr-2"
              checked={filters.lift === true}
              onChange={(e) => onFilterChange("lift", e.target.checked)}
              disabled={isFiltering}
            />
            <label htmlFor="lift" className="text-sm text-gray-700">
              Lift ({facets.lift.find((l) => l.value === true)?.count || 0})
            </label>
          </div>
        )}

        {/* Parking */}
        {facets?.parking && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="parking"
              className="mr-2"
              checked={filters.parking === true}
              onChange={(e) => onFilterChange("parking", e.target.checked)}
              disabled={isFiltering}
            />
            <label htmlFor="parking" className="text-sm text-gray-700">
              Parking (
              {facets.parking.find((p) => p.value === true)?.count || 0})
            </label>
          </div>
        )}

        {/* Gymnasium */}
        {facets?.gymnasium && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="gymnasium"
              className="mr-2"
              checked={filters.gymnasium === true}
              onChange={(e) => onFilterChange("gymnasium", e.target.checked)}
              disabled={isFiltering}
            />
            <label htmlFor="gymnasium" className="text-sm text-gray-700">
              Gymnasium (
              {facets.gymnasium.find((g) => g.value === true)?.count || 0})
            </label>
          </div>
        )}

        {/* Swimming Pool */}
        {facets?.swimmingPool && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="swimmingPool"
              className="mr-2"
              checked={filters.swimmingPool === true}
              onChange={(e) => onFilterChange("swimmingPool", e.target.checked)}
              disabled={isFiltering}
            />
            <label htmlFor="swimmingPool" className="text-sm text-gray-700">
              Swimming Pool (
              {facets.swimmingPool.find((s) => s.value === true)?.count || 0})
            </label>
          </div>
        )}

        {/* Club House */}
        {facets?.clubHouse && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="clubHouse"
              className="mr-2"
              checked={filters.clubHouse === true}
              onChange={(e) => onFilterChange("clubHouse", e.target.checked)}
              disabled={isFiltering}
            />
            <label htmlFor="clubHouse" className="text-sm text-gray-700">
              Club House (
              {facets.clubHouse.find((c) => c.value === true)?.count || 0})
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
