import { PostCards } from "@/components/postCards/postCards"
import styles from "./blog.module.css"
import { getPosts } from "@/lib/data";

// FETCH DATA WITH AN API 
// const getData = async ()=>{
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts" ,{cache:"no-store"})

//   if(!res.ok){
//     throw new Error("Something went wrong")
//   }

//   return res.json();
// }

const blog = async () => {

  // FETCH DATA WITH AN API 
// const posts = await getData();

// FETCH DATA WITHOUT AN API 
const posts = await getPosts();

  return (
    <div className={styles.container}>
      {posts.map((post)=>(
      <div className={styles.post} key={post.id}>
        <PostCards post={post} />
      </div>
      ))}
      
    </div>
  );
}

export default blog