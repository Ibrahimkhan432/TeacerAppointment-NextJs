"use server"

import { revalidatePath } from "next/cache";

export async function addRequest(data) {
  // console.log("data",data);

  let add = await fetch(`${process.env.BASE_URL}api/requests`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  add = add.json();

  return add;
}

export async function getRequest(status) {
  let requests = await fetch(`${process.env.BASE_URL}api/requests?status=${status ? status : ""}`
  );
  requests = requests.json();

  return requests;
}
export async function getSingleRequest(id) {

  let request = await fetch(`${process.env.BASE_URL}api/requests/${id}`);
  request = await request.json();
  console.log("request in >>>", request);
  
  return request;
}

export async function updateRequest(id, status) {
  console.log('updaterequest function ', status)
  let requests = await fetch(`${process.env.BASE_URL}api/requests`, {
    method: "PUT",
    body: JSON.stringify({ id, status }),
  });
  requests = requests.json();
  revalidatePath("/admin/requests");
  return requests;
}