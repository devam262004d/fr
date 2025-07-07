"use client"



import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import socket from '../../_api/socket';
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";

const LoginForm = () => {

  const router = useRouter();
  const [formData, setFormData] = useState({
    id: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    socket.emit("check-password", {roomId:formData.id, password:formData.password});
  };


  useEffect(()=>{
    const errorHandler = ({message})=>{
      toast.error(message);
    };
    const passwordHandler = ({roomId})=>{
       router.push(`/dashboard/interviewerCall/${roomId}`);  
        toast.success("Password is correct");
    }

    socket.on("error", errorHandler)
    socket.on("password-is-correct", passwordHandler)

    return()=>{
      socket.off("error", errorHandler);
      socket.off("password-is-correct", passwordHandler);
    }

  },[]);



// useEffect(() => {
//   const handler = ({ roomId }) => {
//     console.log("joined successfully:", roomId);
//     console.log("roomId:", roomId);
//     router.push(`/dashboard/interviewerCall/${roomId}`);
//   };

//   const handleInterviewerFirst = () => {
//     console.log("🧑‍💼 Interviewer joined first");
//   };

//   socket.on("password-is-correct", handler);
//   socket.on("interviewer-joined-first", handleInterviewerFirst);

//   return () => {
//     socket.off("password-is-correct", handler);
//     socket.off("interviewer-joined-first", handleInterviewerFirst);
//   };
// }, [router]); 


  // socket.on("error", (msg) => {
  //   alert("❌ Error: " + msg);
  // });

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h6" mb={2} align="center">
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="ID"
          name="id"
          value={formData.id}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
