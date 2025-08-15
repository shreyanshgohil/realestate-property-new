import React from "react";

const CustomRefinement = ({
  title,
  items = [],
  selectedItems = [],
  onChange,
  isLoading = false,
}) => {
  const handleFilterChange = (value) => {
    if (isLoading) return;

    const newSelectedItems = selectedItems.includes(value)
      ? selectedItems.filter((item) => item !== value)
      : [...selectedItems, value];

    onChange(newSelectedItems);
  };

  if (!items || items.length === 0) {
    return (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="text-sm text-gray-500">No options available</div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <div className="space-y-2">
        {items.map((item, index) => {
          const itemValue = typeof item === "string" ? item : item.value;
          const itemCount = typeof item === "string" ? null : item.count;
          const isSelected = selectedItems.includes(itemValue);

          return (
            <label
              key={`${title}-${index}`}
              className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value={itemValue}
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={isSelected}
                  onChange={() => handleFilterChange(itemValue)}
                  disabled={isLoading}
                />
                <span className="text-sm text-gray-700 capitalize">
                  {itemValue.replace(/_/g, " ")}
                </span>
              </div>
              {itemCount !== null && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {itemCount}
                </span>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default CustomRefinement;
