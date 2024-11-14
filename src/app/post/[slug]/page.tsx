import Head from "next/head";
import axios from "axios";

// Define the type for the data fetched from the backend
interface PageData {
  title: string;
  description: string;
  imageUrl: string;
  url: string; // URL for Open Graph meta tags
}

interface PageProps {
  data: PageData;
}

// Async function to fetch the data
const fetchData = async (slug: string): Promise<PageData> => {
  try {
    const res = await axios.get(
      // Replace with your actual backend API endpoint
      `https://testing-api.eventy.xyz/api/events/getEventById/${slug}`
    );
    const ogTags = res.data;

    return {
      title: ogTags?.name || "",
      description: ogTags?.description || "",
      imageUrl: ogTags?.eventImageDataValue || "",
      url: ogTags?.eventPageUrl || "", // Adjust field if needed
    };
  } catch (error) {
    console.error("Error fetching data", error);
    return {
      title: "",
      description: "",
      imageUrl: "",
      url: "",
    };
  }
};

const Page = async ({ params }: { params: { slug: string } }) => {
  // Fetch the data dynamically based on the slug
  const data = await fetchData(params.slug);

  return (
    <>
      <Head>
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.description} />
        <meta property="og:image" content={data.imageUrl} />
        <meta property="og:url" content={data.url} />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags (optional) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:description" content={data.description} />
        <meta name="twitter:image" content={data.imageUrl} />
      </Head>

      {/* Page Content */}
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </>
  );
};

export default Page;
