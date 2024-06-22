import React from "react";
import { Content } from "../../api/route";
import { Edit3, Trash } from "lucide-react";

const Note = ({
  handleEdit,
  content,
  index,
  handleDelete,
}: {
  handleEdit: (index: string) => Promise<void>;
  content: Content;
  index: number;
  handleDelete: (id: string) => Promise<void>;
}) => {
  return (
    <div className="w-full sm:w-1/2 gap-3">
      <div className="flex justify-between p-2 items-center ">
        <h2 className="  text-cyan-400 text-xl">POST NO {index + 1} </h2>

        <div>
          <button
            onClick={() => handleEdit(content.id)}
            className="px-3 border-sky-300 border-2  text-sky-300 py-1 rounded-md text-xs "
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={() => handleDelete(content.id)}
            className="px-3 border-sky-300 border-2 ml-4 text-sky-300 py-1 rounded-md text-xs "
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
      <div
        className=" p-3 sm:p-5 border border-slate-200 border-solid  break-words rounded-lg "
        dangerouslySetInnerHTML={{ __html: content.content }}
      ></div>
    </div>
  );
};

export default Note;
