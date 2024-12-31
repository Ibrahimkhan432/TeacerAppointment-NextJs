import connectDB from "@/lib/ConnectDb";
import { AppointmentModal } from "@/lib/modal/AppointmentModal";
import { UserModal } from "@/lib/modal/UserModal";
import { RequestModal } from "@/lib/modal/RequestModal";

export async function POST(req) {
  await connectDB();
  try {
    const obj = await req.json();

    let newAppointment = await new AppointmentModal({ ...obj });
    newAppointment = await newAppointment.save();

    return Response.json(
      {
        error: false,
        msg: "Appointment is booked you will be confirmed soon",
        appointment: newAppointment,
      },
      { status: 201 }
    );
  } catch (e) {
    return Response.json(
      {
        error: true,
        msg: "Something went wrong",
      },
      { status: 400 }
    );
  }
}

export async function GET(req) {
  await connectDB();
  const query = {};
  const teacher = req?.nextUrl?.searchParams?.get("teacher");
  const user = req?.nextUrl?.searchParams?.get("user");
  console.log("userrr>>>", user);

  const status = req?.nextUrl?.searchParams?.get("status");
  const now = Date.now();

  if (teacher) {
    const teacherRequest = await RequestModal.findOne({ user: teacher });
    query.request = teacherRequest._id;
  }
  if (status && status !== "upcoming" && status !== "past")
    query.status = status;
  if (status && status == "upcoming") {
    query.date = { $gt: now };
    query.status = "accepted";
  }
  if (status && status == "past") {
    query.date = {
      $lt: now,
    };
  }
  if (user) query.user = user;

  const stats = {
    accepted: await AppointmentModal.find({
      status: "accepted",
    }).countDocuments(),
    cancelled: await AppointmentModal.find({
      status: "cancelled",
    }).countDocuments(),
    pending: await AppointmentModal.find({
      status: "pending",
    }).countDocuments(),
  };


  const appointments = await AppointmentModal.find(query)
    .populate("user")
    .populate({
      path: "request",
      populate: { path: "user" }, // Populate the user field inside request
    });

  return Response.json(
    {
      error: false,
      msg: "teacher fetched Successfully",
      appointments,
      stats,
    },
    { status: 200 }
  );
}

export async function PUT(req) {
  await connectDB();
  try {
    const { id, status } = await req.json();
    const update = await AppointmentModal.findOneAndUpdate(
      { _id: id },
      {
        status: status,
      }
    ).exec();
    return Response.json(
      {
        error: false,
        msg: "Appointment updated successfully.",
        appointment: update,
      },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      {
        error: true,
        msg: "Something went wrong",
      },
      { status: 400 }
    );
  }
}

export async function DELETE(req) { }