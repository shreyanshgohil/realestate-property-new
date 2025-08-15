import { useLayoutEffect, useState } from "react";
import Rheostat from "rheostat";
import "rheostat/css/rheostat.css";
import "rheostat/initialize";

const CustomRangeSlider = ({
  attribute,
  filters = { min: 0, max: 10000 },
  filtersChangeHandler,
  min = 0,
  max = 10000,
  symbol = "",
  facetData = null,
}) => {
  // Use facet data for dynamic min/max if available
  const dynamicMin = facetData?.min || min;
  const dynamicMax = facetData?.max || max;

  const [values, setValues] = useState([
    filters.min || dynamicMin,
    filters.max || dynamicMax,
  ]);

  useLayoutEffect(() => {
    setValues([filters.min || dynamicMin, filters.max || dynamicMax]);
  }, [filters, dynamicMin, dynamicMax]);

  const onChange = ({ values }) => {
    // This is called when the user is dragging
  };

  const valuesUpdateHandler = ({ values }) => {
    setValues(values);
  };

  const onValuesUpdated = ({ values }) => {
    // This is called when the user finishes dragging
    const newFilters = { min: values[0], max: values[1] };
    filtersChangeHandler({
      type: "range",
      key: attribute,
      value: newFilters,
    });
  };

  const formatValue = (value) => {
    if (attribute === "priceMin") {
      if (value >= 10000000) {
        return `${symbol}${(value / 10000000).toFixed(1)}Cr`;
      } else if (value >= 100000) {
        return `${symbol}${(value / 100000).toFixed(1)}L`;
      } else {
        return `${symbol}${value.toLocaleString()}`;
      }
    }
    if (
      attribute === "totalArea" ||
      attribute === "builtUpArea" ||
      attribute === "carpetArea"
    ) {
      return `${value.toLocaleString()} sq ft`;
    }
    return value.toLocaleString();
  };

  return (
    <>
      <Rheostat
        min={dynamicMin}
        max={dynamicMax}
        values={values}
        onChange={onChange}
        onValuesUpdated={onValuesUpdated}
      >
        <div className="flex justify-between pt-4">
          <div
            className="rheostat-marker rheostat-marker--large"
            style={{ left: 0 }}
          >
            <div className="rheostat-value font-semibold text-brand-neutral-500 text-sm">
              {formatValue(values[0])}
            </div>
          </div>
          <div
            className="rheostat-marker rheostat-marker--large"
            style={{ right: 0 }}
          >
            <div className="rheostat-value font-semibold text-brand-neutral-500 text-sm">
              {formatValue(values[1])}
            </div>
          </div>
        </div>
      </Rheostat>
    </>
  );
};

export default CustomRangeSlider;
