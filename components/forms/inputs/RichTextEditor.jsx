"use client";
import { useMemo, useState, useEffect } from "react";
import "@/styles/quill.custom.css";
import dynamic from "next/dynamic";

export default function RichTextEditor({
  label,
  subtitle = "",
  value,
  onChange,
  errMessage,
}) {
  const ReactQuill = useMemo(
    () =>
      dynamic(() => import("react-quill"), {
        ssr: false,
        loading: () => <SkeletonEditor />,
      }),
    []
  );

  const [validation, setValidation] = useState(null);

  useEffect(() => {
    if (errMessage) {
      setValidation(errMessage);
    }
  }, [errMessage]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  const handlerChange = (value) => {
    onChange(value);
    setValidation(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <label htmlFor={label} className="text-sm text-gray-600 font-bold">
          {label} <span className={`text-indigo-600`}>*</span>
        </label>
        <p className={`text-xs text-gray-400 ${!subtitle && "hidden"}`}>
          {subtitle}
        </p>
      </div>
      <div className="pb-6 relative">
        <ReactQuill
          modules={modules}
          formats={formats}
          value={value}
          placeholder="Escribe aquí..."
          onChange={handlerChange}
          className={`bg-white ring-1 ${validation ? "ring-red-500" : "ring-gray-300"} rounded-md min-h-[160px] z-[100]`}
        />
        <p className="absolute bottom-0 text-sm text-red-500 mt-1">
          {validation ? validation : ""}
        </p>
      </div>
    </div>
  );
}

export const SkeletonEditor = () => (
  <div className="w-full h-[150px] rounded-md bg-gray-100 ring-1 ring-gray-300 animate-pulse "></div>
);
