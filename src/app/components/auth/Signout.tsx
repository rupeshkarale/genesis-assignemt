import React from "react";
import { useSession, signOut } from "next-auth/react";

const Signout: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg text-center">
        <p className="text-lg mb-4">
          Signed in as{" "}
          <span className="font-semibold text-black">
            {session?.user?.email || "Guest"}
          </span>
        </p>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Signout;
