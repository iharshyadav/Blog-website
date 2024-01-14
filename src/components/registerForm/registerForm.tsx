"use client"
import Link from "next/link"
import styles from "./registerForm.module.css"
import { registerUser } from "@/lib/action"
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RegisterForm = () => {

    const [state, formAction] = useFormState(registerUser, undefined);

    const router = useRouter();

    useEffect(()=>{
        state?.success && router.push("/login")
    },[state?.success,router])


  return (
    <form className={styles.form} action={formAction}>
    <input type="text" placeholder="username" name="username" />
    <input type="email" placeholder="email" name="email" />
    <input type="password" placeholder="password" name="password" />
    <input
      type="password"
      placeholder="password again"
      name="repeatPassword"
    />
    <button>Register</button>
    <div className="text-red-500">
    {state?.error}
    </div>
    <Link href="/login">
      Have an account? <b>Login</b>
    </Link>
  </form>
  )
}

export default RegisterForm