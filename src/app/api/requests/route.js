
import connectDB from "@/lib/ConnectDb";
import { RequestModal } from "@/lib/modal/RequestModal";


export async function POST(req) {
  await connectDB();
  try {
    const obj = await req.json();
    // console.log("object in backend",obj);

    const isUserRequestedBefore = await RequestModal.findOne({
      user: obj.user,
    });
    console.log("isUserRequestedBefore=>", isUserRequestedBefore);
    if (isUserRequestedBefore) {
      return Response.json(
        {
          error: true,
          msg: "You had already applied as a Teacher",
        },
        { status: 403 }
      );
    }

    let newRequest = await new RequestModal({ ...obj });
    newRequest = await newRequest.save();

    return Response.json(
      {
        error: false,
        msg: "Request Registered Successfully",
        request: newRequest,
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
  // console.log(req);
  const query = {};
  const status = req?.nextUrl?.searchParams?.get("status");
  if (status && status != "all") {
    query.status = status;
  }

  const requests = await RequestModal.find(query).populate("user");
  return Response.json(
    {
      error: false,
      msg: "Requests fetched Successfully",
      requests,
    },
    { status: 200 }
  );
}

export async function PUT(req) {
  await connectDB();
  try {
    const obj = await req.json();
    let { id, status } = obj;

    const request = await RequestModal.findOne({ _id: id });
    console.log(request);

    let user = await UserModal.findOneAndUpdate({ _id: request.user }, { role: "teacher" });
    console.log("user", user);
    const updated = await RequestModal.findOneAndUpdate(
      {
        _id: id,
      },
      { status: status }
    ).exec();

    console.log("update", updated)
    return Response.json(
      {
        error: false,
        msg: "Requests updated Successfully",
        request: updated,
      },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      {
        error: false,
        msg: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req) { }