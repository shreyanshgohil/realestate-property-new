import { IoSearch } from "react-icons/io5";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
const Header = () => {
  const [currentScroll, setCurrentScroll] = useState(0);

  const scrollHandler = () => {
    setCurrentScroll(window.scrollY);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <header className={`py-4 bg-white  ${currentScroll && "shadow-sm"}`}>
      <div className="container--boxed flex items-center justify-between">
        <div className="text-brand-theme-500">
          <Link href={"/"}>
            <Image
              src={"/images/logos/logo-header.svg"}
              width={199}
              height={44}
              alt=""
              style={{ height: "56px" }}
              fetchPriority="high"
            />
          </Link>
        </div>

        <div>
          <Link
            href={"/creators"}
            className="button--secondary w-full btn--black sm text-sm pill flex items-center gap-1.5 hi"
          >
            <IoSearch className="text-base" />
            <span>Search Properties</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
