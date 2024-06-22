"use client";
import React, { useEffect, useState } from "react";
import NotePicker from "./components/editor/NotePicker";
import axios from "axios";
import { Content } from "./api/route";
import Note from "./components/editor/Note";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const [contentList, setContentList] = useState<Content[]>([]);
  const [editContent, setEditContent] = useState<Content | null>(null);
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api`);
      setContentList(response.data);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const response = await axios.get(`/api?id=${id}`);
      setEditContent(response.data);
      window.scrollTo({ top: 0, behavior: "smooth" });
      //it will edit after onSubmit click
    } catch (error) {
      console.error("Error fetching content for edit:", error);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api?id=${id}`);
      await fetchData();
    } catch (error) {
      console.error("Error fetching content for edit:", error);
    }
  };

  const clearEditContent = () => {
    setEditContent(null);
  };

  const handleLogin = () => {
    if (session) {
      signOut();
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="container mx-auto p-4">
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
