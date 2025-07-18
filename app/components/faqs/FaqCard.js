

import { Box, List, ListItem, ListItemText, IconButton, Typography } from "@mui/material";
import Person3Icon from '@mui/icons-material/Person3';
import PersonIcon from '@mui/icons-material/Person';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';

export default function FaqCard() {
    return (

        <Box sx={{ width: "100%", display: "flex", flexDirection: { md: "row", xs: "column", sm: "column" }, gap: 2 }}>
            <Box
                sx={{
                    border: "1px solid #e5e7eb",
                    width: { md: "33.33%", xs: "100%", sm: "100%" },
                    backgroundColor: "white",
                    borderRadius: 2,
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: 1.5,
                    transition: "0.3s ease-in-out",
                    "&:hover": {
                        boxShadow: 3,
                        transform: "scale(1)",
                        cursor: "pointer",
                    },
                }}
            >
                <PersonIcon sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: "#4B5563" }} />
                <Typography sx={{ fontWeight: "bold", fontSize: { xs: "16px", sm: "18px", md: "20px" } }}>
                    For Interviewers
                </Typography>
                <Typography
                    variant="caption"
                    sx={{ color: "gray", fontSize: { xs: "12px", sm: "13px", md: "14px" } }}
                >
                    Questions about scheduling and conducting interviews
                </Typography>
            </Box>
            <Box
                sx={{
                    border: "1px solid #e5e7eb",
                    width: { md: "33.33%", xs: "100%", sm: "100%" },
                    backgroundColor: "white",
                    borderRadius: 2,
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: 1.5,
                    transition: "0.3s ease-in-out",
                    "&:hover": {
                        boxShadow: 3,
                        transform: "scale(1.02)",
                        cursor: "pointer",
                    },
                }}
            >
                <Person3Icon sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: "#4B5563" }} />
                <Typography sx={{ fontWeight: "bold", fontSize: { xs: "16px", sm: "18px", md: "20px" } }}>
                   For Candidates
                </Typography>
                <Typography
                    variant="caption"
                    sx={{ color: "gray", fontSize: { xs: "12px", sm: "13px", md: "14px" } }}
                >
                   Help with joining interviews and technical requirements
                </Typography>
            </Box>
            <Box
                sx={{
                    border: "1px solid #e5e7eb",
                    width: { md: "33.33%", xs: "100%", sm: "100%" },
                    backgroundColor: "white",
                    borderRadius: 2,
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: 1.5,
                    transition: "0.3s ease-in-out",
                    "&:hover": {
                        boxShadow: 3,
                        transform: "scale(1.02)",
                        cursor: "pointer",
                    },
                }}
            >
                <HeadsetMicIcon sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: "#4B5563" }} />
                <Typography sx={{ fontWeight: "bold", fontSize: { xs: "16px", sm: "18px", md: "20px" } }}>
                    Technical Support
                </Typography>
                <Typography
                    variant="caption"
                    sx={{ color: "gray", fontSize: { xs: "12px", sm: "13px", md: "14px" } }}
                >
                    Troubleshooting and technical assistance
                </Typography>
            </Box>
        </Box>


    );
}