import Image from "next/image"
import styles from "./post.module.css"
import PostUser from "@/components/postUser/postUser";
import { Suspense } from "react";
import { getPost } from "@/lib/data";

// FETCH DATA WITH AN API 

// const getData = async (slug)=>{
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`)

//   if(!res.ok){
//     throw new Error ("something went wrong")
//   }

//   return res.json();
// }

const post = async ({params}) => {

  const {slug} = params;

// FETCH DATA WITH AN API 
  // const data = await getData(slug);
  
  // FETCH DATA WITHOUT AN API 
  const data = await getPost(slug);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src="https://images.pexels.com/photos/5386829/pexels-photo-5386829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          fill
        />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{data?.title}</h1>
        <div className={styles.detail}>
          <Image
            className={styles.avatar}
            src="https://images.pexels.com/photos/5386829/pexels-photo-5386829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            width={50}
            height={50}
          />
          {data && <Suspense fallback={<div>Loading...</div>}>
            <PostUser userId={data.userId}/>
          </Suspense>}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>01.01.2024</span>
          </div>
        </div>
        <div className={styles.content}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure velit
          quisquam natus blanditiis? Autem, dolore consectetur sunt quod tem"
        </div>
      </div>
    </div>
  );
}

export default post