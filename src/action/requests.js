"use server"

export async function addRequest(data) {
    // console.log("data",data);
    
    let add = await fetch(`${process.env.BASE_URL}api/requests`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }