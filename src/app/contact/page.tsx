// "use client"
import Image from "next/image";
import styles from "./contact.module.css";
import dynamic from "next/dynamic";

// const HydrationtestSSR=dynamic(()=>import("@/components/hydrationtest"),{ssr:false});

// export const metadata = {
//   title: "Contact Page",
//   description: "Contact description",
// };


const contact = () => {
  
  // const a=Math.random();
  
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/contact.png" alt="" fill className={styles.img} />
      </div>
      <div className={styles.formContainer}>
        {/* <div suppressHydrationWarning>
          {a}
        </div> */}
        {/* <HydrationtestSSR/> */}
        <form action="" className={styles.form}>
          <input type="text" placeholder="Name and Surname" />
          <input type="text" placeholder="Email Address" />
          <input type="text" placeholder="Phone Number (Optional)" />
          <textarea
            name=""
            id=""
            cols="20"
            rows="6"
            placeholder="Message"
          ></textarea>
          <button>Send</button>
        </form>
      </div>
    </div>
  )
}

export default contact