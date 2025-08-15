import checkboxStyles from "./checkbox.module.scss";

const CustomRefinement = ({
  attribute,
  data,
  filters = [],
  filtersChangeHandler,
}) => {
  const handleFilterChange = (value) => {
    filtersChangeHandler({
      type: "customRefinement",
      key: attribute,
      value: value,
    });
  };

  // Helper function to convert uppercase property types and listing types to proper case
  const formatPropertyType = (value) => {
    if (attribute === "propertyType") {
      switch (value) {
        case "APARTMENT":
          return "Apartment";
        case "HOUSE":
          return "House";
        case "COMMERCIAL":
          return "Commercial";
        case "PLOT":
          return "Plot";
        default:
          return value;
      }
    }
    if (attribute === "listingType") {
      switch (value) {
        case "SALE":
          return "For Sale";
        case "RENT":
          return "For Rent";
        case "LEASE":
          return "For Lease";
        default:
          return value;
      }
    }
    if (attribute === "constructionStatus") {
      switch (value) {
        case "UNDER_CONSTRUCTION":
          return "Under Construction";
        case "READY_TO_MOVE":
          return "Ready to Move";
        case "PLANNED":
          return "Planned";
        case "COMPLETED":
          return "Completed";
        default:
          return value;
      }
    }
    if (attribute === "furnishingStatus") {
      switch (value) {
        case "FURNISHED":
          return "Furnished";
        case "SEMI_FURNISHED":
          return "Semi Furnished";
        case "UNFURNISHED":
          return "Unfurnished";
        default:
          return value;
      }
    }
    return value;
  };

  if (!data || data.length === 0) {
    return <div className="text-sm text-brand-gray">No options available</div>;
  }

  return (
    <ul>
      {data.map((item, index) => {
        // Handle both old format (string) and new format (object with value and count)
        const itemValue = typeof item === "string" ? item : item.value;
        const itemCount = typeof item === "string" ? null : item.count;
        const isSelected = filters.includes(itemValue);

        return (
          <li key={`${attribute}-${index}`} className="mt-2 first:mt-0">
            <label className="text-brand-neutral-900 mr-3 hover:cursor-pointer flex items-start justify-between">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  value={itemValue}
                  className={`${checkboxStyles.input} `}
                  checked={isSelected}
                  onChange={() => handleFilterChange(itemValue)}
                />
                <span className="inline-block ml-3">
                  {formatPropertyType(itemValue)}
                </span>
              </div>
            </label>
          </li>
        );
      })}
    </ul>
  );
};

export default CustomRefinement;
