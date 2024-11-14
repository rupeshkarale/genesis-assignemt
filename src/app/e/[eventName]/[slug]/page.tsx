import RedirectOnMount from "@/app/component/redirectOnMount";
import SplashScreen from "@/app/component/slash-screen";
import { Box, LinearProgress } from "@mui/material";
import axios from "axios";
import { Suspense } from "react";

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
    title: `${data.title} -- Join Us!`,
    description: `You're invited to ${data.title}. Secure your spot now!`,
    openGraph: {
      title: `${data.title} -- Join Us!`,
      description: `You're invited to ${data.title}. Secure your spot now!`,
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
  return (
    <>
      {/* <link rel="icon" href={"/favicon.ico"} /> */}
      {/* <Head> */}
      {/* <link rel="icon" href={"/favicon.ico"} /> */}
      {/* <link rel="icon" href="/favicon.ico" sizes="any" /> */}
      {/* </Head> */}

      {/* <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      > */}
      {/* <Suspense fallback={<SplashScreen />}>{<RedirectOnMount />}</Suspense> */}
      <SplashScreen />
      {/* <LinearProgress sx={{ width: "30%" }} />{" "} */}
      {/* </Box> */}
      {/* <SplashScreen /> */}
      <RedirectOnMount />
    </>
  );
};

export default Page;
