"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  EyeIcon,
  MapPin,
  Phone,
  Clock,
  Briefcase,
  GraduationCap,
  Stethoscope,
} from "lucide-react";

export default function TeacherDetailSheet({ teacher }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <EyeIcon className="h-7 w-7" />
          <span className="sr-only">View teacher details</span>
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>teacher Details</SheetTitle>
          <SheetDescription>
            <div className="flex flex-col items-center gap-4 mt-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={teacher.user.picture}
                  alt={`${teacher.user.firstName} ${teacher.user.lastName}`}
                />
                <AvatarFallback>
                  {teacher.user?.firstName?.charAt(0)}
                  {teacher.user?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h1 className="font-bold text-2xl text-center">
                {`${teacher.user.firstName} ${teacher.user.lastName}`}
              </h1>
            </div>
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-gray-500" />
            <p>
              <span className="font-semibold">Specialization:</span>{" "}
              {teacher.specialization}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-gray-500" />
            <p>
              <span className="font-semibold">Degree:</span> {teacher.degree}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-gray-500" />
            <p>
              <span className="font-semibold">Experience:</span>{" "}
              {teacher.experience}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-gray-500" />
            <p>
              <span className="font-semibold">Address:</span> {teacher.address}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-gray-500" />
            <p>
              <span className="font-semibold">Contact:</span> {teacher.number}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-500" />
            <p>
              <span className="font-semibold">Appointment Time:</span>{" "}
              {teacher.appointmentTime}
            </p>
          </div>
          <div>
            <p className="font-semibold">Bio:</p>
            <p className="mt-1">{teacher.bio}</p>
          </div>
          <div className="flex items-center gap-2">
            <p>
              <span className="font-semibold">Fees:</span> ${teacher.fees}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span className="capitalize">{teacher.status}</span>
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}