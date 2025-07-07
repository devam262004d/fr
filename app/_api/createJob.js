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


