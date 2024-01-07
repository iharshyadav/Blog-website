import Image from "next/image"
import styles from "./postCards.module.css"
import Link from "next/link"


export const PostCards = ({data}) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.imgContainer}>
          <Image src="https://images.pexels.com/photos/5386829/pexels-photo-5386829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" fill className={styles.img} />
        </div>
        <span className={styles.date}>01.01.2024</span>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.desc}>{data.body}</p>
        <Link className={styles.link} href={`/blog/${data.id}`}>READ MORE</Link>
      </div>
    </div>
  );
}
