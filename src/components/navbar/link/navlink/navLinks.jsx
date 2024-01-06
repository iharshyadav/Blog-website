"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import styles from "./navLink.module.css"

const Navlink = ({items}) => {
  const pathName = usePathname()
  return (
    <Link className={`${styles.container} ${pathName===items.path && styles.active}`} href={items.path}>{items.name}</Link>
  )
}

export default Navlink