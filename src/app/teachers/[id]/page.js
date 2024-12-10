import {
  HomeIcon,
  ClockIcon,
  UserIcon as GenderMaleIcon,
  GraduationCapIcon,
  StethoscopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DatePicker } from "@/components/DatePicker";
import { auth } from "../../../../auth";
import { getSingleRequest } from "@/action/requests";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function TeacherDetail({ params }) {
  const session = await auth();
  const { requests } = await getSingleRequest(params.id);
  const teacherInfo = requests;
  console.log("teacherInfo>>", teacherInfo);


  return (
    // <div><h1>kuch bhi</h1></div>
    <div className="min-h-screen bg-background">
      <div className="container py-10 mx-auto">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage
                src={teacherInfo.user.picture}
                alt={`${teacherInfo.user.firstName} ${teacherInfo.user.lastName}`}
              />
              <AvatarFallback>
                {teacherInfo.user.firstName[0]}
                {teacherInfo?.user?.lastName?.[0] || ""}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-3xl font-bold">{`Dr. ${teacherInfo.user.firstName
                } ${teacherInfo?.user?.lastName || ""}`}</CardTitle>
              <p className="text-muted-foreground">
                {teacherInfo.specialization} Specialist
              </p>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <InfoItem
                icon={<GraduationCapIcon />}
                label="Degree"
                value={teacherInfo.degree}
              />
              <InfoItem
                icon={<StethoscopeIcon />}
                label="Experience"
                value={teacherInfo.experience}
              />
              <InfoItem
                icon={<GenderMaleIcon />}
                label="Gender"
                value={teacherInfo.gender}
              />
              <InfoItem
                icon={<ClockIcon />}
                label="Appointment Time"
                value={teacherInfo.appointmentTime}
              />
              <InfoItem
                icon={<HomeIcon />}
                label="Fees"
                value={`$${teacherInfo.fees}`}
              />
              <InfoItem
                icon={<PhoneIcon />}
                label="Contact"
                value={teacherInfo.number}
              />
              <InfoItem
                icon={<MapPinIcon />}
                label="Address"
                value={teacherInfo.address}
              />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Bio</h3>
              <p className="text-muted-foreground">{teacherInfo.bio}</p>
            </div>
            <div className="space-y-4">
              <h1 className="font-bold">Book your Appointment Date</h1>
              <DatePicker session={session} request={params.id} />
            </div>

            <Link href={""}>
              <Button className="w-full">Book Appointment</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}