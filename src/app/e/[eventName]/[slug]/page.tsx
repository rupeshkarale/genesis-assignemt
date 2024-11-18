import RedirectOnMount from "@/app/component/redirectOnMount";
import SplashScreen from "@/app/component/slash-screen";
import { Box, LinearProgress } from "@mui/material";
import axios from "axios";
import Head from "next/head";
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
    title: `${data.title}`,
    description: `You're invited to ${data.title}. Secure your spot now!`,
    openGraph: {
      title: `${data.title}`,
      description: `You're invited to ${data.title}. Secure your spot now!`,
      keywords: `event, concert, music, ${data.title}, tickets`,
      images: [
        {
          url: data?.imageUrl,
          width: 1200,
          height: 630,
        },
        {
          url: data?.imageUrl,
          width: 300,
          height: 300,
        },
      ],
      // url: data?.url,
      url: `https://testing.eventy.xyz/e/${data.title}/${params.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.title}`,
      description: `You're invited to ${data.title}. Secure your spot now!`,
      images: [
        {
          url: data.imageUrl,

          // width: 800,
          // height: 600,
        },
      ],
      url: `https://testing.eventy.xyz/e/${data.title}/${params.slug}`,
    },
    whatsApp: {
      title: `${data.title}`,
      description: `You're invited to ${data.title}. Secure your spot now!`,
      thumbnailUrl: data.imageUrl,
      thumbnailWidth: 300,
      thumbnailHeight: 300,
    },
    viewport: "width=device-width, initial-scale=1.0",
    author: "Eventy",
  };
}

// Main Page Component
const Page = async ({ params }: { params: { slug: string } }) => {
  const data = await fetchData(params.slug);
  return (
    <>
      {data && (
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="title" content={data.title} />
          <meta
            name="description"
            content={`You're invited to ${data.title}. Secure your spot now!`}
          />
          <meta name="author" content="Eventy" />
          <meta
            name="keywords"
            content={`event, concert, music, ${data.title}, tickets`}
          />

          {/* Open Graph Meta Tags */}
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content={`https://testing.eventy.xyz/e/${data.title}/${params.slug}`}
          />
          <meta property="og:title" content={data.title} />
          <meta property="og:description" content={data.description} />
          <meta property="og:image" content={data.imageUrl} />
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />

          {/* Twitter Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:url"
            content={`https://testing.eventy.xyz/e/${data.title}/${params.slug}`}
          />
          <meta name="twitter:title" content={data.title} />
          <meta name="twitter:description" content={data.description} />
          <meta name="twitter:image" content={data.imageUrl} />

          {/* Canonical URL */}
          <link
            rel="canonical"
            href={`https://testing.eventy.xyz/e/${data.title}/${params.slug}`}
          />
          <meta property="og:locale" content="en_US" />
          <meta property="og:site_name" content="Eventy" />
        </Head>
      )}
      <SplashScreen />
      {/* <LinearProgress sx={{ width: "30%" }} />{" "} */}
      {/* </Box> */}
      {/* <SplashScreen /> */}
      <RedirectOnMount />
    </>
  );
};

export default Page;
