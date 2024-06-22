import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ToolBar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import FontFamily from "@tiptap/extension-font-family";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";

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
      StarterKit,
      Underline,
      Text,
      TextStyle,
      FontFamily,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-10 py-3 justify-start border-b border-r border-l border-gray-700 text-gray-400 items-start w-full gap-3  pt-4 rounded-bl-md rounded-br-md outline-none",
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
      <div className="editor-container">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;
