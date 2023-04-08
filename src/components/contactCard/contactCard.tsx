import React from 'react'
import styles from './contactCard.module.css'
import { AiFillPhone } from "react-icons/ai";
import { AiFillMail } from "react-icons/ai";
const ContactCard = ({name,designation,email,phone}) => {
  return (
    <div className={styles.card}>
    <div className={styles.card_info}>
    <div className={styles.card_avatar}></div>
    <div className={styles.card_title}>{name}</div>
    <div className={styles.card_subtitle}>{designation}</div>
    </div>
    <ul className={styles.card_social}>
    <a href={"tel:"+phone}><li className={styles.card_social__item}>
    <AiFillPhone />
    </li></a>
    <a href={"mailto:"+email}><li className={styles.card_social__item}>
    <AiFillMail />
  </li></a>
</ul>
</div>
  )
}

export default ContactCard
