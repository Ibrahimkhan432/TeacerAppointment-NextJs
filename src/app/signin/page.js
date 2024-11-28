import { Button } from "@/components/ui/button";
import { auth, signIn } from "../../../auth";
import { redirect } from "next/navigation";

export default async function signin() {
  const session = await auth();
  if(session) redirect('/')
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <Button variant={'outline'}>Signin with Google</Button>
    </form>
  )
} 
