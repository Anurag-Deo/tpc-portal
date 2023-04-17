import React, { useState, useEffect } from "react";
import styles from "./offerCard.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentAppliedCard = (props: {
  companyId: String;
  name: String;
  cpi: Number;
  branches: String;
  role: String;
  package: String;
  location: String;
  hide: Boolean;
}) => {
  const [student, setStudent] = useState("");
  // const [role, setRole] = useState('')
  const [error, setError] = useState("");
  let data = {};
  useEffect(() => {
    data = JSON.parse(localStorage.getItem("profile"));
    setStudent(data.rollno);
  }, []);

  const handleSubmit = async (e) => {
    // console.log("Submit");
    e.preventDefault();
    const res = await fetch("/api/student/apply", {
      method: "POST",
      body: JSON.stringify({
        company_id: props.companyId,
        student_id: student,
        role_applied: props.role,
        ctc_lakhs: props.package
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.error) {
      setError(data.error);
      console.log(data.error);
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
      console.log("Success");
      toast.success("Successfully applied", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className={styles.card}>
        <div className={styles.card_border_top}></div>
        <div className={styles.img}></div>
        <span> {props.name}</span>
        <p className={styles.job}>
          <strong>ROLE:</strong> {props.role}
        </p>
        <p className={styles.job}>
          <strong>PACKAGE:</strong> {props.package}
        </p>
        <p className={styles.job}>
          <strong>MIN. CPI:</strong> {props.cpi}
        </p>
        <p className={styles.job}>
          <strong>LOCATION:</strong> {props.location}
        </p>
        <p className={styles.job}>
          <strong>BRANCHES ALLOWED:</strong> {props.branches}
        </p>
        <button
          style={props.hide ? { display: "none" } : { display: "block" }}
          onClick={handleSubmit}
        >
          {" "}
          Apply Now
        </button>
      </div>
    </>
  );
};

export default StudentAppliedCard;
