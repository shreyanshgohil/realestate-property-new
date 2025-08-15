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
                <span className="inline-block ml-3 capitalize">
                  {itemValue}
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
