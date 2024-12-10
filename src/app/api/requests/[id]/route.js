import connectDB from "@/lib/ConnectDb";
import { RequestModal } from "@/lib/modal/RequestModal";
import { UserModal } from "@/lib/modal/UserModal";

export async function GET(req, { params }) {
  await connectDB();
  // console.log("id in ba");

  const requests = await RequestModal.findOne({ _id: params.id }).populate( "user");
  return Response.json(
    {
      error: false,
      msg: "Single Request fetched Successfully",
      requests,
    },
    { status: 200 } 
  );
}

export async function DELETE(req) {}