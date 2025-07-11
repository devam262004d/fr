"use client"



import React, { useEffect, useState, useRef } from 'react';
import { Box, TextField, Button, Typography, Divider, Chip } from '@mui/material';
import socket from '../../_api/socket';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import toast from "react-hot-toast";
import KeyIcon from '@mui/icons-material/Key';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Mic, MicOff, Videocam, VideocamOff } from "@mui/icons-material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { updateResumeText } from "../../_api/createJob";


const interviewscan = () => {

  const router = useRouter();
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const userRole = useSelector((state) => state.auth.type);
  const [isResume, setIsResume] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    password: '',
  });
  const videoRef = useRef(null);
  const [devices, setDevices] = useState({
    mic: false,
    camera: false
  });
  const streamRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed!")
      return;
    }
    setFile(file);
    setFileName(file.name);
  }

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


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isResume) {
      console.log("Submitted:", formData);
      socket.emit("check-password", { roomId: formData.id, password: formData.password, role: userRole });
    } else {
      toast.error("Please Upload your Resume")
    }


  };

  useEffect(() => {
    const errorHandler = ({ message }) => {
      toast.error(message);
    };
    const passwordHandler = ({ roomId }) => {
      router.push(`/dashboard/candidateCall/${roomId}`);
      toast.success("Password is correct");
    };

    socket.on("error", errorHandler);
    socket.on("password-is-correct", passwordHandler);
    return () => {
      socket.off("error", errorHandler);
      socket.off("password-is-correct", passwordHandler);
    }
  }, [])

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


  const handleSubmitResume = () => {
    const formDataa = new FormData();
    formDataa.append("file", file);
    formDataa.append("id", formData.id);
    formDataa.append("password", formData.password);
    updateResumeText(formDataa).then((res) => {
      console.log("Resume uploaded successfully", res);
      if (res.success) {
        toast.success("Resume uploaded successfully");
        setIsResume(true)
        setFileName("");
        setFile(null);
      } else {
        toast.error(res.error || "Failed to upload resume");
      }
    }).catch((err) => {
      console.log("Error uploading resume", err.error);
    })
  }



  return (
    <Box>
      <Box>
        <Typography sx={{
          textAlign: "center",
          fontSize: {
            xs: "1.3rem",
            sm: "1.5rem",
            md: "2rem"
          },
          fontWeight: "bold"
        }}>
          Join Your Interview
        </Typography>
        <Typography sx={{
          fontSize: {
            xs: "0.70rem",
            sm: "1.1rem",
            md: "1.1rem"
          }, textAlign: "center", color: "gray",
        }}>
          Enter your credentials and prepare for your interview session
        </Typography>
      </Box>
      <Box sx={{ backgroundColor: "#f9fafb", width: "100%", p: 1, display: "flex", flexDirection: { md: "row", xs: "column-reverse", sm: "row" }, gap: 1 }}>
        <Box sx={{ width: { md: "50%", xs: "100%", height: "100%" } }}>
          <Box sx={{ height: "100%", backgroundColor: "white", width: "100", border: "1px solid #e5e7eb", borderRadius: 2, p: 1 }}>
            <form action="" onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
                <KeyIcon sx={{ fontSize: { xs: "1.1rem", sm: "1.4rem", md: "1.6rem" } }} />  <Typography sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.6rem" }, fontWeight: "bold" }}>Interview Credentials</Typography>
              </Box>
              <Typography sx={{ color: "#4b5563", fontSize: { xs: "0.7rem", md: "1rem", sm: "0.7rem" } }}>Enter the details provided by your interviewer </Typography>
              <TextField onChange={handleChange} value={formData.id} placeholder='Enter interview ID' sx={inputStyle} fullWidth label="ID" name="id" size='small' required />
              <TextField onChange={handleChange} value={formData.password} placeholder='Enter password' sx={inputStyle} fullWidth label="Password" name="password" type="password" size='small' required />
              <Button type="submit" fullWidth sx={{ textTransform: "none", border: "2px solid #e5e7eb", color: "white", borderRadius: 2, fontWeight: "bold", backgroundColor: "black", gap: 1 }}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 1.643.397 3.23 1.145 4.65L2.029 20.94a.85.85 0 0 0 1.036 1.036l4.29-1.117A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10ZM12 8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h3Zm3 5.162v-2.324l1.734-1.642A.75.75 0 0 1 18 9.741v4.518a.75.75 0 0 1-1.266.545L15 13.162Z" fill="white" /></svg> Join Interview
              </Button>
            </form>
          </Box>
          <Box sx={{ width: "100%", backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: 2, p: 1, mt: 1, height: "100%" }}>
            <Box>
              <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
                <Typography sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.6rem" }, fontWeight: "bold" }}>Upload Resume</Typography>
                <Button
                  onClick={handleSubmitResume}
                  sx={{
                    border: "1px solid black",
                    paddingY: 0,
                    paddingX: 2,
                    minWidth: "unset",
                    backgroundColor: "black"
                  }}
                >
                  <CloudUploadIcon
                    sx={{
                      fontSize: { xs: "1.2rem", md: "1.5rem" },
                      color: "white",
                    }}
                  />
                </Button>
              </Box>
              <Typography sx={{ color: "#4b5563", fontSize: { xs: "0.7rem", md: "1rem", sm: "0.7rem" } }}>Upload your latest resume for the interviewer's reference</Typography>

              <Button>
              </Button>
              <Box sx={{ mt: 1, border: "2px dashed #e5e7eb", borderRadius: 2, p: 1, width: "100%", }}>
                <Box component="label">
                  <Box sx={{ width: "100%", p: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <input type="file" hidden onChange={handleFileChange} />
                    <CloudUploadIcon sx={{ fontSize: "50px", color: isResume ? "green" : "#9ca3af", }} />
                    {
                      fileName ? (
                        <Typography sx={{ fontSize: { xs: "1rem", sm: "0.7rem", md: "1.1rem" }, color: "#6b7280" }}>{fileName}</Typography>
                      ) : (
                        <Box>
                          <Typography sx={{ fontSize: { xs: "1rem", sm: "0.7rem", md: "1.1rem" }, textAlign: "center", color: "#374151" }}>Click to upload or drag and drop</Typography>
                          <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.6rem", md: "1rem" }, textAlign: "center", color: "#6b7280" }}>PDF, DOC, DOCX up to 10MB</Typography>
                        </Box>
                      )
                    }
                  </Box>
                </Box>

              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ backgroundColor: "white", width: { md: "50%", xs: "100%" }, border: "1px solid #e5e7eb", borderRadius: 2, p: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
            <CameraAltIcon sx={{ fontSize: { xs: "1.1rem", sm: "1.4rem", md: "1.6rem" } }} />  <Typography sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.6rem" }, fontWeight: "bold" }}>Camera & Audio Preview</Typography>
          </Box>
          <Typography sx={{ color: "#4b5563", fontSize: { xs: "0.7rem", md: "1rem", sm: "0.7rem" } }}>Test your camera and microphone before joining</Typography>
          <Divider
            sx={{
              my: 1,
              borderColor: "black",
              borderBottomWidth: 2,
              boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.2)"
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", }}>
            <Box sx={{ width: "98%", backgroundColor: "#1f2937", height: { md: "300px", xs: "250px", sm: "250px" }, borderRadius: 2, position: "relative" }}>
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
                  borderRadius: 'inherit',
                  objectPosition: "center"
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
                  backgroundColor: " #1f2937",
                  borderRadius: 3
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                mt: 1,
                gap: 1,
              }}
            >
              <Button
                onClick={() => toggleDevice('camera')}
                sx={{
                  backgroundColor: "#f9fafb",
                  color: "black",
                  fontWeight: "bold",
                  border: "1px solid black",
                  fontSize: { xs: "0.7rem", md: "1rem", sm: "0.7rem" },
                  gap: 0.5,
                }}
              >
                {devices.camera ? (
                  <Videocam sx={{ fontSize: { xs: 18, sm: 18, md: 24 } }} />
                ) : (
                  <VideocamOff sx={{ fontSize: { xs: 18, sm: 18, md: 24 } }} />
                )}
                {devices.camera ? "Disable Camera" : "Enable Camera"}
              </Button>

              <Button
                onClick={() => toggleDevice('mic')}
                sx={{
                  backgroundColor: "#f9fafb",
                  color: "black",
                  fontWeight: "bold",
                  border: "1px solid black",
                  fontSize: { xs: "0.7rem", md: "1rem", sm: "0.7rem" },
                  gap: 0.5,
                }}
              >
                {devices.mic ? (
                  <Mic sx={{ fontSize: { xs: 18, md: 24, sm: 18 } }} />
                ) : (
                  <MicOff sx={{ fontSize: { xs: 18, sm: 18, md: 24 } }} />
                )}
                {devices.mic ? "Mute Audio" : "Unmute Audio"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "100%", backgroundColor: "#f9fafb", p: 1 }}>
        <Box sx={{ width: "100%", backgroundColor: "white", borderRadius: 2, p: 1, border: "1px solid #e5e7eb" }}>
          <Typography sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.6rem" }, fontWeight: "bold" }}>Before You Join</Typography>
          <ol style={{color:"#4b5563"}}>
            <li> Ensure you have a stable internet connection</li>
            <li>Test your camera and microphone</li>
            <li>Find a quiet, well-lit location</li>
            <li>Have your resume and documents ready</li>
          </ol>
        </Box>
      </Box >

    </Box>
  );
};

export default interviewscan;
