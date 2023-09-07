import _ from "lodash";
import { AngleDownIcon } from "../icons/light";

export default function Pagination({
  items,
  currentPage,
  onChangePage,
  onChangePageSize,
  pageSize = 10,
}) {
  const pageCount = items / pageSize;
  const pages = _.range(1, pageCount + 1);

  const nextPage = () => {
    if (currentPage < pageCount) {
      onChangePage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1);
    }
  };

  return (
    <div className="flex items-center justify-between border-y border-zinc-300 py-3 bg-zinc-50 px-2">
      <div>
        <p className="text-sm font-normal text-zinc-800">
          {items} productos encontrados
        </p>
      </div>
      <nav className="flex gap-2 justify-center items-center">
        <ul className="inline-flex items-center -space-x-px gap-1">
          <li onClick={prevPage}>
            <span className="sr-only">Anterior</span>
            <AngleDownIcon className="w-4 fill-zinc-400 hover:fill-red-800 cursor-pointer active:scale-95 rotate-90" />
          </li>
          {pages.map((page) => {
            return (
              <li
                key={page}
                className={`flex items-center justify-center w-[28px] h-[28px] rounded-full cursor-pointer leading-tight ${
                  page === currentPage
                    ? "text-red-600 bg-red-50 border border-red-300 hover:bg-red-100 hover:text-red-700 font-medium"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700 font-normal"
                } `}
                onClick={() => onChangePage(page)}
              >
                {page}
              </li>
            );
          })}
          <li onClick={nextPage}>
            <span className="sr-only">Siguiente</span>
            <AngleDownIcon className="w-4 fill-zinc-400 hover:fill-red-800 cursor-pointer active:scale-95 -rotate-90" />
          </li>
        </ul>
        <div className="h-[30px] w-[1px] bg-zinc-300 mx-2"></div>
        <select
          className="border border-zinc-300 rounded-md text-sm font-normal text-zinc-800 focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
          onChange={onChangePageSize}
        >
          <option value="10">10 por pagina</option>
          <option value="20">20 por pagina</option>
          <option value="30">30 por pagina</option>
          <option value="40">40 por pagina</option>
          <option value="50">50 por pagina</option>
        </select>
      </nav>
    </div>
  );
}
