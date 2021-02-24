import general from "../../styles/general.module.css";
import styles from "../../styles/animate.module.css";
import React, {ReactElement} from "react";
import {useRouter} from "next/router";
import NormalHead from "../../components/NormalHead";

function AnimatePage(): ReactElement {
  const router = useRouter();
  const {text} = router.query;
  return (
      <div className={general.pageContainer}>
        <NormalHead title={"" + text} />
        <div className={styles.textContainer}>
          <p className={styles.spinnyText}>
            <span className={styles.rainbow}>{text}</span>
          </p>
        </div>
        <div className={styles.textContainer}>
          <p className={styles.spinnyText2}>
            <span className={styles.rainbow2}>{text}</span>
          </p>
        </div>
      </div>
  );
}

export default AnimatePage

