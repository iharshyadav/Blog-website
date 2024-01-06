import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Harsh</div>
      <div className={styles.text}>
        Harsh creative thoughts agency © All rights reserved.
      </div>
    </div>
  );
}

export default Footer