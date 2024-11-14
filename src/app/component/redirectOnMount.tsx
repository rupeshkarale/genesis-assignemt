"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const RedirectOnMount = ({ targetUrl }: { targetUrl?: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const pathSegments = pathname.split("/");
    const eventId = pathSegments[pathSegments.length - 1];
    const eventName = pathSegments[pathSegments.length - 2];

    if (eventId)
      router.push(`https://testing.eventy.xyz/e/${eventName}/${eventId}`);
  }, [router, targetUrl]);

  return null;
};

export default RedirectOnMount;
