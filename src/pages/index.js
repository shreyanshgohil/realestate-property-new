import Layout from "@/components/layout";
import Hero from "@/components/pages/Home/Hero";
import WhyUs from "@/components/pages/Home/WhyUs";
import SEO from "@/components/common/SEO";
import AccessibilityTester from "@/components/common/AccessibilityTester";
import { useEffect, useState } from "react";

const index = ({ facets }) => {
  const [showAccessibilityTester, setShowAccessibilityTester] = useState(false);

  // Keyboard shortcut to toggle accessibility tester (Ctrl + Shift + A)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === "A") {
        event.preventDefault();
        setShowAccessibilityTester((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // const { propertyType } = facets;

  return (
    <>
      <SEO
        title="11yards - Find Your Dream Property | Premium Real Estate Listings"
        description="Discover premium properties for sale, rent, and lease across India. Browse verified real estate listings including apartments, houses, commercial properties, and plots with detailed information and virtual tours."
        keywords="real estate, properties for sale, properties for rent, apartments, houses, commercial properties, plots, real estate listings, property search, 11yards, India"
        url="/"
      />
      <Layout>
        <div className="bg-brand-gray-300">
          <Hero propertyTypes={facets?.propertyType || []} />
          <WhyUs />
        </div>
      </Layout>

      {/* Accessibility Tester - Press Ctrl + Shift + A to toggle */}
      <AccessibilityTester isVisible={showAccessibilityTester} />

      {/* Accessibility info for keyboard users */}
      <div className="sr-only">
        Press Ctrl + Shift + A to open the accessibility tester
      </div>
    </>
  );
};

export async function getStaticProps() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${baseUrl}/properties/facets`);
  const data = await res.json();
  return {
    props: {
      facets: data.data,
    },
  };
}
export default index;
