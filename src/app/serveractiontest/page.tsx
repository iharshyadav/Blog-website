import { addPost, deletePost } from "@/lib/action"

 const ServerActiontestPage = () => {

  
  return (
    <>
      <form action={addPost} className="text-black">
        <input type="text" placeholder="title" name="title"/>
        <input type="text" placeholder="desc" name="desc"/>
        <input type="text" placeholder="slug" name="slug"/>
        <input type="text" placeholder="userId" name="userId"/>
        <button className="bg-white">Create</button>
      </form>

      <form action={deletePost}>
        <input type="text" placeholder="postId" name="id" />
        <button>Delete</button>
      </form>
    </>
  )
}

export default ServerActiontestPage 