import Links from "./link/link"
import styles from "./navbar.module.css"

const Navbar = () => {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.logo}>LOGO</h1>
        <div>
          <Links />
        </div>
      </div>
    </>
  );
}

export default Navbar