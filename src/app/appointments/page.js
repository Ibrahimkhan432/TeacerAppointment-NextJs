import { auth } from "../../../auth";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import AppointmentFilterTabs from "@/components/Tabs/Tabs";
import TeacherAppointmentCard from "@/components/TeacherAppointmentCard/import TeacherAppointmentCard from \"@/components/TeacherAppointmentCard";
import StudentAppointmentCard from "@/components/StudentAppointmentCard/StudentAppointmentCard";
import { getAppointments } from "@/action/appointment";

dayjs.extend(relativeTime);

export default async function Appointments({ searchParams }) {
    const session = await auth();
    const { status } = searchParams;

    console.log("session=>", session);

    const { appointments, stats } = await getAppointments(
        session.user.role == "teacher" ? "teacher" : "user",
        session.user._id,
        status
    );
    const isTeacher = session.user.role == "teacher";
    return (
        <div className="container mx-auto">
            <h1 className="font-bold text-2xl mt-10">
                {isTeacher ? "Student Appointments" : "Your Teachers Appointments"}
            </h1>

            <AppointmentFilterTabs status={status} />

            <div className="flex gap-4">
                <div className="shadow flex-grow p-3 rounded border">
                    <h1 className="font font-bold text-2xl">Pending : {stats.pending}</h1>
                </div>
                <div className="shadow flex-grow p-3 rounded border">
                    <h1 className="font font-bold text-2xl">
                        Accepted : {stats.accepted}
                    </h1>
                </div>
                <div className="shadow flex-grow p-3 rounded border">
                    <h1 className="font font-bold text-2xl">
                        Cancelled : {stats.cancelled}
                    </h1>
                </div>
            </div>
            <div className="my-10 grid grid-cols-3 gap-4">
                {appointments?.map((appointment) =>
                    isTeacher ? (
                        <TeacherAppointmentCard
                            key={appointment._id}
                            appointment={appointment}
                        />
                    ) : (
                        <StudentAppointmentCard
                            key={appointment._id}
                            appointment={appointment}
                        />
                    )
                )}
            </div>
        </div>
    );
}