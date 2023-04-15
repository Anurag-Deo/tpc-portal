import React, { useState, useEffect } from "react";
import styles from "./offerCard.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OfferCard = ({
  companyId,
  name,
  role,
  amount,
  location,
  branches,
  cpi,
  hide = false,
}) => {
  // const [company, setCompany] = useState('')
  const [student, setStudent] = useState("");
  // const [role, setRole] = useState('')
  const [error, setError] = useState("");
  let data = {};
  useEffect(() => {
    data = JSON.parse(localStorage.getItem("profile"));
    setStudent(data.rollno);
    
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/student/apply", {
      method: "POST",
      body: JSON.stringify({
        company_id: companyId,
        student_id: student,
        role_applied: role,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.error) {
      setError(data.error);
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
        <div className={styles.header}>{name}</div>
        <div className={styles.info}>
          <p className={styles.title}>Role: {role}</p>
          <p style={{ textAlign: "start" }}>
            Package Range: {amount} LPA <br />
            Location: {location} <br />
            Eligible Branches: {branches} <br />
            Min. CPI: {cpi} <br />
          </p>
        </div>
        <div className={styles.footer}>
          <p className={styles.tag}> </p>
          <button
            onClick={handleSubmit}
            style={hide ? { display: "none" } : { display: "block" }}
            type="button"
            className={styles.action}
          >
            Apply Now{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default OfferCard;
