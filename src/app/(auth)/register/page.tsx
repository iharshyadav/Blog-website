import { registerUser } from "@/lib/action";
import Image from "next/image";
import Link from "next/link";
import styles from "./register.module.css";
import RegisterForm from "@/components/registerForm/registerForm"

const register = () => {
  return (
    <div className={styles.container}>
    <div className={styles.wrapper}>
      <RegisterForm/>
    </div>
  </div>
  );
}

export default register