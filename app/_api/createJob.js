const BASE_URL = "https://interviewserver-9r70.onrender.com/api/interviewJob";


export const createInterviewJob = async (formData) => {
  const res = await fetch(`${BASE_URL}/createInterviewJob`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const updateResumeText = async (formDataa) => {
  const res = await fetch(`${BASE_URL}/updateResumeText`, {
    method: "POST",
    body: formDataa,
    credentials: "include",
    headers: {
      "Accept": "application/json"
    }
  });

  return res.json(); 
};


export const getJobs =  async(page=1, limit=10, query="", status="")=>{
  console.log(page,limit,query,status);
  const res = await fetch(`${BASE_URL}/getJob?page=${page}&limit=${limit}&q=${query}&status=${status}`,{
    method:"GET",
    credentials:"include",
     headers: { "Content-Type": "application/json" },  
  });
  const data = await res.json();
  if(!res.ok) throw new Error(data.message);
  return data;
}


export const analyzeresume = async (formData) => {
  const res = await fetch(`${BASE_URL}/analyzeresume`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};


export const audioToText = async (formDataa) => {
  try {
    const res = await fetch(`${BASE_URL}/audioToText`, {
      method: "POST",
      body: formDataa,
      credentials: "include",
      headers: {
        "Accept": "application/json"
      }
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in audioToText:", error);
    throw error;
  }
};




export const editDate = async (formData) => {
  const res = await fetch(`${BASE_URL}/editDate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};


export const deleteJob = async (id) => {
  const res = await fetch(`${BASE_URL}/deleteJob/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};


export const getJobDetails = async (roomId) => {
  const res = await fetch(`${BASE_URL}/getJobDetails`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({roomId}),
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};





export const submitFinalDecision = async (option, description, roomId) => {
  const res = await fetch(`${BASE_URL}/submitFinalDecision`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({option, description, roomId}),
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};