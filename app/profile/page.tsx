import { currentUser } from '@clerk/nextjs';


const MyProfile = async() => {
  const user = await currentUser(); 
  console.log(user)
  return (
    <div>
      <p>hello</p>
      {user?.firstName}</div>
  )
}

export default MyProfile