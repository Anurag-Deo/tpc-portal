import React, { useState, useEffect } from "react";
import Navbar from "@/components/adminNavbar";
import Table from "@/components/table";
import { useRouter } from "next/router";

const ColumnFilter = ({ column: { filterValue, setFilter } }) => {
    const router = useRouter();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
          router.push("/admin/signin");
        } 
        }, []);
  return (
    <div className="bg-transparent dark:bg-gray-900">
      <label htmlFor="table-search" className="sr-only">
        Search
      </label>
      <div className="relative mt-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          value={filterValue || ""}
          onChange={(e) => {
            setFilter(e.target.value || undefined);
          }}
          type="text"
          id="table-search"
          className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-60 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
        />
      </div>
    </div>
  );
};

const companyColumns = [
  { Header: "Company Name", accessor: "name", Filter: ColumnFilter },
  { Header: "Job Offered", accessor: "role_offered", Filter: ColumnFilter },
  { Header: "CTC", accessor: "ctc_lakhs", Filter: ColumnFilter },
  { Header: "CPI", accessor: "eligibility", Filter: ColumnFilter },
  { Header: "Location", accessor: "location", Filter: ColumnFilter },
];
const alumniColumns = [
  { Header: "Name", accessor: "name", Filter: ColumnFilter },
  { Header: "Email", accessor: "email", Filter: ColumnFilter },
  { Header: "Degignation", accessor: "role_applied", Filter: ColumnFilter },
  { Header: "Company", accessor: "company", Filter: ColumnFilter },
  { Header: "CTC", accessor: "ctc", Filter: ColumnFilter },
];
const studentColumns = [
  { Header: "First name", accessor: "first_name", Filter: ColumnFilter },
  { Header: "Last name", accessor: "last_name", Filter: ColumnFilter },
  { Header: "Roll No", accessor: "rollno", Filter: ColumnFilter },
  { Header: "CPI", accessor: "gpa", Filter: ColumnFilter },
  { Header: "Department", accessor: "department", Filter: ColumnFilter },
  { Header: "Skills", accessor: "roles", Filter: ColumnFilter },
];

const stats = () => {
  const [company, setCompany] = useState();
  const [alumni, setAlumni] = useState();
  const [student, setStudent] = useState()
  const [currentData, setCurrentData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postperPage, setPostperPage] = useState(5);
  const [table, setTable] = useState("Company");
  const fetchData = async () => {
    const response = await fetch("/api/alljobs");
    const data = await response.json();
    setCompany(data);
    // console.log(data);
  };
  const fetchAlumni = async () => {
    const response = await fetch("/api/alumni/allalumns");
    const data = await response.json();
    setAlumni(data);
    // setTableData(data);
    // console.log(data);
  };
  const fetchStudent = async () => {
    const response = await fetch("/api/student/allstudents");
    const data = await response.json();
    setStudent(data);
    // setTableData(data);
    console.log(data);
  };
  useEffect(() => {
    fetchData();
    fetchAlumni();
    fetchStudent();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 sm:px-8 h-[75vh] flex items-center align-middle">
        <div className="table_container">
          <h2 className="text-3xl font-semibold leading-tight my-5">
            Get Data about the Students
          </h2>
          {student && <Table data={student} columns={studentColumns} />}
        </div>
      </div>
      <div className="container mx-auto my-auto px-4 sm:px-8 h-[75vh] flex items-center align-middle">
        <div className="table_container">
          <h2 className="text-3xl font-semibold leading-tight my-5">
            Get Data about the Companies
          </h2>
          {company && <Table data={company} columns={companyColumns} />}
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-8 h-[75vh] flex items-center align-middle">
        <div className="table_container">
          <h2 className="text-3xl font-semibold leading-tight my-5">
            Get Data about the Alumns
          </h2>
          {alumni && <Table data={alumni} columns={alumniColumns} />}
        </div>
      </div>
    </>
  );
};

export default stats;
