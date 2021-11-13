

import styles from "./styles/Loading.module.scss";

function Loading() {
  return (
    <div className={styles.loadersContainer}>
      <div className={styles.container}>
        <div className={styles.circleloader}></div>
      </div>
    </div>
  );
}

export default Loading;

