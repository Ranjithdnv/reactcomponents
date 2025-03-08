import React from "react";
import styles from "./index.module.css";

const Card7 = () => {
  return (
    <div>
      <div className={styles.parent}>
        <div className={styles.card}>
          {" "}
          <div className={styles.glass}></div>
          <div className={styles.content}>
            <span className={styles.title}>UIVERSE (3D UI)</span>
            <span className={styles.text}>
              Create, share, and use beautiful custom elements made with CSS
            </span>
          </div>
          <div className={styles.bottom}>
            <div className={styles["view-more"]}>
              <button className={styles["view-more-button"]}>click</button>
            </div>
            <div className={styles["view-more"]}>
              <button className={styles["view-more-button"]}>View more</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card7;
