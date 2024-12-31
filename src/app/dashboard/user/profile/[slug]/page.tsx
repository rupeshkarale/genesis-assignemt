import RedirectOnMount from "@/app/component/redirectOnMount";
import SplashScreen from "@/app/component/slash-screen";
import axios from "axios";
import Head from "next/head";
import sharp from "sharp";
import { parseStringPromise, Builder } from "xml2js";

interface PageData {
  _id: string;
  name: string;
  walletAddress: string;
  coverImage: string;
}

// Async function to fetch the data
const fetchData = async (slug: string): Promise<PageData> => {
  console.log("slug", slug);
  try {
    const res = await axios.get(
      //   `https://prod-api.eventy.xyz/api/events/getOgTagsByEventId/${slug}`
      `https://testing-api.eventy.xyz/api/users/getUserDetailsById/${slug}`
    );
    console.log("res.data", res.data);

    return res.data;
  } catch (error) {
    console.error("Error fetching data", error);
    return {
      _id: "",
      name: "",
      walletAddress: "",
      coverImage: "",
    };
  }
};

// export const fetchAndCustomizeSVG = async (
//   svgPath: string,
//   firstName: string,
//   walletAddress: string,
//   userId: string
// ): Promise<string> => {
//   try {
//     const response = await fetch(`http://localhost:3000${svgPath}`);
//     const svgText = await response.text();

//     const parser = new DOMParser();
//     const doc = parser.parseFromString(svgText, "image/svg+xml");

//     const firstNameElement = doc.querySelector(".cls-10");
//     const bgNameElement = doc.querySelector(".cls-44");
//     const walletAddressElement = doc.querySelector(".cls-121");
//     const nftElement = doc.querySelector(".cls-14");

//     if (firstNameElement) {
//       firstNameElement.textContent = firstName;
//     }
//     if (walletAddressElement) {
//       walletAddressElement.textContent = walletAddress;
//     }
//     if (bgNameElement) {
//       bgNameElement.textContent = firstName;
//     }
//     if (nftElement) {
//       nftElement.textContent = `NFT ID : ${userId?.slice(-5)}`;
//     }

//     return new XMLSerializer().serializeToString(doc.documentElement);
//   } catch (error) {
//     console.error("Error customizing SVG:", error);
//     throw error;
//   }
// };

const svgToBase64 = (svgString: string): string => {
  const buffer = Buffer.from(svgString, "utf-8"); // Convert the SVG string to a Buffer
  return buffer.toString("base64"); // Convert the buffer to a Base64 string
};
const fetchAndCustomizeSVG: (
  svgPath: string,
  firstName: string,
  walletAddress: string,
  userId: string
) => Promise<string> = async (
  svgPath: string,
  firstName: string,
  walletAddress: string,
  userId: string
): Promise<any> => {
  try {
    // Fetch the SVG file from the public directory
    const response = await fetch(`https://share.eventy.xyz${svgPath}`);
    const svgText = await response.text();
    // console.log("svgText", svgText);
    // Parse the SVG text into an XML object using xml2js
    const parsedSvg = await parseStringPromise(svgText);

    // Modify the SVG data
    if (parsedSvg.svg && parsedSvg.svg.text) {
      parsedSvg.svg.text.forEach((element: any) => {
        if (element["$"] && element["$"].class === "cls-10") {
          element._ = firstName; // Modify the text content for firstName
        }
        if (element["$"] && element["$"].class === "cls-44") {
          element._ = firstName; // Modify the background name
        }
        if (element["$"] && element["$"].class === "cls-121") {
          element._ = walletAddress; // Modify the wallet address
        }
        if (element["$"] && element["$"].class === "cls-14") {
          element._ = `NFT ID : ${userId?.slice(-5)}`; // Modify the NFT ID
        }
      });
    }

    const builder = new Builder();
    const updatedSvg = builder.buildObject(parsedSvg);
    // const base64Svg = svgToBase64(updatedSvg);
    // console.log("base64Svg", base64Svg);
    // return base64Svg;
    const pngBuffer = await sharp(Buffer.from(updatedSvg))
      .png({ quality: 80 })
      .toBuffer();

    return pngBuffer;
  } catch (error) {
    console.error("Error customizing SVG:", error);
    throw error;
  }
};

// export async function generateMetadata() {
//   const ogImagePath = `/api/convert-svg`; // Route to dynamically generate PNG
//   console.log("ogImagePath", ogImagePath);
//   const metadata = {
//     title: "Page Title",
//     description: "Page description",
//     openGraph: {
//       title: "Open Graph Title",
//       description: "Open Graph Description",
//       url: "https://share.eventy.xyz", // Your URL here
//       type: "website",
//       images: [
//         {
//           url: `https://share.eventy.xyz${ogImagePath}`,
//           width: 1200,
//           height: 630,
//           alt: "Open Graph Image Description",
//         },
//       ],
//     },
//   };

//   return metadata;
// }

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const data = await fetchData(params.slug);

  // Fetch and customize SVG
  const svgBlobUrl = await fetchAndCustomizeSVG(
    "/pass-design.svg",
    data?.name || "Name",
    data?.walletAddress,
    data?._id?.slice(-5)
  );

  const base64Image = Buffer.from(svgBlobUrl).toString("base64");

  const imageUrl = `data:image/png;base64,${base64Image}`;

  const eventUrl = `https://testing.eventy.xyz/dashboard/user/profile/${params?.slug}`;
  const description = `Follow me on Eventy to get the latest updates and events.`;

  // Create imageUrl with base64 encoded SVG
  // const imageUrl = `data:image/svg+xml;base64,${svgBlobUrl}`;

  return {
    // metadataBase: new URL("https://share.eventy.xyz/"),
    title: `${data?.name} Follow Me`,
    description,
    site_name: "Eventy",
    locale: "en_US",
    viewport: "width=device-width, initial-scale=1.0",
    author: "Eventy",
    openGraph: {
      site_name: "Eventy",
      locale: "en_US",
      title: `${data.name} Follow Me`,
      description,
      keywords: `event, concert, music, ${data?.name}, tickets`,
      images: [
        {
          url: imageUrl,
          secureUrl: imageUrl,
          width: 1200,
          height: 630,
        },
        {
          url: imageUrl,
          secureUrl: imageUrl,
          width: 300,
          height: 300,
        },
        {
          url: imageUrl,
          secureUrl: imageUrl,
          width: 640,
          height: 360,
        },
        {
          url: imageUrl,
          secureUrl: imageUrl,
          width: 200,
          height: 100,
        },
      ],
      url: eventUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.name} Follow Me`,
      description,
      images: [
        {
          url: imageUrl,
        },
      ],
      url: eventUrl,
    },
    whatsApp: {
      title: `${data.name} Follow Me`,
      description,
      thumbnailUrl: imageUrl,
      thumbnailWidth: "300px",
      thumbnailHeight: "300px",
    },
  };
}
// Main Page Component
const Page = async ({ params }: { params: { slug: string } }) => {
  const data = await fetchData(params.slug);
  // Fetch and customize SVG
  const svgBlobUrl = await fetchAndCustomizeSVG(
    "/pass-design.svg",
    data?.name || "Name",
    data?.walletAddress,
    data?._id?.slice(-5)
  );

  // Create imageUrl with base64 encoded SVG
  // const imageUrl = `data:image/svg+xml;base64,${svgBlobUrl}`;
  const base64Image = Buffer.from(svgBlobUrl).toString("base64");

  // Create image URL with base64-encoded PNG
  const imageUrl = `data:image/png;base64,${base64Image}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" /></svg>`;

  // If you want to use the SVG directly in the Open Graph metadata, base64 encode it
  const base64Svg = `data:image/svg+xml;base64,${Buffer.from(svg).toString(
    "base64"
  )}`;

  return (
    <>
      {data && (
        <Head>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: data?.name,
              description: data.name,
              // startDate: data.startEventDate,
              // endDate: data.startEventDate,
              // location: {
              //   "@type": "Place",
              //   name: data?.venue?.fullAddress,
              //   address: {
              //     "@type": "PostalAddress",
              //     streetAddress: data?.venue?.fullAddress,
              //   },
              // },
              // image: data.imageUrl,
              // url: `https://testing.eventy.xyz/e/${data.title}/${params.slug}`,
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode:
                "https://schema.org/OfflineEventAttendanceMode",
            })}
          </script>
        </Head>
      )}
      <div>
        <img src={imageUrl} alt="Customized SVG" width="300" height="300" />
      </div>
      {/* <SplashScreen /> */}

      {/* <RedirectOnMount /> */}
    </>
  );
};

export default Page;
