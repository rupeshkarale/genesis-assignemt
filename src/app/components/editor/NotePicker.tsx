import React, { useState, useEffect } from "react";
import Tiptap from "./Tiptap";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Content } from "../../api/route";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface NotePickerProps {
  fetchData: () => void;
  editContent: Content | null;
  clearEditContent: () => void;
}

const NotePicker: React.FC<NotePickerProps> = ({
  fetchData,
  editContent,
  clearEditContent,
}) => {
  const [content, setContent] = useState<string>("");
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (editContent?.content) {
      setContent(editContent.content);
    }
  }, [editContent]);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleClearEditor = async () => {
    setContent("");
    clearEditContent();
  };

  const checkUserLogin = async () => {
    if (!session) {
      alert("Hey,Please Login Before Add Note");
      router.push("/login");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkUserLogin();
    try {
      if (editContent) {
        await axios.put("/api", {
          id: editContent.id,
          content,
        });
      } else {
        await axios.post("/api", {
          id: uuidv4(),
          content,
        });
      }
      fetchData();
      await handleClearEditor();
    } catch (error) {
      console.error("Error submitting content:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl w-full flex flex-col mx-auto pt-5 mb-10 gap-2 min-h-72"
    >
      <div className="text-3xl text-center text-sky-300 mb-5">Notes</div>

      <Tiptap content={content} onChange={handleContentChange} />

      <div className="flex justify-end gap-3">
        {content && (
          <button
            type="submit"
            className="px-5 border border-sky-500 text-sm text-sky-200 py-2 rounded-md"
          >
            {editContent ? "Save Changes" : "Add Note"}
          </button>
        )}
        {content && (
          <button
            type="button"
            onClick={handleClearEditor}
            className="px-5 border border-sky-500 text-sm text-sky-200 py-2 rounded-md mr-5"
          >
            {editContent ? "Cancel" : "Clear"}
          </button>
        )}
      </div>
    </form>
  );
};

export default NotePicker;
