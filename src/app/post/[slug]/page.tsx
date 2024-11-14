import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Define the type for the data fetched from the backend
interface PageData {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
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
      url: ogTags?.eventPageUrl || "",
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

// Client component to handle redirect on mount
const RedirectOnMount = ({
  slug,
  targetUrl,
}: {
  slug: string;
  targetUrl: string;
}) => {
  const router = useRouter();

  useEffect(() => {
    // Redirect on client-side mount
    router.push(targetUrl);
  }, [router, targetUrl]);

  return null; // Don't render anything during the redirect
};

// Server component to set metadata and render redirect logic
const Page = async ({ params }: { params: { slug: string } }) => {
  const data = await fetchData(params.slug);

  // Define the target URL for redirect
  const targetUrl = `https://testing.eventy.xyz/e/${data.title}/${params.slug}`;

  return (
    <>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <RedirectOnMount slug={params.slug} targetUrl={targetUrl} />
    </>
  );
};

export default Page;
