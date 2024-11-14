import axios from "axios";

// Define the type for the data fetched from the backend
interface PageData {
  title: string;
  description: string;
  imageUrl: string;
  url: string; // URL for Open Graph meta tags
}

// Async function to fetch the data
const fetchData = async (slug: string): Promise<PageData> => {
  try {
    const res = await axios.get(
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

// This function sets the dynamic Open Graph meta tags in the <head>
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const data = await fetchData(params.slug);

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [
        {
          url: data.imageUrl,
          width: 800,
          height: 600,
        },
      ],
      url: data.url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [data.imageUrl],
    },
  };
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const data = await fetchData(params.slug);

  return (
    <>
      <h1>{data.title} new code</h1>
      <p>{data.description}</p>
    </>
  );
};

export default Page;
