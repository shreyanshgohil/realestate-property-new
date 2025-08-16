import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { skipToMainContentProps } from "@/utils/accessibility";

const Layout = ({ children }) => {
  return (
    <div className="">
      {/* Skip to main content link for accessibility */}
      <a {...skipToMainContentProps} />

      <Header />

      {/* Main content landmark */}
      <main id="main-content" role="main" tabIndex="-1">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
