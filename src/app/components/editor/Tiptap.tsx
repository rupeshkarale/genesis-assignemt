import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ToolBar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import Code from "@tiptap/extension-code";
interface TiptapProps {
  content: string;
  onChange: (newContent: string) => void;
}

const Tiptap: React.FC<TiptapProps> = ({ content, onChange }) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Underline,
      TextStyle,
      FontFamily,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Code.configure({
        HTMLAttributes: {
          class: "bg-gray-800  px-3 py-1",
        },
      }),
    ],

    editorProps: {
      attributes: {
        class:
          " w-full gap-3 px-5 py-3 border-b border-r border-l border-gray-700 prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl  focus:outline-none rounded-bl-md rounded-br-md  max-w-none [&_ol]:list-decimal [&_ul]:list-disc",
      },
    },

    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="w-full px-4">
      <ToolBar editor={editor} />
      <div>
        <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;
