import { Editor } from "@tiptap/react";
import React from "react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Underline,
  Code,
  Undo,
  Link,
} from "lucide-react";

type ToolBarProps = {
  editor: Editor | null;
};

const ToolBar: React.FC<ToolBarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }
  const setLink = () => {
    let url = window.prompt("Enter the URL");

    if (url) {
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "http://" + url;
      }

      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="px-4 min-h-16 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start gap-5 w-full flex-wrap border border-gray-700">
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap ">
        <button
          onClick={setLink}
          className={
            editor.isActive("link")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Link className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();

            editor
              .chain()
              .focus()
              .setFontFamily("Comic Sans MS, Comic Sans")
              .run();
          }}
          className={
            editor.isActive("textStyle", {
              fontFamily: "Comic Sans MS, Comic Sans",
            })
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
          data-test-id="comic-sans"
        >
          <p className=" w-5 h-5 font-comic-sans">Ab</p>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Italic className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Underline className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Strikethrough className="w-5 h-5" />
        </button>

        {/* List Buttons */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <List className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <ListOrdered className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleCode().run();
          }}
          className={
            editor.isActive("code")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Code className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Undo className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ToolBar;
