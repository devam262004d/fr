"use client"
import { Box, List, ListItem, ListItemText, IconButton, Typography } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter, usePathname } from "next/navigation";
import ViewListIcon from '@mui/icons-material/ViewList';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';


export default function DashboardLayout({ children }) {
    const router = useRouter();
    const [role, setRole] = useState(null);
    const userType = useSelector((state) => state.auth.type);

    useEffect(() => {
        if (userType) {
            setRole(userType);
        }
    }, [userType]);
    const allLinks = [
        {
            path: "/dashboard",
            icon: (
                <svg style={{ color: "inherit" }} width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path
                        d="M10.55 2.533a2.25 2.25 0 0 1 2.9 0l6.75 5.695c.508.427.8 1.056.8 1.72v9.802a1.75 1.75 0 0 1-1.75 1.75h-3a1.75 1.75 0 0 1-1.75-1.75v-5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0-.75.75v5a1.75 1.75 0 0 1-1.75 1.75h-3A1.75 1.75 0 0 1 3 19.75V9.947c0-.663.292-1.292.8-1.72l6.75-5.694Z"
                        fill="currentColor"
                    />
                </svg>
            ),
        },
        {
            path: "/dashboard/createJob",
            icon: <WorkIcon sx={{ color: "inherit" }} />,
        },
        {
            path: "/dashboard/alljob",
            icon: <ViewListIcon sx={{ color: "inherit" }} />,
        },
        {
            path: "/dashboard/interviews",
            icon: (
                <svg style={{ color: "inherit" }} width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M13.925 2.503a2.25 2.25 0 0 1 1.94 1.11L16.679 5h2.071A3.25 3.25 0 0 1 22 8.25v9.5A3.25 3.25 0 0 1 18.75 21H5.25A3.25 3.25 0 0 1 2 17.75v-9.5A3.25 3.25 0 0 1 5.25 5h2.08l.875-1.424a2.25 2.25 0 0 1 1.917-1.073h3.803ZM12 8a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 1.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"
                        fill="currentColor"
                    />
                </svg>
            ),
        },
        {
            path: "/dashboard/performance",
            icon: (
                <svg style={{ color: "inherit" }} width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M17 4a1 1 0 1 1 0-2h4a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V5.414l-5.793 5.793a1 1 0 0 1-1.414 0L10 8.414l-5.293 5.293a1 1 0 0 1-1.414-1.414l6-6a1 1 0 0 1 1.414 0L13.5 9.086 18.586 4H17ZM5 18v3a1 1 0 1 1-2 0v-3a1 1 0 1 1 2 0Zm5-4a1 1 0 1 0-2 0v7a1 1 0 1 0 2 0v-7Zm4 1a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Zm6-4a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0V11Z"
                        fill="currentColor"
                    />
                </svg>
            ),
        },
          {
            path: "/dashboard",
            icon: (
                <svg style={{ color: "inherit" }} width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path
                        d="M10.55 2.533a2.25 2.25 0 0 1 2.9 0l6.75 5.695c.508.427.8 1.056.8 1.72v9.802a1.75 1.75 0 0 1-1.75 1.75h-3a1.75 1.75 0 0 1-1.75-1.75v-5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0-.75.75v5a1.75 1.75 0 0 1-1.75 1.75h-3A1.75 1.75 0 0 1 3 19.75V9.947c0-.663.292-1.292.8-1.72l6.75-5.694Z"
                        fill="currentColor"
                    />
                </svg>
            ),
        },
        {
            path: "/dashboard/interviewscan",
            icon: (
                <svg style={{ color: "inherit" }} width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M13.925 2.503a2.25 2.25 0 0 1 1.94 1.11L16.679 5h2.071A3.25 3.25 0 0 1 22 8.25v9.5A3.25 3.25 0 0 1 18.75 21H5.25A3.25 3.25 0 0 1 2 17.75v-9.5A3.25 3.25 0 0 1 5.25 5h2.08l.875-1.424a2.25 2.25 0 0 1 1.917-1.073h3.803ZM12 8a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 1.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"
                        fill="currentColor"
                    />
                </svg>
            ),
        },
        {
            path: "/dashboard/candidatesperformance",
            icon: (
                <svg style={{ color: "inherit" }} width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M17 4a1 1 0 1 1 0-2h4a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V5.414l-5.793 5.793a1 1 0 0 1-1.414 0L10 8.414l-5.293 5.293a1 1 0 0 1-1.414-1.414l6-6a1 1 0 0 1 1.414 0L13.5 9.086 18.586 4H17ZM5 18v3a1 1 0 1 1-2 0v-3a1 1 0 1 1 2 0Zm5-4a1 1 0 1 0-2 0v7a1 1 0 1 0 2 0v-7Zm4 1a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Zm6-4a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0V11Z"
                        fill="currentColor"
                    />
                </svg>
            ),
        },
      
    ];


    const navLink =
        role === "Candidate"
            ? allLinks.slice(5)
            : allLinks.slice(0, 5);

    const pathName = usePathname();


    if (role === null) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                    <CircularProgress color="inherit" />
                </Stack>
            </Box>
        );
    }

    return (
        <Box sx={{ display: "flex", height: "100vh", width: "100%", flexDirection: "row", gap: 1 }}>
            <Box
                sx={{
                    width: { md: "60px", sm: "55px", xs: "40px" },
                    backgroundColor: "white",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2, justifyContent: "center" }}>

                    {
                        navLink.map((item, index) => {
                            const isActive = item.path !== "#" && pathName === item.path;
                            return (
                                <IconButton
                                    key={index}
                                    onClick={() => router.push(`${item.path}`)}
                                    disableRipple
                                    disableFocusRipple
                                    sx={{
                                        backgroundColor: isActive ? "black" : "transparent",
                                        boxShadow: isActive ? "0 4px 12px rgba(0, 0, 0, 0.08)" : "none",
                                        width: "100%",
                                        justifyContent: "center",
                                        borderRadius: 0,
                                        // padding: "8px 12px",          
                                        transition: "all 0.3s ease",
                                        color: isActive ? "white" : "black",
                                    }}
                                >
                                    {item.icon}
                                </IconButton>

                            );
                        })
                    }

                </Box>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    pr: 2,
                    pt: 2,
                    overflowY: "auto",
                    scrollbarWidth: "none",          // Firefox
                    "&::-webkit-scrollbar": {
                        display: "none",             // Chrome, Safari
                    },
                    msOverflowStyle: "none",         // IE and Edge
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
