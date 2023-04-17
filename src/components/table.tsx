import { table } from "console";
import React, { useMemo, useState } from "react";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";
// import Table from './table'
const ColumnFilter = ({ column: { filterValue, setFilter } }) => {
  return (
    <div className="bg-transparent dark:bg-gray-900">
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input value={filterValue || ""} onChange={(e) => {
        setFilter(e.target.value || undefined);
      }} type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-60 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."/>
        </div>
    </div>
  );
};

// const data = [
//   {
//     company: "ABC Inc.",
//     job: "Software Engineer",
//     ctc: 12,
//     cpi: 8.0,
//     location: "Bangalore",
//   },
//   {
//     company: "XYZ Corp.",
//     job: "Data Analyst",
//     ctc: 10,
//     cpi: 7.5,
//     location: "Mumbai",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   {
//     company: "PQR Ltd.",
//     job: "UI/UX Designer",
//     ctc: 8,
//     cpi: 7.0,
//     location: "Delhi",
//   },
//   // add more objects as needed
// ];
// const columns = [
//   { Header: "Company Name", accessor: "company", Filter: ColumnFilter },
//   { Header: "Job Offered", accessor: "job", Filter: ColumnFilter },
//   { Header: "CTC", accessor: "ctc", Filter: ColumnFilter },
//   { Header: "CPI", accessor: "cpi", Filter: ColumnFilter },
//   { Header: "Location", accessor: "location", Filter: ColumnFilter },
// ];

function Table({ columns, data }) {


  const [pageSize, setPageSize] = useState(5);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    state: { pageIndex, pageSize: pageSizeState },
    previousPage,
    setPageSize: setPageSizeState,
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 5 } }, 
    useFilters,
    useSortBy,
    usePagination
  );

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()} className="min-w-full leading-normal">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? " ↓" : " ↑") : ""}
                  </span>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-gray-900 whitespace-no-wrap"
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex flex-row items-center justify-around my-5">
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {pageIndex + 1}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {pageOptions.length}
            </span>{" "}
            Entries
          </span>
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Prev
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
              <svg
                aria-hidden="true"
                className="w-5 h-5 ml-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <span>
          Go to page:{" "}
          <input
            type="number"
            className="w-10 h-10 px-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "50px" }}
          />
        </span>
        <select
          value={pageSize}
          className="w-28 h-10 px-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          onChange={(e) => {
            setPageSizeState(Number(e.target.value));
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 15, 20].map((pageSize) => (
            <option
              key={pageSize}
              value={pageSize}
              className="bg-indigo-200 opacity-50"
            >
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default Table;
