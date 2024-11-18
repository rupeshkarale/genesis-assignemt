import RedirectOnMount from "@/app/component/redirectOnMount";
import SplashScreen from "@/app/component/slash-screen";
import { Box, LinearProgress } from "@mui/material";
import axios from "axios";
import Head from "next/head";

interface PageData {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  venue: any;
  startEventDate: string;
}

// Async function to fetch the data
const fetchData = async (slug: string): Promise<PageData> => {
  try {
    const res = await axios.get(
      `https://testing-api.eventy.xyz/api/events/getOgTagsByEventId/${slug}`
    );

    const ogTags = res.data.data;
    return {
      title: ogTags?.name || "",
      description: ogTags?.description || "",
      imageUrl: ogTags?.eventImageDataValue || "",
      url: ogTags?.eventPageUrl || "",
      venue: ogTags?.venue,
      startEventDate: ogTags?.startEventDate,
    };
  } catch (error) {
    console.error("Error fetching data", error);
    return {
      title: "",
      description: "",
      imageUrl: "",
      url: "",
      venue: {
        fullAddress: "",
      },
      startEventDate: "",
    };
  }
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const data = await fetchData(params.slug);

  return {
    title: `${data.title}`,
    description: `You're invited to ${data.title}. Secure your spot now!`,
    viewport: "width=device-width, initial-scale=1.0",
    author: "Eventy",
    openGraph: {
      title: `${data.title}`,
      description: `You're invited to ${data.title}. Secure your spot now!`,
      keywords: `event, concert, music, ${data.title}, tickets`,
      images: [
        {
          url: new URL(data?.imageUrl),
          secureUrl: new URL(data?.imageUrl),
          width: 640,
          height: 360,
        },
        {
          url: new URL(data?.imageUrl),
          secureUrl: new URL(data?.imageUrl),
          width: 1200,
          height: 630,
        },
        {
          url: new URL(data?.imageUrl),
          secureUrl: new URL(data?.imageUrl),
          width: 300,
          height: 300,
        },
        {
          url: new URL(data?.imageUrl),
          secureUrl: new URL(data?.imageUrl),
          width: 200,
          height: 100,
        },
      ],
      // url: data?.url,
      // url: `https://testing.eventy.xyz/e/${data.title}/${params.slug}`,
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
    // whatsApp: {
    //   title: `${data.title}`,
    //   description: `You're invited to ${data.title}. Secure your spot now!`,
    //   thumbnailUrl: data.imageUrl,
    //   thumbnailWidth: 300,
    //   thumbnailHeight: 300,
    // },
  };
}

// Main Page Component
const Page = async ({ params }: { params: { slug: string } }) => {
  const data = await fetchData(params.slug);
  return (
    <>
      {data && (
        <Head>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: data.title,
              description: data.title,
              startDate: data.startEventDate,
              endDate: data.startEventDate,
              location: {
                "@type": "Place",
                name: data?.venue?.fullAddress,
                address: {
                  "@type": "PostalAddress",
                  streetAddress: data?.venue?.fullAddress,
                },
              },
              image: data.imageUrl,
              url: `https://testing.eventy.xyz/e/${data.title}/${params.slug}`,
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode:
                "https://schema.org/OfflineEventAttendanceMode",
            })}
          </script>
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
