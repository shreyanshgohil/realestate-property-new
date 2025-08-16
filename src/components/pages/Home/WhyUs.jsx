import Image from "next/image";
import Link from "next/link";

const WhyUs = () => {
  const whyUsData = [
    {
      title: "Verified Property Listings",
      description:
        "All properties are verified by our team with detailed information, high-quality images, and accurate pricing to help you make informed decisions.",
      linkTitle: "Browse verified properties",
      linkHref: "/properties",
      image: "/images/home/promoting-brand.svg",
    },
    {
      title: "Smart Property Search",
      description:
        "Use our advanced filters to find properties by location, price range, property type, and amenities. Save your searches and get notified of new listings.",
      linkTitle: "Start your search",
      linkHref: "/properties",
      image: "/images/home/search.svg",
    },
    {
      title: "Professional Support",
      description:
        "Get expert guidance from our real estate professionals. From property viewing to closing deals, we're here to support you every step of the way.",
      linkTitle: "Contact our team",
      linkHref: "/properties",
      image: "/images/home/remote-collaboration.svg",
    },
  ];

  return (
    <section className="md:section--sm" aria-labelledby="why-us-heading">
      <div className="container--boxed--lg">
        <p className="uppercase font-semibold text-sm text-center text-brand-theme mb-0.5">
          WHY CHOOSE 11YARDS?
        </p>
        <h2
          id="why-us-heading"
          className="heading--h3 text-center mb-10 md:mb-12 text-brand-blue-700"
        >
          Your trusted partner in finding the perfect property
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4">
          {whyUsData.map((feature, index) => (
            <article key={index} className="text-center">
              <Image
                src={feature.image}
                alt={`Illustration for ${feature.title}`}
                width={104}
                height={118}
                style={{ width: "auto", height: "118px" }}
                className="mb-3 mx-auto"
              />
              <h3 className="text-1.5xl font-bold text-brand-blue-700 mb-2 md:mb-4">
                {feature.title}
              </h3>
              <p className="text-brand-gray-500 mb-2 md:mb-4">
                {feature.description}
              </p>
              <Link
                className="text-brand-theme underline link-accessible"
                href={feature.linkHref}
                aria-label={`${feature.linkTitle} - ${feature.title}`}
              >
                {feature.linkTitle}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
