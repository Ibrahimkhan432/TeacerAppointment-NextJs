"use server"
import { revalidatePath } from "next/cache";

export async function addAppointment(data) {
  // console.log("data",data);

  let add = await fetch(`${process.env.BASE_URL}api/appointments`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  add = await add.json();

  return add;
}

export async function getAppointments(role, id, status = "pending") {
  let url;
  if (role == "user") {
    url = `${process.env.BASE_URL}api/appointments?user=${id}&status=${status}`;
  } else {
    url = `${process.env.BASE_URL}api/appointments?teacher=${id}&status=${status}`;
  }
  let appointments = await fetch(url, {
    cache: "no-cache",
  });
  appointments = await appointments.json();

  return appointments;
}

export async function updateAppointment(id, status) {
  let update = await fetch(`${process.env.BASE_URL}api/appointments`, {
    method: "PUT",
    body: JSON.stringify({ id, status }),
  });

  revalidatePath("/appointments");
}