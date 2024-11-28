import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { categories, teachers } from "@/components/Data.js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { DollarSign, TimerIcon,PersonStandingIcon } from "lucide-react";

export default function TeacherSection({ isHome }) {
  const filtered = isHome ? teachers.slice(0, 6) : teachers;
  return (
    <div className="container my-10 w-[1300px] mx-auto">
      <div className="flex justify-between my-3">
        <h1 className="text-3xl font-bold text-gray-900">Expert Teachers</h1>
        {isHome ? (
          <Link href={"/teachers"}>
            <Button> See All</Button>
          </Link>
        ) : (
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      <div className="grid lg:grid-cols-3 gap-5">
        {filtered.map((teacher) => (
          <Card key={teacher}>
            <CardHeader>
              <CardTitle className="text-2xl shadow-lg w-1/2">{teacher.name}</CardTitle>
              <CardDescription className="text-xl">
                {teacher.category}
              </CardDescription>
            </CardHeader>
            {!isHome && ( 
            <CardContent>
              <div className=" flex justify-between">
                <div className="flex gap-2 items-center">
                  <PersonStandingIcon />
                  <h1>Gender</h1>
                </div>
                <h1>{teacher.gender}</h1>
              </div>
              <div className=" flex justify-between">
                <div className="flex gap-2 items-center">
                <TimerIcon />
                <h1>Appointment Time</h1>
                </div>
                <h1>{teacher.appointmentTime}</h1>
              </div>
              <div className=" flex justify-between">
                <div className="flex gap-3 items-center">
                  <DollarSign />
                <h1>Fees</h1>
                </div>
                <h1>{teacher.fees}</h1>
              </div>
            </CardContent>
            )}
            <CardFooter>
              <Link href={`teachers/${teacher.id}`} >
              <Button>See Detail</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
