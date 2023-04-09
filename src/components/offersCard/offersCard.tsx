import React from "react";
import styles from "./offerCard.module.css";
const OfferCard = ({name,role,amount,location,skills,hide=false}) => {
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
        <button style={hide ? {display: 'none'}: {display: 'block'}} type="button" className={styles.action}>
          Apply Now{" "}
        </button>
      </div>
    </div>
  );
};

export default OfferCard;
