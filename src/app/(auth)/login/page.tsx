import { handleGithubSession, handleGoogleSession } from "@/lib/action"
import { auth } from "@/lib/auth"

const login = async() => {
 
  const session = await auth();
  console.log(session);

  return (
    <div>
      <form action={handleGithubSession}>
        <button className="bg-white text-black p-2 rounded-lg">github</button>
      </form>
      <form action={handleGoogleSession}>
        <button className="bg-white text-black p-2 rounded-lg">google</button>
      </form>
    </div>
  )
}

export default login