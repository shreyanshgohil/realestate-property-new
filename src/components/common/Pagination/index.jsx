import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav aria-label="Search pagination" className="flex items-center">
      <div className="flex items-center justify-center md:justify-between w-full">
        <ReactPaginate
          className="flex gap-2 md:gap-3 flex-wrap"
          breakLabel="..."
          nextLabel="next >"
          onPageChange={(current) => {
            if (onPageChange) {
              onPageChange(current.selected + 1);
            }
          }}
          pageRangeDisplayed={2}
          pageCount={totalPages}
          previousLabel="< previous"
          previousClassName={"hidden"}
          nextClassName={"hidden"}
          pageClassName={
            "border border-solid border-brand-blue-800 hover:bg-brand-blue-800 bg-white rounded-lg items-center text-brand-blue-800 hover:text-white cursor-pointer flex text-sm  justify-center  active "
          }
          pageLinkClassName={"h-9 w-9 flex items-center justify-center"}
          forcePage={currentPage - 1}
          containerClassName={"pagination"}
          disabledClassName={"disabled-page"}
          marginPagesDisplayed={1}
          activeClassName={
            "border border-solid border-brand-blue-800 !bg-brand-blue-800 rounded-lg items-center !text-white cursor-pointer flex text-sm  justify-center  pagination-page"
          }
          activeLinkClassName={"h-9 w-9 flex items-center justify-center"}
          breakClassName={
            "border border-solid border-brand-blue-800 !bg-white rounded-lg items-center !text-brand-blue-800 cursor-pointer flex text-sm  justify-center  active"
          }
          breakLinkClassName={"h-9 w-9 flex items-center justify-center"}
          renderOnZeroPageCount={null}
        />
      </div>
    </nav>
  );
};

export default Pagination;
