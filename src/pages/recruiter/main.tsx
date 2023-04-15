import React, { useEffect, useState } from "react";
import StudentAppliedCard from "@/components/studentAppliedCard/StudentAppliedCard";
import Navbar from "@/components/recruiterNavbar";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const main = () => {
  const [companyId, setCompanyId] = useState("");
  const [data, setData] = useState();
  const router = useRouter();

  const fetchStudent = async () => {
    const res = await fetch("/api/company/applications", {
      method: "POST",
      body: JSON.stringify({
        company_id: companyId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.error) {
      // console.log(data.error);
      toast.error(data.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      // router.push("/stud/main");
      // console.log(data.data);
      console.log(data);
      setData(data);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/company/signin");
    }
    // setCompanyId(JSON.parse(localStorage.getItem("profile")).company_id)
    const compDetails = JSON.parse(localStorage.getItem("profile"));
    setCompanyId(compDetails.id);
  }, []);

  useEffect(() => {
    fetchStudent();
  }, [companyId]);

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "50px" }}>
        <h2 className="text-5xl font-semibold text-center my-7">
          Hello, Welcome to the TPC IITP Company's Portal
        </h2>
        <h3 className="text-4xl font-semibold text-center my-7">
          Here is the list of studnets who have applied to your company
        </h3>
        <div className="flex flex-col lg:flex-row justify-center items-center my-10 gap-20 flex-wrap">
          {data ? console.log(data) : ""}
          {data &&
            data.map((item) => {
              return (
                <StudentAppliedCard
                  studentRoll={item.rollno}
                  name={item.first_name + " " + item.last_name}
                  cpi={item.gpa}
                  department={item.department}
                  email={item.email}
                  skills={item.roles}
                  role={item.role_applied}
                  callfunction = {fetchStudent()}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default main;
