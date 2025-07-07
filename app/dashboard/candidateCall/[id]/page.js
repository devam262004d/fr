"use client";

import { useEffect, useRef } from "react";
import socket from "../../../_api/socket";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CandidateCall() {
    const { id: roomId } = useParams();
    const router = useRouter();

    const hasJoinedRef = useRef(false);
    const peerRef = useRef(null);
    const offerBufferRef = useRef(null);

    useEffect(() => {
        if (!hasJoinedRef.current) {
            socket.emit("join-room", { roomId, role: "candidate" });
            hasJoinedRef.current = true;
        }
    }, [roomId]);

    useEffect(() => {
        const errorHandler = ({ message }) => {
            toast.error(message);
            if (
                message === "Please wait for the interviewer to join" ||
                message === "Room is full"
            ) {
                router.push("/dashboard/interviewscan");
            }
        };

        const startMediaAndConnection = async () => {
            try {
                // 1. Get user media
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

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
            }
        };

        // Handler for offer from interviewer
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
            }
        };

        // Handler for ICE candidates
        const handleRemoteICE = async ({ candidate }) => {
            if (peerRef.current && candidate) {
                try {
                    await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
                } catch (err) {
                    console.error("Error adding remote ICE candidate:", err);
                }
            }
        };

        // Start setup
        startMediaAndConnection();

        // Set up socket events
        socket.on("error", errorHandler);
        socket.on("offer", handleOffer);
        socket.on("ice-candidate", handleRemoteICE);

        // Clean up
        return () => {
            socket.off("error", errorHandler);
            socket.off("offer", handleOffer);
            socket.off("ice-candidate", handleRemoteICE);

            if (peerRef.current) {
                peerRef.current.getSenders().forEach(sender => peerRef.current.removeTrack(sender));
                peerRef.current.close();
                peerRef.current = null;
            }

            const localVideo = document.getElementById("localVideo");
            if (localVideo?.srcObject) {
                localVideo.srcObject.getTracks().forEach(track => track.stop());
                localVideo.srcObject = null;
            }
        };
    }, [roomId, router]);

    return (
        <div style={{ textAlign: "center", padding: "2rem" }}>
            <h2>🎙️ Candidate</h2>
            <video id="localVideo" autoPlay muted playsInline style={{ width: "45%", marginRight: "1rem" }} />
            <video id="remoteVideo" autoPlay playsInline style={{ width: "45%" }} />
        </div>
    );
}
