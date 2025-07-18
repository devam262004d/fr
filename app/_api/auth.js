const BASE_URL = "http://localhost:5000/api/auth";



export const signup = async (formData) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const login = async(formData)=>{
  const res = await fetch(`${BASE_URL}/login`,{
    method:"POST",
    headers:{ "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials:"include"
  });
   const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}

export const verifyToken = async () => {
  try {
    const response = await fetch(`${BASE_URL}/me`, {
      method: 'GET',
      credentials: 'include', 
    });

    if (!response.ok) {
      return { success: false, error: 'Not authenticated' };
    }

    const data = await response.json();
    return { success: true, user: data.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const logout = async ()=>{
  try {
     const response = await fetch(`${BASE_URL}/logout`, {
      method: 'GET',
      credentials: 'include', 
    });
    if (!response.ok) {
      throw new Error('Not authenticated');
    }
    const data = await response.json();
    return { success: true, message:data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
