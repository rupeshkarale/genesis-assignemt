"use client";
import React, { useEffect, useState } from "react";
import NotePicker from "./components/editor/NotePicker";
import axios from "axios";
import { Content } from "./api/route";
import Note from "./components/editor/Note";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Head from "next/head";

const Home: React.FC = () => {
  const [contentList, setContentList] = useState<Content[]>([]);
  const [ogTags, setOgTags] = useState<any>(null); // Set to null initially
  const [editContent, setEditContent] = useState<Content | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    fetchDataEvent();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<Content[]>(`/api`);
      setContentList(response.data);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const fetchDataEvent = async () => {
    try {
      const response = await axios.get<Content[]>(
        `https://testing-api.eventy.xyz/api/events/getEventById/673485ad7e1e85e3fd7d5772`
      );
      console.log("response.data", response.data);
      setOgTags(response.data); // Set the fetched event data to ogTags state
      // You can use setContentList here if you need to use that data for the content list as well
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const response = await axios.get<Content>(`/api?id=${id}`);
      setEditContent(response.data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error fetching content for edit:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api?id=${id}`);
      await fetchData();
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  const clearEditContent = () => {
    setEditContent(null);
  };

  const handleLogin = (): void => {
    if (session) {
      signOut();
    } else {
      router.push("/login");
    }
  };

  // Default OG tags if no specific data is fetched
  const defaultOgTags = {
    title: "Default Title",
    description: "Default Description",
    image: "/default-image.jpg", // Fallback image
  };

  const dynamicOgTags = ogTags || defaultOgTags; // Use the fetched data if available, else fallback

  return (
    <div className="container mx-auto p-4">
      <Head>
        {/* Dynamically set OG tags */}
        <meta property="og:title" content={dynamicOgTags.title} />
        <meta property="og:description" content={dynamicOgTags.description} />
        <meta property="og:image" content={dynamicOgTags.image} />
        <meta property="og:type" content="website" />
        {/* Optional: other OG tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={dynamicOgTags.title} />
        <meta name="twitter:description" content={dynamicOgTags.description} />
        <meta name="twitter:image" content={dynamicOgTags.image} />
      </Head>

      <button
        onClick={handleLogin}
        type="button"
        className="bg-red-700 text-white text-xs py-1 px-3 sm:px-6 sm:py-2 rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700"
      >
        {session ? "SIGN - OUT" : "SIGN-IN"}
      </button>

      <NotePicker
        editContent={editContent}
        clearEditContent={clearEditContent}
        fetchData={fetchData}
      />

      <div className="flex flex-col gap-7 justify-center items-center px-4">
        {contentList.map((content, index) => (
          <Note
            key={content.id}
            content={content}
            handleEdit={() => handleEdit(content.id)}
            index={index}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
