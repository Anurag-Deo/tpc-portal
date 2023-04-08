import React from "react";
import styles from "./offerCard.module.css";
const OfferCard = ({name,role,amount,location,skills}) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>{name}</div>
      <div className={styles.info}>
        <p className={styles.title}>Role: {role}</p>
        <p style={{textAlign: 'start'}}>
          Package Range: {amount} LPA <br />
          Location: {location} <br />
          Skills Required: {skills} <br />
        </p>
      </div>
      <div className={styles.footer}>
        <p className={styles.tag}> </p>
        <button type="button" className={styles.action}>
          Apply Now{" "}
        </button>
      </div>
    </div>
  );
};

export default OfferCard;
