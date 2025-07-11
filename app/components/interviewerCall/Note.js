"use client"

import { Typography, Box, TextField, IconButton } from "@mui/material";
import NoteIcon from '@mui/icons-material/Note';
import SendIcon from '@mui/icons-material/Send';
import { useState , useEffect} from "react";
import socket from "../../_api/socket";
import toast from "react-hot-toast";


export default function Note({ roomId }) {
    const [note, setNote] = useState("");

    const handleChange = (e) => {
        setNote(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (note.trim() === "") return;
        socket.emit("note-submitted", { note, roomId });
        toast.success("Note submitted successfully!");
    }

    useEffect(() => {
        socket.on("note-saved", ({ message }) => {
            toast.success(message);
            setNote("");
        });

        return () => {
            socket.off("note-saved");
        };
    }, []);

    const inputStyle = {
        '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: '2px solid black',
            },
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: '2px solid black',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            border: '2px solid black',
        },
        '& .MuiInputLabel-root': {
            color: 'black',
        },
        '& .Mui-focused .MuiInputLabel-root': {
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, height: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                <Typography sx={{
                    fontWeight: "bold", fontSize: {
                        xs: "18px",
                        sm: "20px",
                        md: "25px",
                    },
                }}>Interview Notes</Typography>
                <NoteIcon fontSize="medium" />
            </Box>

            <Box sx={{ width: "100%", height: "100%", p: 1 }}>
                <form action="" onSubmit={handleSubmit} >
                    <TextField
                        name="note"
                        placeholder="Add your observations, candidate responses,and evaluation notes..."
                        multiline
                        fullWidth
                        onChange={handleChange}
                        value={note}
                        sx={inputStyle}
                        rows={6}
                    />
                    <IconButton type="submit" sx={{ mt: 1, p: 1, backgroundColor: "#e5e7eb", borderRadius: "50%", }}>
                        <SendIcon sx={{ color: "#374151", fontSize: "25px", }} />
                    </IconButton>
                </form>
            </Box>
        </Box>
    );
}