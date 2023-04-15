import React, { useState, useEffect } from "react";
import styles from "./StudentAppliedCard.module.css";
const StudentAppliedCard = ({
  studentRoll,
  name,
  email,
  department,
  cpi,
  skills,
  role,
  callfunction
}) => {
  const [companyId, setCompanyId] = useState("");
  useEffect(() => {
    const compDetails = JSON.parse(localStorage.getItem("profile"));
    setCompanyId(compDetails.id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/company/approvestudent", {
      method: "POST",
      body: JSON.stringify({
        company_id: companyId,
        role_offered: role,
        student_id: studentRoll,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.error) {
      console.log(data.error);
    } else {
      console.log("Success");
    }
    callfunction()
  };

  return (
    <div className={styles.card}>
      <div className={styles.card_border_top}></div>
      <div className={styles.img}></div>
      <span> {name}</span>
      <p className={styles.job}> {email}</p>
      <p className={styles.job}>
        <strong>DEPARTMENT:</strong> {department}
      </p>
      <p className={styles.job}>
        <strong>CPI:</strong> {cpi}
      </p>
      <p className={styles.job}>
        <strong>SKILLS:</strong> {skills}
      </p>
      <p className={styles.job}>
        <strong>ROLE APPLIED:</strong> {role}
      </p>
      <button onClick={handleSubmit}> Recruit</button>
    </div>
  );
};

export default StudentAppliedCard;
