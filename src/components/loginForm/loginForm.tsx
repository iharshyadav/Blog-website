"use client";
import { loginhandler } from "@/lib/action";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import Link from "next/link";

const LoginForm = () => {
    const [state, formAction] = useFormState(loginhandler, undefined);
  return (
    <form className={styles.form} action={formAction}>
    <input type="text" placeholder="username" name="username" />
    <input type="password" placeholder="password" name="password" />
    <button>Login</button>
    {/* {state?.error ? <p>{state.error.message}</p> : null} */}
    <Link href="/register">
      {"Don't have an account?"} <b>Register</b>
    </Link>
  </form>
  )
}

export default LoginForm