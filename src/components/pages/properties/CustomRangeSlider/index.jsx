import React, { useState, useEffect } from "react";

const CustomRangeSlider = ({
  title,
  min = 0,
  max = 10000,
  value = { min: 0, max: 10000 },
  onChange,
  formatValue = (val) => val.toLocaleString(),
  isLoading = false,
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleMinChange = (e) => {
    const newMin = parseInt(e.target.value);
    if (newMin <= localValue.max) {
      const newValue = { ...localValue, min: newMin };
      setLocalValue(newValue);
      onChange(newValue);
    }
  };

  const handleMaxChange = (e) => {
    const newMax = parseInt(e.target.value);
    if (newMax >= localValue.min) {
      const newValue = { ...localValue, max: newMax };
      setLocalValue(newValue);
      onChange(newValue);
    }
  };

  const getMinPercentage = () => {
    return ((localValue.min - min) / (max - min)) * 100;
  };

  const getMaxPercentage = () => {
    return ((localValue.max - min) / (max - min)) * 100;
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

      <div className="space-y-4">
        {/* Range Display */}
        <div className="flex justify-between text-sm text-gray-600">
          <span>{formatValue(localValue.min)}</span>
          <span>{formatValue(localValue.max)}</span>
        </div>

        {/* Custom Range Slider */}
        <div className="relative">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="absolute h-2 bg-blue-500 rounded-full"
              style={{
                left: `${getMinPercentage()}%`,
                right: `${100 - getMaxPercentage()}%`,
              }}
            ></div>
          </div>

          {/* Min Slider */}
          <input
            type="range"
            min={min}
            max={max}
            value={localValue.min}
            onChange={handleMinChange}
            disabled={isLoading}
            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer top-0"
            style={{
              background: "transparent",
            }}
          />

          {/* Max Slider */}
          <input
            type="range"
            min={min}
            max={max}
            value={localValue.max}
            onChange={handleMaxChange}
            disabled={isLoading}
            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer top-0"
            style={{
              background: "transparent",
            }}
          />
        </div>

        {/* Input Fields */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs text-gray-600 mb-1">Min</label>
            <input
              type="number"
              min={min}
              max={max}
              value={localValue.min}
              onChange={handleMinChange}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-gray-600 mb-1">Max</label>
            <input
              type="number"
              min={min}
              max={max}
              value={localValue.max}
              onChange={handleMaxChange}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomRangeSlider;
