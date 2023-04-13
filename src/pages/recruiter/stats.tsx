import React, { useState, useEffect } from "react";
import Navbar from "@/components/studentNavbar";

import Table from "../../components/table/Table";
import tableData1 from "../../components/table/tableData1.json";
const stats = () => {
  const [keyword, setKeyword] = useState("");
  const [tableData, setTableData] = useState(tableData1);
  const [currentData, setCurrentData] = useState(tableData1);
  const [currentPage, setCurrentPage] = useState(1);
  const [postperPage, setPostperPage] = useState(5);
  useEffect(() => {
    const indexOfLastPost = currentPage * postperPage;
    const indexOfFirstPost = indexOfLastPost - postperPage;
    if (keyword !== "") {
      const newTableData = tableData1.filter((data) => {
        return Object.values(data)
          .join(" ")
          .toLowerCase()
          .includes(keyword.toLowerCase());
      });
      setTableData(newTableData.slice(indexOfFirstPost, indexOfLastPost));
    } else {
      setTableData(tableData1.slice(indexOfFirstPost, indexOfLastPost));
    }
  }, [keyword, postperPage, currentPage]);

  // useEffect(() => {
  //   const currentPosts = tableData.slice(indexOfFirstPost, indexOfLastPost)
  //   setCurrentData(currentPosts)

  // }, [postperPage,currentPage,keyword])

  // const handleSearch = (e) => {
  //   const searchWord =

  //   e.preventDefault()
  // }

  const columns = [
    { label: "Name", accessor: "full_name", sortable: true },
    { label: "email", accessor: "degignation", sortable: true },
    { label: "Mobile No.", accessor: "company", sortable: true },
    { label: "CPI", accessor: "age", sortable: true },
    { label: "Branch", accessor: "branch", sortable: true },
  ];
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 sm:px-8">
        <div className="table_container">
          <h2 className="text-2xl font-semibold leading-tight my-5">
            Get Data as per your need
          </h2>
          <div className="my-2 flex sm:flex-row flex-col justify-between">
            <div className="flex flex-row mb-1 sm:mb-0 gap-x-5">
              <div className="relative">
                <select
                  value={postperPage}
                  onChange={(e) => setPostperPage(e.target.value)}
                  className="appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="relative">
                <select className="appearance-none h-full rounded-r border  block  w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                  <option>Student</option>
                  <option>Placed Student</option>
                  <option>Company</option>
                  <option>alumni</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="block relative w-[50%]">
              <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current text-gray-500"
                >
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                </svg>
              </span>
              <input
                placeholder="Search"
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  console.log(e.target.value);
                  // console.log('tableData', tableData)
                }}
                className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              />
            </div>
          </div>
          <Table
            caption=""
            key={tableData}
            data={tableData}
            columns={columns}
          />
          <br />
        </div>
        <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
          <span className="text-xs xs:text-sm text-gray-900">
            Showing 1 to 4 of 50 Entries
          </span>
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              onClick={() => {
                setCurrentPage(currentPage - 1);
                console.log("currentPage", currentPage);
              }}
              className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
            >
              Prev
            </button>
            <button
              onClick={() => {
                setCurrentPage(currentPage + 1);
                console.log("currentPage", currentPage);
              }}
              className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default stats;
