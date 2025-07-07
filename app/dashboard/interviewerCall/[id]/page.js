"use client";

import { useEffect, useRef } from "react";
import socket from "../../../_api/socket";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function InterviewerCall() {
  const { id: roomId } = useParams();
  const router = useRouter();

  const peerRef = useRef(null);
  const hasJoinedRef = useRef(false);

  useEffect(() => {
    // ✅ Handle socket errors (like room full)
    const errorHandler = ({ message }) => {
      toast.error(message);
      if (message === "Room is full") {
        router.push("/dashboard/interviews");
      }
    };

    // ✅ Handle remote answer
    const answerHandler = async ({ answer }) => {
      if (!peerRef.current) return;
      await peerRef.current.setRemoteDescription(new RTCSessionDescription(answer));
    };

    // ✅ Handle ICE candidates
    const iceHandler = async ({ candidate }) => {
      if (peerRef.current && candidate) {
        try {
          await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (err) {
          console.warn("Failed to add ICE candidate:", err);
        }
      }
    };

    // ✅ Handle 'user-joined' → create & send offer
    const offerHandler = async () => {
      if (!peerRef.current) {
        console.log("📞 Peer connection not ready yet");
        return;
      }
      try {
        console.log("📞 Creating offer...");
        const offer = await peerRef.current.createOffer();
        await peerRef.current.setLocalDescription(offer);
        socket.emit("offer", { offer, roomId });
        console.log("📨 Offer sent");
      } catch (err) {
        console.error("Failed to create/send offer:", err);
      }
    };

    // ✅ Start camera and setup peer connection
    const start = async () => {
      try {
        // 1. Get media stream
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        // 2. Set local video
        const localVideo = document.getElementById("localVideo");
        if (localVideo) {
          localVideo.srcObject = stream;
        }

        // 3. Create RTCPeerConnection
        peerRef.current = new RTCPeerConnection({
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        // 4. Add audio/video tracks to peer
        stream.getTracks().forEach(track => {
          peerRef.current.addTrack(track, stream);
        });

        // 5. Handle ICE candidates
        peerRef.current.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("ice-candidate", { candidate: event.candidate, roomId });
          }
        };

        // 6. Handle remote track
        peerRef.current.ontrack = (event) => {
          const remoteVideo = document.getElementById("remoteVideo");
          if (remoteVideo) {
            remoteVideo.srcObject = event.streams[0];
          }
        };

      } catch (err) {
        console.error("❌ Error accessing camera/mic:", err);
        toast.error("Failed to access media devices.");
      }
    };

    // ✅ Initial join and setup
    const setup = async () => {
      if (hasJoinedRef.current) return;
      hasJoinedRef.current = true;

      await start(); // setup media + peer connection
      socket.emit("join-room", { roomId, role: "interviewer" });
    };

    setup();

    // ✅ Register socket listeners
    socket.on("error", errorHandler);
    socket.on("user-joined", offerHandler);
    socket.on("answer", answerHandler);
    socket.on("ice-candidate", iceHandler);

    // ✅ Cleanup on unmount
    return () => {
      console.log("🧹 Cleaning up InterviewerCall");

      socket.off("error", errorHandler);
      socket.off("user-joined", offerHandler);
      socket.off("answer", answerHandler);
      socket.off("ice-candidate", iceHandler);

      if (peerRef.current) {
        peerRef.current.close();
        peerRef.current = null;
      }

      hasJoinedRef.current = false;
    };
  }, [roomId, router]);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>🎥 Interviewer</h2>
      <video id="localVideo" autoPlay muted playsInline style={{ width: "45%", marginRight: "1rem" }} />
      <video id="remoteVideo" autoPlay playsInline style={{ width: "45%" }} />
    </div>
  );
}
