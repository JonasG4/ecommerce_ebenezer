import React from "react";

export default function Loading() {
  return (
    <div className="grid py-2 gap-x-6 gap-y-6">
      <div className="w-full flex flex-col gap-2">
        <div className="w-full relative h-[150px] bg-gray-200 rounded-md skeleton after:rounded-md"></div>
        <div className="w-[120px] relative h-8 bg-gray-200 rounded-md skeleton after:rounded-md"></div>
      </div>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="w-[100px] relative h-2 bg-gray-200 rounded-md skeleton after:rounded-md"></div>
          <div className="w-[200px] relative h-2 bg-gray-200 rounded-md skeleton after:rounded-md"></div>
          <div className="w-full relative h-8 bg-gray-200 rounded-md skeleton after:rounded-md"></div>
        </div>
      ))}
      <div className="w-full flex gap-2">
        <div className="w-full relative h-8 bg-gray-200 rounded-md skeleton after:rounded-md"></div>
        <div className="w-full relative h-8 bg-gray-200 rounded-md skeleton after:rounded-md"></div>
      </div>
    </div>
  );
}
