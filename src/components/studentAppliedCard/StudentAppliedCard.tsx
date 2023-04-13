import React from "react";
import styles from "./StudentAppliedCard.module.css";
const StudentAppliedCard = ({name,email,department,cpi,skills}) => {
  return (
    <div className={styles.card}>
      <div className={styles.card_border_top}></div>
      <div className={styles.img}></div>
      <span> {name}</span>
      <p className={styles.job}> {email}</p>
      <p className={styles.job}><strong>DEPARTMENT:</strong> {department}</p>
      <p className={styles.job}><strong>CPI:</strong> {cpi}</p>
      <p className={styles.job}><strong>SKILLS:</strong> {skills}</p>
      <button> Recruit</button>
    </div>
  );
};

export default StudentAppliedCard;
