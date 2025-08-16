import Head from "next/head";

const SEO = ({
  title = "11yards - Find Your Dream Property | Real Estate Listings",
  description = "Discover premium properties for sale, rent, and lease across India. Browse verified real estate listings including apartments, houses, commercial properties, and plots with detailed information and virtual tours.",
  keywords = "real estate, properties for sale, properties for rent, apartments, houses, commercial properties, plots, real estate listings, property search, 11yards",
  image = "/images/logos/logo-header.svg",
  url = "",
  type = "website",
  author = "11yards",
  publishedTime = "",
  modifiedTime = "",
  section = "",
  tags = [],
  structuredData = null,
  noindex = false,
  canonical = "",
  locale = "en_US",
  siteName = "11yards",
}) => {
  const fullUrl = url
    ? `${process.env.NEXT_PUBLIC_SITE_URL || "https://11yards.com"}${url}`
    : process.env.NEXT_PUBLIC_SITE_URL || "https://11yards.com";
  const fullImageUrl = image.startsWith("http")
    ? image
    : `${process.env.NEXT_PUBLIC_SITE_URL || "https://11yards.com"}${image}`;

  // Default structured data for the real estate platform
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "11yards",
    description:
      "Discover premium properties for sale, rent, and lease across India",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://11yards.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${
          process.env.NEXT_PUBLIC_SITE_URL || "https://11yards.com"
        }/creators?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta
        name="robots"
        content={noindex ? "noindex,nofollow" : "index,follow"}
      />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Language and Locale */}
      <meta property="og:locale" content={locale} />
      <meta name="language" content="English" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={title} />

      {/* Article specific meta tags */}
      {type === "article" && (
        <>
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Additional SEO Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(finalStructuredData),
        }}
      />

      {/* Additional meta tags for real estate platform */}
      <meta name="application-name" content="11yards" />
      <meta name="apple-mobile-web-app-title" content="11yards" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Security headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
    </Head>
  );
};

export default SEO;
