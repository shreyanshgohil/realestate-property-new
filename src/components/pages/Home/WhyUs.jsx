import Image from "next/image";
import Link from "next/link";
const WhyUs = () => {
  const whyUsData = [
    {
      title: "I need help promoting my brand",
      description:
        "Find the perfect content creators to boost your brand visibility and connect with your target audience across platforms like Instagram, YouTube, and TikTok.",
      linkTitle: "Explore creator categories",
      linkHref: "/creators",
    },
    {
      title: "Finding the right creator",
      description:
        "Choosing the right content creator is crucial. Let us guide you through audience demographics, engagement rates, and campaign fit to make the right choice.",
      linkTitle: "How to find a content creator",
      linkHref: "/creators",
    },
    {
      title: "Can I collaborate remotely?",
      description:
        "Most content creators offer online brand collaborations, shout-outs, product placements and live reviews. Browse their profiles or use our smart match tool.",
      linkTitle: "Start your online campaign",
      linkHref: "/creators",
    },
  ];

  return (
    <section className="md:section--sm">
      <div className="container--boxed--lg">
        <p className="uppercase font-semibold text-sm text-center text-brand-theme mb-0.5">
          WHY USE CREATOR LISTING?
        </p>
        <h2 className="heading--h3 text-center mb-10 md:mb-12 text-brand-blue-700">
          Connecting you with the right content creators for your brand
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4">
          {whyUsData.slice(0, 1).map((singleQuestion, index) => {
            return (
              <div key={index}>
                <Image
                  src={"/images/home/promote-brand.svg"}
                  alt={singleQuestion.title}
                  width={104}
                  height={118}
                  style={{ width: "auto", height: "118px" }}
                  className="mb-3"
                />
                <h3 className="text-1.5xl font-bold text-brand-blue-700 mb-2 md:mb-4">
                  {singleQuestion.title}
                </h3>
                <p className="text-brand-gray-500 mb-2 md:mb-4">
                  {singleQuestion.description}
                </p>
                <Link
                  className="text-brand-theme underline "
                  href={singleQuestion.linkHref}
                >
                  {singleQuestion.linkTitle}
                </Link>
              </div>
            );
          })}
          {whyUsData.slice(1, 2).map((singleQuestion, index) => {
            return (
              <div key={index}>
                <Image
                  src={"/images/home/find-right-creator.svg"}
                  alt={singleQuestion.title}
                  width={104}
                  height={118}
                  style={{ width: "auto", height: "118px" }}
                  className="mb-3"
                />
                <h3 className="text-1.5xl font-bold text-brand-blue-700 mb-2 md:mb-4">
                  {singleQuestion.title}
                </h3>
                <p className="text-brand-gray-500 mb-2 md:mb-4">
                  {singleQuestion.description}
                </p>
                <Link
                  className="text-brand-theme underline "
                  href={singleQuestion.linkHref}
                >
                  {singleQuestion.linkTitle}
                </Link>
              </div>
            );
          })}
          {whyUsData.slice(2, 3).map((singleQuestion, index) => {
            return (
              <div key={index}>
                <Image
                  src={"/images/home/remote-collaboration.svg"}
                  alt={singleQuestion.title}
                  width={104}
                  height={118}
                  style={{ width: "auto", height: "118px" }}
                  className="mb-3"
                />
                <h3 className="text-1.5xl font-bold text-brand-blue-700 mb-2 md:mb-4">
                  {singleQuestion.title}
                </h3>
                <p className="text-brand-gray-500 mb-2 md:mb-4">
                  {singleQuestion.description}
                </p>
                <Link
                  className="text-brand-theme underline "
                  href={singleQuestion.linkHref}
                >
                  {singleQuestion.linkTitle}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
