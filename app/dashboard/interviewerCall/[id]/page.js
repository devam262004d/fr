"use client";

import { useEffect, useRef, useState } from "react";
import { Box, TextField, Button, Typography, Chip, IconButton, Divider, } from '@mui/material';
import socket from "../../../_api/socket";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { keyframes } from "@emotion/react";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import VideocamIcon from '@mui/icons-material/Videocam';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicOffIcon from '@mui/icons-material/MicOff';
import Note from "../../../components/interviewerCall/Note";
import { analyzeresume, audioToText } from "../../../_api/createJob";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import CycloneIcon from '@mui/icons-material/Cyclone';

export default function InterviewerCall() {
  const { id: roomId } = useParams();
  const router = useRouter();
  const [isStreamActive, setIsStreamActive] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [resume, setResume] = useState(null);
  const peerRef = useRef(null);
  const hasJoinedRef = useRef(false);
  const localStreamRef = useRef(null);
  const RemoteStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);


  useEffect(() => {
    const errorHandler = ({ message }) => {
      toast.error(message);
      if (message === "Room is full") {
        stopStream();
      }
    };

    const answerHandler = async ({ answer }) => {
      if (!peerRef.current) return;
      try {
        await peerRef.current.setRemoteDescription(new RTCSessionDescription(answer));
      } catch (err) {
        console.error("Error setting remote description:", err);
      }
    };

    const iceHandler = async ({ candidate }) => {
      if (peerRef.current && candidate) {
        try {
          await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (err) {
          console.warn("Failed to add ICE candidate:", err);
        }
      }
    };

    const offerHandler = async () => {
      if (!peerRef.current) return;
      try {
        const offer = await peerRef.current.createOffer();
        await peerRef.current.setLocalDescription(offer);
        socket.emit("offer", { offer, roomId });
      } catch (err) {
        console.error("Failed to create/send offer:", err);
      }
    };

    const handleUserDisconnected = async ({ message }) => {
      console.log("user dissconnected")
      toast.error(message)
    }

    const startMediaAndConnection = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        localStreamRef.current = stream;
        setIsStreamActive(true);
        setIsCameraOn(true);
        setIsMicOn(true);

        const localVideo = document.getElementById("localVideo");
        if (localVideo) {
          localVideo.srcObject = stream;
        }

        peerRef.current = new RTCPeerConnection({
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        stream.getTracks().forEach(track => {
          peerRef.current.addTrack(track, stream);
        });

        peerRef.current.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("ice-candidate", { candidate: event.candidate, roomId });
          }
        };

        peerRef.current.ontrack = (event) => {
          const remoteVideo = document.getElementById("remoteVideo");
          if (remoteVideo && !remoteVideo.srcObject) {
            remoteVideo.srcObject = event.streams[0];
          }
          RemoteStreamRef.current = event.streams[0];
        };

      } catch (err) {
        console.error("Error accessing media:", err);
        toast.error("Failed to access camera or microphone");
        stopStream();
      }
    };

    const setup = async () => {
      if (hasJoinedRef.current) return;
      hasJoinedRef.current = true;
      await startMediaAndConnection();
      socket.emit("join-room", { roomId, role: "Interviewer" });
    };

    setup();

    socket.on("error", errorHandler);
    socket.on("user-joined", offerHandler);
    socket.on("answer", answerHandler);
    socket.on("ice-candidate", iceHandler);
    socket.on("call-ended", handleRemoteEndCall);
    socket.on("userDisconnected", handleUserDisconnected);
    return () => {
      stopStream();
      socket.off("error", errorHandler);
      socket.off("user-joined", offerHandler);
      socket.off("answer", answerHandler);
      socket.off("ice-candidate", iceHandler);
      socket.off("call-ended", handleRemoteEndCall);
      socket.off("handleUserDisconnected", handleRemoteEndCall);
    };
  }, [roomId, router]);

  const handleRemoteEndCall = () => {
    toast("Candidate has left the call");
    stopStream();
  };

  const stopStream = () => {
    if (!isStreamActive) return;

    try {
      // Stop media tracks
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
        localStreamRef.current = null;
      }

      const localVideo = document.getElementById("localVideo");
      if (localVideo?.srcObject) {
        localVideo.srcObject = null;
      }

      // Close peer connection
      if (peerRef.current) {
        peerRef.current.getSenders().forEach(sender => {
          if (sender.track) sender.track.stop();
        });
        peerRef.current.close();
        peerRef.current = null;
      }

      // Notify server
      socket.emit("leave-room", { roomId });
      socket.emit("end-call", { roomId });

      // Update state
      setIsStreamActive(false);
      setIsCameraOn(false);
      setIsMicOn(false);

      // Redirect
      router.push("/");

      toast.success("Call ended successfully");
    } catch (err) {
      console.error("Error stopping stream:", err);
      toast.error("Error ending call");
    }
  };

  const toggleCamera = () => {
    if (localStreamRef.current) {
      const videoTracks = localStreamRef.current.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsCameraOn(videoTracks[0]?.enabled);
      toast.success(`Camera ${videoTracks[0]?.enabled ? "enabled" : "disabled"}`);
    }
  };

  const toggleMic = () => {
    if (localStreamRef.current) {
      const audioTracks = localStreamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMicOn(audioTracks[0]?.enabled);
      toast.success(`Microphone ${audioTracks[0]?.enabled ? "enabled" : "disabled"}`);
    }
  };

  const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.2; }
  100% { opacity: 1; }
`;


  const handleResumeAnalysis = async () => {
    const formData = {
      id: roomId,
    }
    analyzeresume(formData).then((res) => {
      console.log(res);
      setResume(res.analysis);
    }).catch((error) => {
      console.log(error)
    });
  }


  const startRecording = async () => {
    if (!localStreamRef.current || !RemoteStreamRef.current) {
      toast.error("Streams not ready");
      return;
    }

    const localTracks = localStreamRef.current.getAudioTracks();
    const remoteTracks = RemoteStreamRef.current.getAudioTracks();

    console.log("Local audio tracks:", localTracks);
    console.log("Remote audio tracks:", remoteTracks);

    if (!localTracks.length && !remoteTracks.length) {
      toast.error("No audio tracks found");
      return;
    }

    const combinedStream = new MediaStream([...localTracks, ...remoteTracks]);
    const mediaRecorder = new MediaRecorder(combinedStream, {
      mimeType: "audio/webm",
    });

    mediaRecorder.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
      console.log(chunksRef.current);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const formData = new FormData();
        formData.append("audio", blob, `interview-audio-${Date.now()}.webm`);
        audioToText(formData);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `interview-audio-${Date.now()}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 100);
    };

    mediaRecorder.start(1000);
    mediaRecorderRef.current = mediaRecorder;
    toast.success("Recording start!")
  };





  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
      toast.success("Recording stopped and downloading...");
    } else {
      toast.error("No recording is in progress");
    }
  };








  return (

    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "center", sm: "center" },
          gap: 2,
          p: { xs: 1, sm: 2 },
          backgroundColor: "#f9fafb",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { md: "center" },
            gap: { xs: 0.5, md: 1 },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "black",
              fontSize: { xs: "1.5rem", sm: "1.7rem", md: "2rem" },
            }}
          >
            InterviewR
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "black",
              backgroundColor: "#e5e7eb",
              borderRadius: 5,
              p: 1,
              fontSize: { xs: "0.50rem", sm: "0.70rem", md: "0.80rem" },
              mt: { xs: 0.5, md: 0 },
              width: "fit-content",
            }}
          >
            <FiberManualRecordIcon
              sx={{
                fontSize: "0.6rem",
                color: "limegreen",
                animation: `${blink} 1s infinite`,
              }}
            />
            Live Interview Session
          </Typography>
        </Box>

        <Button
          onClick={stopStream}
          variant="contained"
          startIcon={<LocalPhoneIcon />}
          sx={{
            backgroundColor: "black",
            color: "white",
            fontWeight: "bold",
            borderRadius: 2,
            textTransform: "none",
            fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
            px: { xs: 1.5, sm: 2.5 },
            py: { xs: 0.5, sm: 1 },
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          End Interview
        </Button>
      </Box>
      <Box
        sx={{
          backgroundColor: "#f9fafb",
          display: "flex",
          flexDirection: "column",
          height: "100%"
        }}
      >
        <Box sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          p: 1,
          borderRadius: 2,
        }}>
          {/* LEFT COLUMN */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: { md: "70%", xs: "100%" } }}>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  border: "1px solid #e5e7eb",
                  backgroundColor: "white",
                  p: 1,
                  borderRadius: 2,
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "column",
                  gap: 1,
                }}
              >

                <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                  <Box
                    sx={{
                      flex: 1,
                      minWidth: "120px",
                      height: { xs: "25vh", sm: "30vh", md: "35vh" },
                      backgroundColor: "#1f2937",
                      borderRadius: 2,
                      border: "3px solid black",
                      overflow: "hidden",
                      position: "relative",

                    }}
                  >
                    <video
                      autoPlay
                      playsInline
                      id="remoteVideo"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        backgroundColor: "#1f2937",
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      flex: 1,
                      minWidth: "120px",
                      height: { xs: "25vh", sm: "30vh", md: "35vh" },
                      backgroundColor: "#1f2937",
                      borderRadius: 2,
                      border: "3px solid black",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <video
                      autoPlay
                      playsInline
                      id="localVideo"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        backgroundColor: "#1f2937",
                        borderRadius: 8,
                      }}
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    minWidth: "120px",
                    border: "1px solid #9ca3af",
                    borderRadius: 2,
                    backgroundColor: "#f3f4f6",
                    p: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 1,
                    gap: 1
                  }}
                >
                  {isCameraOn ? (
                    <IconButton
                      onClick={toggleCamera}
                      sx={{
                        backgroundColor: "#e5e7eb",
                        p: 0.5,
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        '&:hover': {
                          backgroundColor: "#d1d5db",
                        },
                      }}
                    >
                      <VideocamIcon
                        sx={{
                          fontSize: "clamp(20px, 4vw, 32px)",
                          color: "#374151",
                        }}
                      />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={toggleCamera}
                      sx={{
                        backgroundColor: "#e5e7eb",
                        p: 0.5,
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        '&:hover': {
                          backgroundColor: "#d1d5db",
                        },
                      }}
                    >
                      <VideocamOffIcon sx={{
                        fontSize: "clamp(20px, 4vw, 32px)",
                        color: "#374151",
                      }} />
                    </IconButton>
                  )}
                  {
                    isMicOn ? (
                      <IconButton
                        onClick={toggleMic}
                        sx={{
                          backgroundColor: isCameraOn ? "#e5e7eb" : "#d1d5db",
                          backgroundColor: "#e5e7eb",
                          p: 0.5,
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                          '&:hover': {
                            backgroundColor: "#d1d5db",
                          },
                        }}
                      >
                        <KeyboardVoiceIcon
                          sx={{
                            fontSize: "clamp(20px, 4vw, 32px)",
                            color: "#374151",
                          }}
                        />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={toggleMic}
                        sx={{
                          backgroundColor: isCameraOn ? "#e5e7eb" : "#d1d5db",
                          backgroundColor: "#e5e7eb",
                          p: 0.5,
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                          '&:hover': {
                            backgroundColor: "#d1d5db",
                          },
                        }}
                      >
                        <MicOffIcon sx={{
                          fontSize: "clamp(20px, 4vw, 32px)",
                          color: "#374151",
                        }} />
                      </IconButton>
                    )
                  }
                  <IconButton
                    sx={{
                      backgroundColor: isMicOn ? "#e5e7eb" : "#d1d5db",
                      backgroundColor: "#e5e7eb",
                      p: 0.5,
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      '&:hover': {
                        backgroundColor: "#d1d5db",
                      },
                    }}
                  >
                    <DesktopWindowsIcon
                      sx={{
                        fontSize: "clamp(20px, 4vw, 32px)",
                        color: "#374151",
                      }}
                    />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: { md: "30%", xs: "100%" },
              border: "1px solid #e5e7eb",
              p: 1,
              borderRadius: 2,
              backgroundColor: "#ffffff",
              height: '100%'
            }}
          >
            <Note roomId={roomId} />
          </Box>
        </Box>
        <Box sx={{ width: "100%", display: "flex", flexDirection: { md: "row", xs: "column" }, gap: 1, p: 1, borderRadius: 2 }}>
          <Box sx={{ width: { md: "60%", xs: "100%" }, p: 1, backgroundColor: "white", borderRadius: 2, border: "1px solid #e5e7eb" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 1,
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: {
                    xs: "1rem",
                    sm: "1.1rem",
                    md: "1.3rem",
                  },
                }}
              >
                Resume Analyze:
              </Typography>
              <Button
                onClick={handleResumeAnalysis}
                sx={{
                  border: "1px solid black",
                  paddingY: 0,
                  paddingX: 2,
                  minWidth: "unset",
                  backgroundColor: "black"
                }}
              >
                <ManageSearchIcon
                  sx={{
                    fontSize: { xs: "1.2rem", md: "1.5rem" },
                    color: "white",
                  }}
                />
              </Button>
            </Box>

            <Divider sx={{ color: "black" }}></Divider>

            {
              resume ? (
                <Box sx={{
                  height: "190px",
                  overflowY: "auto",
                }}>
                  <Box>
                    <Typography sx={{ textTransform: "uppercase", fontWeight: "bold", color: "#1f2937", fontSize: { xs: "0.9rem", md: "1rem" } }}>{resume.name}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                      flexWrap: "wrap",
                    }}
                  >

                    <Typography sx={{ fontWeight: "bold", color: "#1f2937", mr: "5px" }}>
                      Skills:
                    </Typography>
                    {
                      resume.skills.map((skill, index) => {
                        return (
                          <Typography key={index} sx={{ color: "#747b7a", fontSize: { xs: "0.7rem", md: "0.8rem", sm: "0.8rem" } }}>
                            {skill},
                          </Typography>
                        )
                      })
                    }
                  </Box>
                  <Box >
                    <Typography sx={{ fontWeight: "bold", color: "#1f2937" }}>Projects:</Typography>
                    <Box sx={{ px: 1 }}>

                      {
                        resume.projects.map((project, index) => {
                          return (
                            <Typography
                              key={index}
                              sx={{
                                color: "black",
                                fontSize: { xs: "0.8rem", md: "0.9rem", sm: "0.9rem" },
                                fontWeight: "bold",
                              }}
                            >
                              {project.name}:{" "}
                              <Box
                                component="span"
                                sx={{
                                  fontSize: { xs: "0.7rem", md: "0.8rem", sm: "0.8rem" },
                                  fontWeight: "normal",
                                  color: "#747b7a",
                                }}
                              >
                                {project.description}
                              </Box>
                            </Typography>
                          )
                        })
                      }
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ mt: 2, mb: 2, width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 2 }}>
                  <TroubleshootIcon sx={{ fontSize: { xs: 60 } }} />
                  <Typography color="gray" textAlign="center">
                    Click "Resume Analyze" to generate analysis.
                  </Typography>
                </Box>
              )
            }
          </Box>
          <Box sx={{ width: { md: "40%", xs: "100%" }, p: 1, backgroundColor: "white", borderRadius: 2, border: "1px solid #e5e7eb" }} >
            <Box>
              <Typography sx={{
                color: "#1f2937", fontWeight: "bold",
                fontSize: {
                  xs: "1rem",
                  sm: "1.1rem",
                  md: "1.3rem",
                },
                mb: 1
              }}>Questions suggestions</Typography>
              <Divider sx={{ color: "black" }}></Divider>


              {
                resume ? (
                  <Box sx={{
                    maxHeight: "190px",
                    overflowY: "auto",
                  }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        width: "100%",
                        flexWrap: "wrap",
                      }}
                    >
                      {
                        resume.interview_questions.map((question, index) => {
                          return (
                            <>
                              <Typography key={index} sx={{ fontWeight: "bold", color: "#1f2937" }}>
                                Question {index + 1}
                              </Typography>
                              <Typography sx={{
                                fontSize: { xs: "0.7rem", md: "0.8rem", sm: "0.8rem" },
                                fontWeight: "normal",
                                color: "#747b7a",
                              }}>
                                {question}
                              </Typography>
                            </>
                          )
                        })
                      }
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ mt: 2, mb: 2, width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 2 }}>
                    <CycloneIcon sx={{ fontSize: { xs: 60 } }} />
                    <Typography color="gray" textAlign="center">
                      Click "Resume Analyze" to generate questions.
                    </Typography>
                  </Box>
                )
              }
            </Box>
          </Box>
        </Box>
      </Box>
      <Button onClick={startRecording}>RECORDEREINFERIFIRF</Button>
      <Button onClick={stopRecording}>stop</Button>
    </Box>
  );
}