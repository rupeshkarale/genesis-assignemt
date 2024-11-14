"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const RedirectOnMount = ({ targetUrl }: { targetUrl?: string }) => {
  const router = useRouter();

  //   useEffect(() => {
  //     router.push(targetUrl); // Redirect when the component mounts
  //   }, [router, targetUrl]);

  useEffect(() => {
    setTimeout(() => {
      //   router.push(`https://testing.eventy.xyz/e/title/${targetUrl}`);
      router.push(
        `https://testing.eventy.xyz/event/testing-11-nov-2024/673213aa7e1e85e3fd7ccc7c`
      );
    }, 1000);
  }, [router, targetUrl]);

  return null; // No need to render anything
};

export default RedirectOnMount;
