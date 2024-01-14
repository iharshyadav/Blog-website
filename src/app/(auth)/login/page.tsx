import LoginForm from "@/components/loginForm/loginForm";
import { handleGithubSession, handleGoogleSession } from "@/lib/action"
import { auth } from "@/lib/auth"
import styles from "./login.module.css";

const login = async() => {
 
  const session = await auth();
  console.log(session);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
      <LoginForm />
        <form action={handleGithubSession}>
          <button className={styles.github}>github</button>
        </form>
        <form action={handleGoogleSession}>
          <button className={styles.github}>google</button>
        </form>
      </div>
    </div>
  );
}

export default login