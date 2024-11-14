"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const RedirectOnMount = ({ targetUrl }: { targetUrl?: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  // console.log("pathname,",);
  //   useEffect(() => {
  //     router.push(targetUrl); // Redirect when the component mounts
  //   }, [router, targetUrl]);

  useEffect(() => {
    setTimeout(() => {
      const pathSegments = pathname.split("/");
      const id = pathSegments[pathSegments.length - 1];

      //   router.push(`https://testing.eventy.xyz/e/title/${targetUrl}`);
      if (id)
        router.push(
          `https://testing.eventy.xyz/event/testing-11-nov-2024/${id}`
        );
    }, 1000);
  }, [router, targetUrl]);

  return null; // No need to render anything
};

export default RedirectOnMount;
