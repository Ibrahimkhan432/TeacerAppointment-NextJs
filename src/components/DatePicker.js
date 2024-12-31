"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Link from "next/link"
import { toast, useToast } from "@/hooks/use-toast"
import { addAppointment } from "@/action/appointment"

export function DatePicker({ session, request }) {
  const [date, setDate] = React.useState(new Date());
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();
  const HandleBookAppointment = async () => {
    let isDateInFuture = Date.now() < new Date(date);
    if (!isDateInFuture) return toast({ title: "please select upcoming date" })
    // console.log("isDateInFuture", isDateInFuture)
    setLoading(true);
    const obj = { user: session.user._id, request: request, date };
    const response = await addAppointment(obj);
    toast({ title: response.msg, })
  }
  return (
    <div className="my-4 w-full">
      <h1 className="font-semibold mb-4">Pick your Appointment date</h1>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(

              "bg-slate-700 w-[280px] justify-start text-left font-normal text-white",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {
        session ?
          <Button onClick={HandleBookAppointment} className="w-full">Book Appointment</Button>
          :
          <Link href="/signin">
            <Button className="w-full">Login to Book Appointment</Button>
          </Link>
      }
    </div>
  )
}
