// Only create one socket connection
import { io } from "socket.io-client";

const socket = io("https://interviewserver-9r70.onrender.com/", {
  autoConnect: false,
});

export default socket;
