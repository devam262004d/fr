"use client";

import { useEffect, useRef } from "react";
import socket from "../../../_api/socket";
import { useParams } from "next/navigation";

const CallRoom = () => {
  const params = useParams();
  const id = params.id;

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const localStreamRef = useRef(null);

  const isOffererRef = useRef(false);
  const hasJoinedRef = useRef(false);
  const pendingCandidatesRef = useRef([]); // ❄️ Buffer for early ICE

  const startMedia = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStreamRef.current = stream;
    if (localVideoRef.current) localVideoRef.current.srcObject = stream;

    peerRef.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    // Add local tracks to peer
    stream.getTracks().forEach((track) => {
      peerRef.current.addTrack(track, stream);
    });

    // Handle remote stream
    peerRef.current.ontrack = (e) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = e.streams[0];
      }
    };

    // Send ICE candidates
    peerRef.current.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("ice-candidate", { candidate: e.candidate, roomId: id });
      }
    };

    peerRef.current.onconnectionstatechange = () => {
      console.log("Connection State:", peerRef.current.connectionState);
    };
  };

  useEffect(() => {
    if (!id) return;
    hasJoinedRef.current = true;

    const handleUserJoined = async () => {
      try {
        console.log("🔔 Second user joined, creating offer");
        isOffererRef.current = true;

        const offer = await peerRef.current.createOffer();
        await peerRef.current.setLocalDescription(offer);

        socket.emit("offer", { offer, roomId: id });
      } catch (err) {
        console.error("Error creating offer:", err);
      }
    };

    const handleReceiveOffer = async ({ offer }) => {
      try {
        console.log("📨 Received offer");
        await peerRef.current.setRemoteDescription(new RTCSessionDescription(offer));

        const answer = await peerRef.current.createAnswer();
        await peerRef.current.setLocalDescription(answer);

        socket.emit("answer", { answer, roomId: id });

        // ✅ Apply any queued ICE candidates
        for (const c of pendingCandidatesRef.current) {
          await peerRef.current.addIceCandidate(new RTCIceCandidate(c));
        }
        pendingCandidatesRef.current = [];
      } catch (err) {
        console.error("Error handling offer:", err);
      }
    };

    const handleReceiveAnswer = async ({ answer }) => {
      if (!isOffererRef.current) {
        console.warn("Ignored answer: not the offerer");
        return;
      }
      try {
        console.log("📨 Received answer");
        await peerRef.current.setRemoteDescription(new RTCSessionDescription(answer));

        // ✅ Apply any queued ICE candidates
        for (const c of pendingCandidatesRef.current) {
          await peerRef.current.addIceCandidate(new RTCIceCandidate(c));
        }
        pendingCandidatesRef.current = [];
      } catch (err) {
        console.error("Error handling answer:", err);
      }
    };

    const handleIceCandidate = async ({ candidate }) => {
      try {
        if (!candidate) return;

        const ready = peerRef.current.remoteDescription && peerRef.current.remoteDescription.type;
        if (ready) {
          console.log("❄️ Adding ICE candidate");
          await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        } else {
          console.log("🕓 Queuing ICE candidate");
          pendingCandidatesRef.current.push(candidate);
        }
      } catch (err) {
        console.error("Error handling ICE candidate:", err);
      }
    };

    const handleError = () => {
      console.error("❌ Room full: Max 2 users allowed");
    };

    const handleHelo = () => {
      console.log("✅ Received 'helo' from server");
    };

    // Start camera/mic, then join room
    startMedia().then(() => {
      socket.emit("join-room", { roomId: id });
    });

    // Socket listeners
    socket.on("user-joined", handleUserJoined);
    socket.on("offer", handleReceiveOffer);
    socket.on("answer", handleReceiveAnswer);
    socket.on("ice-candidate", handleIceCandidate);
    socket.on("error", handleError);
    socket.on("helo", handleHelo);

    // Cleanup
    return () => {
      socket.off("user-joined", handleUserJoined);
      socket.off("offer", handleReceiveOffer);
      socket.off("answer", handleReceiveAnswer);
      socket.off("ice-candidate", handleIceCandidate);
      socket.off("error", handleError);
      socket.off("helo", handleHelo);

      if (peerRef.current) {
        peerRef.current.close();
        peerRef.current = null;
      }

      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
        localStreamRef.current = null;
      }

      pendingCandidatesRef.current = [];
    };
  }, [id]);

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "20px", padding: "2rem" }}>
      <video ref={localVideoRef} autoPlay muted playsInline style={{ width: "45%" }} />
      <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "45%" }} />
    </div>
  );
};

export default CallRoom;
