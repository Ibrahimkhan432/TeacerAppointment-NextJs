import { redirect } from "next/navigation"
import { auth } from "../../../../auth"
import { getRequest } from "@/action/requests"
import TeacherRequests from "@/components/RequestSection";
export default async function request() {
    const session = await auth()
    if (!session && session?.user?.role != 'admin') redirect('/')

    const { requests } = await getRequest();
    // console.log("get request>>>", requests);

    return (
        <div className="container mx-auto text-center">
            <h1 className="font-bold text-4xl">{`Teacher's`} request </h1>

            <TeacherRequests requests={requests} />
        </div>
    );
}