import _ from "lodash";

export default function Pagination({
  items,
  currentPage,
  onChangePage,
  onChangePageSize,
  pageSize = 10,
}) {
  const pageCount = items / pageSize;
  const pages = _.range(1, pageCount + 1);

  const itemsCountInit =
    currentPage == 1 ? 1 : pageSize * currentPage - pageSize + 1;
  const itemsCountEnd =
    currentPage * pageSize > items ? items : currentPage * pageSize;

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
    <nav className="flex flex-col gap-2 justify-center items-center pt-4">
      <ul className="inline-flex items-center -space-x-px">
        <li onClick={prevPage}>
          <a
            href="#"
            className="block py-2 px-2 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-400 hover:bg-gray-100 hover:border-red-800 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Anterior</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className="w-4 h-4 fill-red-600"
            >
              <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"></path>
            </svg>
          </a>
        </li>
        {pages.map((page) => {
          return (
            <li key={page}>
              <a
                className={`block py-[6px] px-3 cursor-pointer leading-tight ${
                  page === currentPage
                    ? "text-red-600 bg-red-50 border border-red-300 hover:bg-red-100 hover:text-red-700 font-medium"
                    : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800  dark:text-gray-400"
                } dark:border-gray-700 dark:bg-gray-700 dark:text-white `}
                onClick={() => onChangePage(page)}
              >
                {page}
              </a>
            </li>
          );
        })}
        <li onClick={nextPage}>
          <a
            href="#"
            className="block py-2 px-2 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-400 hover:bg-red-100 hover:border-red-800 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Siguiente</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 fill-red-600"
              viewBox="0 0 20 20"
            >
              <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
}
