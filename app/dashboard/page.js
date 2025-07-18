"use client"
import { useSelector } from "react-redux";
import CandidateDashboard from "../components/dashboard/CandidateDashboard";
import AdminDashboard from "../components/dashboard/AdminDashboard";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import {Box} from "@mui/material"
import { useEffect } from "react";
import socket from "../_api/socket";


export default function Page() {
useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", () => {
      console.log("✅ Connected with ID:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from server");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const userType = useSelector((state) => state.auth.type);
  if (!userType) {
    return (
    <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height:"50vh" 
  }}
>
  <Stack direction="row" sx={{ color: 'grey.500' }}>
    <CircularProgress color="inherit" />
  </Stack>
</Box>
    );
  }
  return (
    <Box >
      {
        userType == "Candidate"
          ? (
            <CandidateDashboard />
          ) :
          (
            <AdminDashboard />
          )
      }
    </Box>
  )
}