import SEO from "./index";

const PropertySEO = ({ property, url = "", ...props }) => {
  const {
    name,
    description,
    propertyType,
    listingType,
    priceMin,
    priceMax,
    city,
    stateName,
    placeName,
    images = [],
    constructionStatus,
    totalArea,
    builtUpArea,
    floorPlanDetails = [],
    highlights = [],
    reraNo,
    verified = false,
  } = property || {};

  // Create structured data for the property
  const propertyStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: name,
    description: description,
    image: images.length > 0 ? images[0].url : undefined,
    url: `${
      process.env.NEXT_PUBLIC_SITE_URL || "https://11yards.com"
    }/creators/${property?._id}`,
    knowsAbout: [propertyType, listingType, city, stateName],
    knowsLanguage: ["English", "Hindi"],
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressRegion: stateName,
      addressCountry: "India",
      streetAddress: placeName,
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Property Type",
        value: propertyType,
      },
      {
        "@type": "PropertyValue",
        name: "Listing Type",
        value: listingType,
      },
      {
        "@type": "PropertyValue",
        name: "Construction Status",
        value: constructionStatus,
      },
      {
        "@type": "PropertyValue",
        name: "Total Area",
        value: totalArea ? `${totalArea} sq ft` : undefined,
      },
      {
        "@type": "PropertyValue",
        name: "Built Up Area",
        value: builtUpArea ? `${builtUpArea} sq ft` : undefined,
      },
      {
        "@type": "PropertyValue",
        name: "RERA Number",
        value: reraNo,
      },
      {
        "@type": "PropertyValue",
        name: "Verified",
        value: verified,
      },
    ],
  };

  // Create property highlights array
  const propertyHighlights =
    highlights.length > 0
      ? highlights
      : [propertyType, listingType, city, stateName].filter(Boolean);

  const title = `${name} - ${verified ? "Verified " : ""}${propertyType} ${
    listingType === "SALE"
      ? "for Sale"
      : listingType === "RENT"
      ? "for Rent"
      : "for Lease"
  } in ${city}, ${stateName} | 11yards`;
  const descriptionText =
    description ||
    `Connect with ${name}, a premium ${propertyType.toLowerCase()} ${listingType.toLowerCase()} in ${city}, ${stateName}. ${
      totalArea ? `Total area: ${totalArea} sq ft.` : ""
    } ${
      highlights.length > 0
        ? `Highlights: ${highlights.slice(0, 3).join(", ")}.`
        : ""
    } Verified listing with RERA number ${reraNo}.`;
  const keywords =
    `${name}, ${propertyType}, ${listingType}, ${city}, ${stateName}, real estate, property, ${
      totalArea ? `${totalArea} sq ft,` : ""
    } ${highlights.slice(0, 5).join(", ")}`.replace(/,\s*,/g, ",");

  return (
    <SEO
      title={title}
      description={descriptionText}
      keywords={keywords}
      image={images.length > 0 ? images[0].url : undefined}
      url={url}
      type="profile"
      structuredData={propertyStructuredData}
      tags={[
        ...propertyHighlights,
        "real estate",
        "property",
        propertyType?.toLowerCase(),
        listingType?.toLowerCase(),
        city,
        stateName,
      ]}
      {...props}
    />
  );
};

export default PropertySEO;
