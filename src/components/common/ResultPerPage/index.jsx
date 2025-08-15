import React from "react";
import { useRouter } from "next/router";

const ResultPerPage = ({ currentLimit = 12, onLimitChange }) => {
  const router = useRouter();

  const handleLimitChange = (event) => {
    const newLimit = parseInt(event.target.value);
    if (onLimitChange) {
      onLimitChange(newLimit);
    } else {
      // Update URL directly if no handler provided
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, limit: newLimit, page: 1 },
        },
        undefined,
        { shallow: true }
      );
    }
  };

  return (
    <div className="flex items-center gap-2.5">
      <p className="whitespace-nowrap text-brand-blue-700 font-medium">
        Results per page
      </p>
      <select
        className="select h-10 border border-brand-gray-500/30 cursor-pointer"
        style={{ maxWidth: "76px", borderRadius: "4px" }}
        id="results-per-page"
        value={currentLimit}
        onChange={handleLimitChange}
      >
        <option value={12}>12</option>
        <option value={24}>24</option>
        <option value={48}>48</option>
      </select>
    </div>
  );
};

export default ResultPerPage;
