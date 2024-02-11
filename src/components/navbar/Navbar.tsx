import { auth } from "@/lib/auth";
import styles from "./navbar.module.css"
import Links from "./link/Link";


const Navbar = async () => {

  const session = await auth();
  // console.log(session)
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.logo}>LOGO</h1>
        <div>
          <Links session={session} />
        </div>
      </div>
    </>
  );
}

export default Navbar