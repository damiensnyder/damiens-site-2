import general from "../../styles/general.module.css";
import styles from "../../styles/animate.module.css";
import React, {ReactElement} from "react";
import {useRouter} from "next/router";
import NormalHead from "../../components/NormalHead";

export default function AnimatePage(): ReactElement {
  const router = useRouter();
  const {text} = router.query;
  return (
    <div className={general.pageContainer}>
      <NormalHead title={"animated message"} />
      <div className={styles.textContainer}>
        <p className={styles.spinnyText}>
          <span className={styles.rainbow}>{text}</span>
        </p>
      </div>
      <div className={styles.textContainer}>
        <p className={styles.spinnyText + " " +  styles.backSpinnyText}>
          <span className={styles.backRainbow}>{text}</span>
        </p>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  return {props: {}};
}

