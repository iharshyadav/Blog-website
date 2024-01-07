import { PostCards } from "@/components/postCards/postCards"
import styles from "./blog.module.css"

const getData = async ()=>{
  const res = await fetch("https://jsonplaceholder.typicode.com/posts" ,{cache:"no-store"})

  if(!res.ok){
    throw new Error("Something went wrong")
  }

  return res.json();
}

const blog = async () => {

const posts = await getData();

  return (
    <div className={styles.container}>

      {posts.map((data)=>(
      <div className={styles.post} key={data.id}>
        <PostCards data={data} />
      </div>
      ))}
      
    </div>
  );
}

export default blog