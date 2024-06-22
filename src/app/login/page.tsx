"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Signin from "../components/auth/Signin";
import { useRouter } from "next/navigation";

export default function Component() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  return (
    <div className="flex items-center justify-center min-h-screen max-sm:px-10">
      <div className="p-6 max-w-md w-full rounded-lg shadow-md">
        <Signin />
      </div>
    </div>
  );
}
