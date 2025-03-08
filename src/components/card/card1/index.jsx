import React from "react";
import styles from "./index.module.css";

const Card1 = () => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <p className={styles.heading}>Card Hover Effect</p>
        <p className={styles.para}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi
          laboriosam at voluptas minus culpa deserunt delectus sapiente
          inventore pariatur.
        </p>
        <button className={styles.btn}>Read more</button>
      </div>
    </div>
  );
};

export default Card1;
