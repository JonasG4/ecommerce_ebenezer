import { useState } from "react";
import { SearchGlass } from "@/components/icons/regular";

export default function SearchInput({ data, setData, placeholder }) {
  const [search, setSearch] = useState("");

  const handleChangeSearch = (event) => {
    const { value } = event.target;
    
    const filteredData = data.filter((item) => {
      return (
        item.nombre?.toLowerCase().includes(value.toLowerCase()) ||
        item.apellido?.toLowerCase().includes(value.toLowerCase()) ||
        item.email?.toLowerCase().includes(value.toLowerCase()) ||
        item.telefono?.toLowerCase().includes(value.toLowerCase())
        );
      });
      
    setSearch(value);
    setData([...filteredData]);
  };

  return (
    <div className="relative w-full">
      <input
        type="search"
        value={search}
        onChange={handleChangeSearch}
        className="w-full md:w-[350px] text-sm text-gray-600 pl-9 pr-2 rounded-md ring-1 bg-white ring-gray-400 border-none placeholder:text-sm peer focus:ring-indigo-500"
        placeholder={placeholder}
      />
      <SearchGlass
        className={`w-4 absolute top-[10px] left-2 fill-gray-400 peer-focus:fill-indigo-600`}
        width={16}
      />
    </div>
  );
}
