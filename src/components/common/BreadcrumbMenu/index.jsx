import Link from "next/link";
import React from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";

const BreadcrumbMenu = ({ items }) => {
  // If items are provided, use them; otherwise, show default breadcrumb
  if (items && items.length > 0) {
    return (
      <div className="py-4">
        <div className="flex items-center gap-1.5">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <MdOutlineArrowBackIos className="rotate-180 shrink-0 text-xxs text-brand-gray" />
              )}
              {item.href && item.href !== "#" ? (
                <Link
                  href={item.href}
                  className="text-brand-gray hover:text-brand-theme border-b border-transparent hover:border-b-brand-theme text-sm"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-brand-gray text-sm">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  // Default breadcrumb for properties page
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
        <span className="text-brand-gray text-sm">Properties</span>
      </div>
    </div>
  );
};

export default BreadcrumbMenu;
