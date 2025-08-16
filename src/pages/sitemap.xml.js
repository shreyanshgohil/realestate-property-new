const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://11yards.com";

  // Fetch properties data for dynamic sitemap
  let properties = [];
  try {
    const propertiesRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/property/facets`
    );
    const propertiesData = await propertiesRes.json();
    // You might need to adjust this based on your API response structure
    properties = propertiesData.data?.properties || [];
  } catch (error) {
    console.error("Error fetching properties for sitemap:", error);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- Static Pages -->
      <url>
        <loc>${baseUrl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${baseUrl}/properties</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
      </url>
      <url>
        <loc>${baseUrl}/about</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
      <url>
        <loc>${baseUrl}/contact</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
      </url>
      <url>
        <loc>${baseUrl}/privacy-policy</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.3</priority>
      </url>
      <url>
        <loc>${baseUrl}/terms-of-service</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.3</priority>
      </url>
      
      <!-- Dynamic Property Pages -->
      ${properties
        .map(
          (property) => `
        <url>
          <loc>${baseUrl}/properties/${property._id}/${
            property.name
              ?.toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[0-9-]/g, "") ||
            `${property.propertyType?.toLowerCase()}-${property.listingType?.toLowerCase()}-${property.city?.toLowerCase()}`
          }</loc>
          <lastmod>${new Date(
            property.updatedAt || property.createdAt
          ).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `
        )
        .join("")}
    </urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate"
  );
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
