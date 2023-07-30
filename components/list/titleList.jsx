import React from "react";

export default function TitleList({ title, Icon }) {
  return (
    <div className="flex gap-2 items-center mb-4">
      {Icon && <Icon className="w-5 fill-gray-400 text-gray-600" />}
        <h1 className="text-xl font-black text-gray-600 uppercase">{title}</h1>
    </div>
  );
}
