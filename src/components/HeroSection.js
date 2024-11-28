import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { auth } from "../../auth";
const  HeroSection =async () => {
  const session =await auth();
  return (
    <div className="container mx-auto w-[1300px]">
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <Image
              className="object-cover object-center rounded"
              alt="hero"
              height={400}
              width={4000}
              src="https://images.unsplash.com/photo-1605711285791-0219e80e43a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODh8fHRlYWNoZXJ8ZW58MHx8MHx8fDA%3D"
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Teacher Appointment System
              <br className="hidden lg:inline-block" />
              Batch-11
            </h1>
            <p className="mb-8 leading-relaxed">
            A Teacher Appointment System website is an online platform designed to simplify the process of scheduling meetings between teachers, students, and parents. This system enables users to easily book appointments, view available time slots, and receive notifications or reminders about upcoming meetings. With features like real-time scheduling, automated confirmation messages, and rescheduling options, the platform reduces administrative workload and ensures better time management. 
            </p>
            <div className="flex justify-center gap-3">
              <Button >
                Find Your Teacher
              </Button>
              <Link href={session ? '/teachers/apply' : '/signin'}>
              <Button variant={"outline"}>
                Apply as a Teacher
              </Button>
           </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
