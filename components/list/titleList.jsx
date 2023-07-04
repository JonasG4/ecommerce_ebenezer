import React from "react";
import { ListIcon } from "@/components/icons/regular";

export default function TitleList({ title }) {
  const titleLength = title.split(" ").length;
  const titleSplit = title.split(" ");

  const titleBold = titleSplit.slice(0, titleLength - 1).join(" ");
  const titleTable = titleSplit[titleLength - 1];

  return (
    <section className="flex flex-col gap-3 p-5 border-b-[1px] border-gray-300">
      <h1 className="lowercase  font-semibold text-gray-700 flex items-center gap-3">
        <ListIcon className={"w-5 fill-indigo-500 text-indigo-900"} />
        <p className="font-bold first-letter:uppercase text-xl">
          {title}
        </p>
      </h1>
    </section>
  );
}
