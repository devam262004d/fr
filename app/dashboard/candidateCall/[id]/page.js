"use client";

import { useEffect, useRef, useState } from "react";
import socket from "../../../_api/socket";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Box, TextField, Button, Typography, Chip, IconButton, Divider, } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { keyframes } from "@emotion/react";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import VideocamIcon from '@mui/icons-material/Videocam';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicOffIcon from '@mui/icons-material/MicOff';

export default function CandidateCall() {
    const { id: roomId } = useParams();
    const router = useRouter();
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isMicOn, setIsMicOn] = useState(true);
    const [isCallActive, setIsCallActive] = useState(false);

    const hasJoinedRef = useRef(false);
    const peerRef = useRef(null);
    const offerBufferRef = useRef(null);
    const localStreamRef = useRef(null);

    useEffect(() => {
        if (!hasJoinedRef.current) {
            socket.emit("join-room", { roomId, role: "Candidate" });
            hasJoinedRef.current = true;
        }
    }, [roomId]);

    useEffect(() => {
        const errorHandler = ({ message }) => {
            toast.error(message);
            if (message === "Please wait for the interviewer to join" || message === "Room is full") {
                stopStream();
            }
        };

        const startMediaAndConnection = async () => {
            try {
                // 1. Get user media
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });
                localStreamRef.current = stream;
                setIsCallActive(true);
                setIsCameraOn(true);
                setIsMicOn(true);

                // 2. Show local video
                const localVideo = document.getElementById("localVideo");
                if (localVideo) {
                    localVideo.srcObject = stream;
                }

                // 3. Initialize peer connection
                peerRef.current = new RTCPeerConnection({
                    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
                });

                // 4. Add tracks to peer
                stream.getTracks().forEach(track => {
                    peerRef.current.addTrack(track, stream);
                });

                // 5. Handle ICE candidates
                peerRef.current.onicecandidate = (event) => {
                    if (event.candidate) {
                        socket.emit("ice-candidate", { candidate: event.candidate, roomId });
                    }
                };

                // 6. Handle remote stream
                peerRef.current.ontrack = (event) => {
                    const remoteVideo = document.getElementById("remoteVideo");
                    if (remoteVideo) {
                        remoteVideo.srcObject = event.streams[0];
                    }
                };

                // 7. If offer was received before peer was ready
                if (offerBufferRef.current) {
                    await handleOffer(offerBufferRef.current);
                    offerBufferRef.current = null;
                }
            } catch (err) {
                console.error("Error accessing media:", err);
                toast.error("Failed to access camera or microphone");
                stopStream();
            }
        };

        const handleOffer = async ({ offer }) => {
            if (!peerRef.current) {
                console.warn("Peer not ready. Buffering offer.");
                offerBufferRef.current = { offer };
                return;
            }

            try {
                console.log("📩 Received offer");
                await peerRef.current.setRemoteDescription(new RTCSessionDescription(offer));
                const answer = await peerRef.current.createAnswer();
                await peerRef.current.setLocalDescription(answer);
                socket.emit("answer", { answer, roomId });
            } catch (err) {
                console.error("Error handling offer:", err);
                stopStream();
            }
        };

        const handleRemoteICE = async ({ candidate }) => {
            if (peerRef.current && candidate) {
                try {
                    await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
                } catch (err) {
                    console.error("Error adding remote ICE candidate:", err);
                }
            }
        };

        const handleUserDisconnected = async ({ message }) => {
            console.log("user dissconnected")
            toast.error(message)
        }


        const handleCallEnded = () => {
            toast("Interviewer has ended the call");
            stopStream();
        };

        startMediaAndConnection();

        socket.on("error", errorHandler);
        socket.on("offer", handleOffer);
        socket.on("ice-candidate", handleRemoteICE);
        socket.on("call-ended", handleCallEnded);
        socket.on("userDisconnected", handleUserDisconnected);

        return () => {
            stopStream();
            socket.off("error", errorHandler);
            socket.off("offer", handleOffer);
            socket.off("ice-candidate", handleRemoteICE);
            socket.off("call-ended", handleCallEnded);
            socket.off("userDisconnected", handleUserDisconnected);
        };
    }, [roomId, router]);

    const stopStream = () => {
        if (!isCallActive) return;

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

            // Update state
            setIsCallActive(false);
            setIsCameraOn(false);
            setIsMicOn(false);

            // Notify server
            socket.emit("leave-room", { roomId });

            // Redirect
            router.push("/");

            toast.success("Call ended");
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
            toast.success(`Camera ${videoTracks[0]?.enabled ? "on" : "off"}`);
        }
    };

    const toggleMic = () => {
        if (localStreamRef.current) {
            const audioTracks = localStreamRef.current.getAudioTracks();
            audioTracks.forEach(track => {
                track.enabled = !track.enabled;
            });
            setIsMicOn(audioTracks[0]?.enabled);
            toast.success(`Microphone ${audioTracks[0]?.enabled ? "on" : "muted"}`);
        }
    };


    const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.2; }
  100% { opacity: 1; }
`;


    return (
        // <div style={{ textAlign: "center", padding: "2rem" }}>
        //     <h2>🎙️ Candidate</h2>
        //     <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
        //         <video
        //             id="localVideo"
        //             autoPlay
        //             muted
        //             playsInline
        //             style={{
        //                 width: "45%",
        //                 marginRight: "1rem",
        //                 border: isCameraOn ? "3px solid green" : "3px solid red"
        //             }}
        //         />
        //         <video
        //             id="remoteVideo"
        //             autoPlay
        //             playsInline
        //             style={{
        //                 width: "45%",
        //                 border: "3px solid blue"
        //             }}
        //         />
        //     </div>
        //     <div style={{ marginTop: "1rem" }}>
        //         <button
        //             onClick={toggleCamera}
        //             style={{
        //                 margin: "0 0.5rem",
        //                 backgroundColor: isCameraOn ? "#4CAF50" : "#f44336",
        //                 color: "white"
        //             }}
        //         >
        //             {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
        //         </button>
        //         <button
        //             onClick={toggleMic}
        //             style={{
        //                 margin: "0 0.5rem",
        //                 backgroundColor: isMicOn ? "#4CAF50" : "#f44336",
        //                 color: "white"
        //             }}
        //         >
        //             {isMicOn ? "Mute Mic" : "Unmute Mic"}
        //         </button>
        //         <button
        //             onClick={stopStream}
        //             style={{
        //                 margin: "0 0.5rem",
        //                 backgroundColor: "#ff4444",
        //                 color: "white",
        //                 fontWeight: "bold"
        //             }}
        //         >
        //             Leave Call
        //         </button>
        //     </div>
        // </div>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
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
                        Candidate
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
            <Box sx={{ backgroundColor: "#f9fafb",p:1, borderRadius:2 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, p: 1, border:"1px solid #e5e7eb", borderRadius:2, backgroundColor:"white" }}>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 1 , width:"100%"}}>
                        <Box
                            sx={{
                                flex: 1,
                                width:"50%",
                                height: { xs: "25vh", sm: "35vh", md: "55vh" },
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
                              width:"50%",
                                height: { xs: "25vh", sm: "35vh", md: "55vh" },
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
    );
}