import Link from "next/link";
import React from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";

const BreadcrumbMenu = () => {
  return (
    <div className="py-4">
      <div className="flex items-center gap-1.5">
        <Link
          href={"/"}
          className="text-brand-gray hover:text-brand-theme border-b border-transparent hover:border-b-brand-theme text-sm"
        >
          Home
        </Link>
        <MdOutlineArrowBackIos className="rotate-180 shrink-0 text-xxs text-brand-gray" />
        <span className="text-brand-gray text-sm">Influencers</span>
      </div>
    </div>
  );
};

export default BreadcrumbMenu;
