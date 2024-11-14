import LoadingScreen from "@/app/components/loadingScreen";
import { Box, LinearProgress } from "@mui/material";
import axios from "axios";

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

// Set dynamic Open Graph metadata
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

// Main Page Component
const Page = async ({ params }: { params: { slug: string } }) => {
  const data = await fetchData(params.slug);

  // const targetUrl = `https://testing.eventy.xyz/e/${data.title}/${params.slug}`;

  return (
    <>
      <Box
        sx={{
          width: "100%", // Full width of the container
          height: "100vh", // Full viewport height
          display: "flex", // Use flexbox to align items
          justifyContent: "center", // Horizontally center the content
          alignItems: "center", // Vertically center the content
        }}
      >
        <LinearProgress sx={{ width: "20%" }} />{" "}
        {/* Optional: Adjust width of progress bar */}
      </Box>

      {/* <RedirectOnMount /> */}
    </>
  );
};

export default Page;
