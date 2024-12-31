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
import { DollarSign, TimerIcon, PersonStandingIcon } from "lucide-react";
import { getRequest } from "@/action/requests";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import TeacherCard from "./TeacherCard";

export default async function TeacherSection({ isHome }) {
  const { requests } = await getRequest("accepted");
  // console.log('teacher section me requests', requests)
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
        {requests.map((request) => (
          <TeacherCard key={request._id} request={request} isAdmin={false} />

        ))}
      </div>
    </div>
  );
}
