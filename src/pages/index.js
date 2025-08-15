import Layout from "@/components/layout";
import Hero from "@/components/pages/Home/Hero";
import WhyUs from "@/components/pages/Home/WhyUs";

const index = ({ facets }) => {
  // const { typesOfProjectAvailableToWork } = facets;

  return (
    <Layout>
      <main className="bg-brand-gray-300">
        <Hero typesOfProjectAvailableToWork={[]} />
        <WhyUs />
      </main>
    </Layout>
  );
};

export async function getStaticProps() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${baseUrl}/creator/facets`);
  const data = await res.json();
  return {
    props: {
      facets: data.data,
    },
  };
}
export default index;
