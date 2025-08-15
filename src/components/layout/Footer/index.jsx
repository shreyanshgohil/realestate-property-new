import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../../../public/images/logos/logo-footer.svg";
const Footer = () => {
  return (
    <div className="bg-brand-gray-300">
      <footer className="container--boxed pt-24">
        <div className="py-12 border-t border-solid border-brand-gray-400">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
            <Link href={"/"}>
              <Image
                src={logo}
                width={199}
                height={44}
                alt=""
                style={{ height: "70px" }}
                fetchPriority="high"
              />
            </Link>

            <ul className="flex items-center flex-wrap mt-8 md:mt-0">
              <li className="px-2 sm:px-4 border-l border-l-brand-neutral-200 h-5 flex items-center last:pr-0 first:border-l-0 first:pl-0">
                <Link
                  href="/privacy"
                  className="text-sm text-brand-gray hover:underline"
                >
                  Privacy
                </Link>
              </li>
              <li className="px-2 sm:px-4 border-l border-l-brand-neutral-200 h-5 flex items-center last:pr-0 first:border-l-0 first:pl-0">
                <Link
                  href="/terms-and-conditions"
                  className="text-sm text-brand-gray hover:underline"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li className="px-2 sm:px-4 border-l border-l-brand-neutral-200 h-5 flex items-center last:pr-0 first:border-l-0 first:pl-0">
                <Link
                  href="/cookiepolicy"
                  className="text-sm text-brand-gray hover:underline"
                >
                  We use Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
