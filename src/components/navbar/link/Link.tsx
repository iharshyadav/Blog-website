"use client"
import Link from "next/link"
import styles from "./nav.module.css"
import NavLink from "./navlink/navLinks"
import { useState } from "react"
import Image from "next/image"
import { handlelogout } from "@/lib/action"

const links = [
    {
        name:"Home",
        path:"/"
    },
    {
        name:"About",
        path:"/about"
    },
    {
        name:"Contact",
        path:"/contact"
    },
    {
        name:"Blog",
        path:"/blog"
    },
    // {
    //     name:"SignUp",
    //     path:"/register"
    // },
]

const Links = ({session}:any) => {

    const [popUp, setPopup] = useState(false)
    // const session =true;
    // const isAdmin = true;

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink key={link.name} items={link} />
        ))}
        {session?.user ? (
          <>
            {session.user?.isAdmin && <NavLink items={{ name: "Admin", path: "/admin" }} />}
            <form action={handlelogout}>
              <button>Logout</button>
            </form>
          </>
        ) : (
          <NavLink items={{ name: "Login", path: "/login" }} />
        )}
      </div>
      {/* <button className={styles.menuButton} onClick={()=>setPopup((prev)=>!prev)}>Menubutton</button> */}
      <Image src="/menu.png" className={styles.menuButton} alt="" width={25} height={25} onClick={()=>setPopup((prev)=>!prev)}/>
      {popUp && <div className={styles.mobileLinks}>
        {links.map((link)=>(
            <NavLink items={link} key={link.name}/>
        ))}
      </div>
      }
    </div>
  );
}

export default Links