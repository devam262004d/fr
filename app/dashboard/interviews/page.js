"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Box, TextField, Button, Typography, Chip } from '@mui/material';
import socket from '../../_api/socket';
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Mic, MicOff, Videocam, VideocamOff } from "@mui/icons-material";


const LoginForm = () => {
  const videoRef = useRef(null);
  const [devices, setDevices] = useState({
    mic: false,
    camera: false
  });
  const streamRef = useRef(null);

  // Login form state
  const router = useRouter();
  const formRef = useRef(null);
  const userType = useSelector((state) => state.auth.type);
  const [formData, setFormData] = useState({
    id: '',
    password: '',
  });

  // Media setup and cleanup
  useEffect(() => {
    const startMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        streamRef.current = stream;
        videoRef.current.srcObject = stream;
        setDevices({ mic: true, camera: true });
      } catch (err) {
        console.error("Media error:", err);
      }
    };

    startMedia();

    // Cleanup - this will run when component unmounts
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
        });
        // Clear video source
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      }
    };
  }, []);

  const toggleDevice = (type) => {
    if (!streamRef.current) return;

    const track = streamRef.current.getTracks()
      .find(t => t.kind === (type === 'mic' ? 'audio' : 'video'));

    if (track) {
      track.enabled = !track.enabled;
      setDevices(prev => ({ ...prev, [type]: track.enabled }));
    }
  };

  // Form handlers
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("check-password", {
      roomId: formData.id,
      password: formData.password,
      role: userType
    });
  };

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Socket listeners
  useEffect(() => {
    const errorHandler = ({ message }) => {
      toast.error(message);
    };
    const passwordHandler = ({ roomId }) => {
      router.push(`/dashboard/interviewerCall/${roomId}`);
      toast.success("Password is correct");
    }

    socket.on("error", errorHandler);
    socket.on("password-is-correct", passwordHandler);

    return () => {
      socket.off("error", errorHandler);
      socket.off("password-is-correct", passwordHandler);
    }
  }, []);

  const inputStyle = {
    mt: 1,
    mb: 1,
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: '2px solid black',
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: '2px solid #d1d5db',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      border: '2px solid black',
    },
    '& .MuiInputLabel-root': {
      color: 'black',
    },
    '& .MuiSelect-icon': {
      color: 'black',
    },
    "& label.Mui-focused": {
      color: "black",
    },
  };

  return (
    <Box>
      <Box sx={{ width: "100%", backgroundColor: "#f9fafb", borderRadius: 2, p: 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        {/* Header section with icons */}
        <Box sx={{ display: "flex", flexDirection: "row", gap: { xs: 1.5, sm: 3 }, justifyContent: "center", alignItems: "center", flexWrap: "wrap", mb: 2 }}>
          {/* Left Icon */}
          <Box sx={{ backgroundColor: "#111827", width: { xs: 50, sm: 70, md: 90 }, height: { xs: 50, sm: 70, md: 90 }, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="60%" height="60%" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.754 14a2.249 2.249 0 0 1 2.25 2.249v.918a2.75 2.75 0 0 1-.513 1.599C17.945 20.929 15.42 22 12 22c-3.422 0-5.945-1.072-7.487-3.237a2.75 2.75 0 0 1-.51-1.595v-.92a2.249 2.249 0 0 1 2.249-2.25h11.501ZM12 2.004a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" fill="white" />
            </svg>
          </Box>

          {/* Dots Line */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FiberManualRecordIcon sx={{ fontSize: 15, color: "#0f172a" }} />
            <FiberManualRecordIcon sx={{ fontSize: 7, color: "#000000" }} />
            <FiberManualRecordIcon sx={{ fontSize: 7, color: "#000000" }} />
            <FiberManualRecordIcon sx={{ fontSize: 7, color: "#000000" }} />
            <FiberManualRecordIcon sx={{ fontSize: 15, color: "#0f172a" }} />
          </Box>

          {/* Right Icon */}
          <Box sx={{ backgroundColor: "#374151", width: { xs: 50, sm: 70, md: 90 }, height: { xs: 50, sm: 70, md: 90 }, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.754 14a2.249 2.249 0 0 1 2.25 2.249v.918a2.75 2.75 0 0 1-.513 1.599C17.945 20.929 15.42 22 12 22c-3.422 0-5.945-1.072-7.487-3.237a2.75 2.75 0 0 1-.51-1.595v-.92a2.249 2.249 0 0 1 2.249-2.25h11.501ZM12 2.004a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" fill="white" />
            </svg>
          </Box>
        </Box>

        {/* Status and buttons */}
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 2 }}>
          <Typography sx={{ p: "4px 8px", backgroundColor: "#e5e7eb", borderRadius: 5, display: "flex", alignItems: "center", gap: 1, width: "fit-content", fontWeight: 500, fontSize: { xs: "0.75rem", sm: "0.85rem", md: "1rem" } }}>
            <FiberManualRecordIcon sx={{ color: "#6b7280", fontSize: { xs: 10, sm: 12, md: 14 } }} />
            Interview in Progress
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "row", gap: { xs: 1, md: 2 } }}>
            <Button onClick={handleScrollToForm} sx={{ textTransform: "none", border: "1px solid black", color: "white", backgroundColor: "black", borderRadius: 2, fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" }, px: { xs: 1.5, sm: 2, md: 3 }, py: { xs: 0.5, sm: 0.75 }, gap: 1 }}>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 16.25a3.25 3.25 0 0 1-3.25 3.25h-7.5A3.25 3.25 0 0 1 2 16.25v-8.5A3.25 3.25 0 0 1 5.25 4.5h7.5A3.25 3.25 0 0 1 16 7.75v8.5Zm5.762-10.357a1 1 0 0 1 .238.648v10.918a1 1 0 0 1-1.648.762L17 15.37V8.628l3.352-2.849a1 1 0 0 1 1.41.114Z" fill="white" /></svg> Join Video Call
            </Button>
            <Button ref={formRef} disabled sx={{ textTransform: "none", border: "2px solid #e5e7eb", color: "black", borderRadius: 2, fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" }, px: { xs: 1.5, sm: 2, md: 3 }, py: { xs: 0.5, sm: 0.75 }, gap: 1 }}>
              <VolumeUpIcon sx={{ color: "black" }} /> Audio only
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Main content area */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, width: "100%", mt: 2, gap: 1 }}>
        <Box sx={{ width: { xs: "100%", md: "50%" }, border: "1px solid #e5e7eb", borderRadius: 2, p: 1, height:"100%" }}>
          <Typography mb={2} sx={{ fontWeight: "bold", fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" } }}>
            Join Interview
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField sx={inputStyle} fullWidth label="ID" name="id" value={formData.id} onChange={handleChange} size='small' required />
            <TextField sx={inputStyle} fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleChange} size='small' required />
            <Button type="submit" fullWidth sx={{ textTransform: "none", border: "2px solid #e5e7eb", color: "white", borderRadius: 2, fontWeight: "bold", backgroundColor: "black", gap: 1 }}>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 1.643.397 3.23 1.145 4.65L2.029 20.94a.85.85 0 0 0 1.036 1.036l4.29-1.117A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10ZM12 8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h3Zm3 5.162v-2.324l1.734-1.642A.75.75 0 0 1 18 9.741v4.518a.75.75 0 0 1-1.266.545L15 13.162Z" fill="white" /></svg> Join Interview
            </Button>
          </form>
        </Box>

        <Box sx={{ p: 1, width: { xs: "100%", md: "50%" }, border: "1px solid #e5e7eb", borderRadius: 2, display: "flex" }}>
          <Box sx={{ width: "100%", display: "flex",justifyContent:"center", alignItems:"center" }}>
            <Box sx={{
              flex: 4,
              borderRadius: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              height: 300,
              position: 'relative',
              overflow: 'hidden' 
            }}>
              <Box sx={{
                width: '90%',
                height: 270,
                position: 'relative',
                border:"3px solid black",
                borderRadius: 3
              }}>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover', 
                    display: devices.camera ? 'block' : 'none',
                    transform: devices.camera ? 'scaleX(-1)' : 'none',
                    borderRadius: 'inherit' 
                  }}
                />
                {!devices.camera && (
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    borderRadius:3
                  }}>
                    <Typography variant="body1" sx={{ color: 'white' }}>
                      Camera is disabled
                    </Typography>
                  </Box>
                )}
                <Chip
                  label={devices.camera ? "LIVE" : "OFF"}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: devices.camera ? 'error.main' : 'grey.700',
                    color: 'white',
                    fontWeight: 'bold',
                    zIndex: 1
                  }}
                />
              </Box>
            </Box>
            <Box sx={{
              border:"3px solid black",
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              padding: 1,
              height: 270,
            }}>
              <Button
                onClick={() => toggleDevice('mic')}
                sx={{
                  minWidth: 0,
                  p: 1,
                  borderRadius: '50%',
                  bgcolor: devices.mic ? 'black' : 'grey.500',
                  color: 'white',
                  '&:hover': {
                    bgcolor: devices.mic ? 'white' : 'black'
                  },
                  '&:hover': {
                    color: devices.mic ? 'white' : 'black'
                  }
                }}
              >
                {devices.mic ? <Mic /> : <MicOff />}
              </Button>
              <Button
                onClick={() => toggleDevice('camera')}
                sx={{
                  minWidth: 0,
                  p: 1,
                  borderRadius: '50%',
                  bgcolor: devices.camera ? 'black' : 'grey.500',
                  color: 'white',
                  '&:hover': {
                    bgcolor: devices.camera ? 'black' : 'grey.600'
                  }
                }}
              >
                {devices.camera ? <Videocam /> : <VideocamOff />}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;