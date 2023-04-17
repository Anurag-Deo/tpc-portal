import React, { useState, useEffect } from "react";
import styles from "./StudentAppliedCard.module.css";
const StudentAppliedCard = (props: {
  studentRoll: String,
  name: String,
  email: String,
  department: String,
  cpi: Number,
  skills: String,
  role: String,
  cv: string,
  image: string,
  callfunction: () => void
}) => {
  const [companyId, setCompanyId] = useState("");
  useEffect(() => {
    const compDetails = JSON.parse(localStorage.getItem("profile"));
    setCompanyId(compDetails.id);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await fetch("/api/company/approvestudent", {
      method: "POST",
      body: JSON.stringify({
        company_id: companyId,
        role: props.role,
        student_id: props.studentRoll,
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
    props.callfunction()
  };

  return (
    <div className={styles.card}>
      <div className={styles.card_border_top}></div>
      <div className={styles.img}><img src={props.image} alt={props.name} /></div>
      <span> {props.name}</span>
      <p className={styles.job}> {props.email}</p>
      <p className={styles.job}>
        <strong>DEPARTMENT:</strong> {props.department}
      </p>
      <p className={styles.job}>
        <strong>CPI:</strong> {props.cpi.toFixed(2)}
      </p>
      <p className={styles.job}>
        <strong>SKILLS:</strong> {props.skills}
      </p>
      <p className={styles.job}>
        <strong>ROLE APPLIED: </strong> {props.role}
      </p>
      <p className={styles.job}>
        <strong>CV: </strong><a href={props.cv}>Click to view CV</a>
      </p>
      <button onClick={handleSubmit}> Recruit</button>
    </div>
  );
};

export default StudentAppliedCard;
