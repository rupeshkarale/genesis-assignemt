"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const RedirectOnMount = ({ targetUrl }: { targetUrl: string }) => {
  const router = useRouter();

  //   useEffect(() => {
  //     router.push(targetUrl); // Redirect when the component mounts
  //   }, [router, targetUrl]);

  useEffect(() => {
    setTimeout(() => {
      router.push(`https://testing.eventy.xyz/e/title/${targetUrl}`);
    }, 1000);
  }, [router, targetUrl]);

  return null; // No need to render anything
};

export default RedirectOnMount;
