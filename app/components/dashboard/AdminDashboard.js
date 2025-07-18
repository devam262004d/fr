"use client"


import {
  Box,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
  Typography,
  Button,
  Divider
} from "@mui/material";
import BookIcon from '@mui/icons-material/Book';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import StarIcon from '@mui/icons-material/Star';
import TodayIcon from '@mui/icons-material/Today';
import { useRouter } from 'next/navigation';


export default function AdminDashboard() {
  const router = useRouter();
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <Typography sx={{
          fontWeight: "bold",  fontWeight: "bold", fontSize: { md: "1.5rem", sm: "1.4rem", xs: "1.3rem" }
        }}>Dashboard Overview</Typography>
        <Typography sx={{ color: "#4b5563", fontSize: { xs: "0.70rem", sm: "1rem", md: "1.1rem" } }}>Welcome back! Here's what's happening with your interviews today.</Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1, alignItems: "center", mt: 1 }}>
          <Button 
          onClick={()=>{
            router.push("/dashboard/createJob")
          }}
          sx={{
            textTransform: "none",
            border: "1px solid black",
            color: "white",
            backgroundColor: "#111827",
            borderRadius: 2,
            fontSize: {
              xs: "0.75rem",
              sm: "0.875rem",
              md: "1rem",
            },
            px: {
              xs: 1.5,
              sm: 2,
              md: 3,
            },
            py: {
              xs: 0.5,
              sm: 0.75,
            },
            gap: 1,
          }}>
            <svg
              width="1.5em"
              height="1.5em"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{ verticalAlign: "middle" }}
            >
              <path
                d="M11.883 3.007 12 3a1 1 0 0 1 .993.883L13 4v7h7a1 1 0 0 1 .993.883L21 12a1 1 0 0 1-.883.993L20 13h-7v7a1 1 0 0 1-.883.993L12 21a1 1 0 0 1-.993-.883L11 20v-7H4a1 1 0 0 1-.993-.883L3 12a1 1 0 0 1 .883-.993L4 11h7V4a1 1 0 0 1 .883-.993L12 3l-.117.007Z"
                fill="currentColor"
              />
            </svg>
            Schedule Interview
          </Button>
          <Button sx={{
            textTransform: "none",
            border: "1px solid black",
            color: "black",
            backgroundColor: "white",
            borderRadius: 2,
            fontSize: {
              xs: "0.75rem",
              sm: "0.875rem",
              md: "1rem",
            },
            px: {
              xs: 1.5,
              sm: 2,
              md: 3,
            },
            py: {
              xs: 0.5,
              sm: 0.75,
            },
            gap: 1,
          }}>
            <svg width="1.5em"
              height="1.5em" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11 17.5a6.47 6.47 0 0 1 1.023-3.5h-7.77a2.249 2.249 0 0 0-2.25 2.25v.919c0 .572.18 1.13.511 1.596C4.056 20.929 6.58 22 10 22c.932 0 1.797-.08 2.592-.24A6.475 6.475 0 0 1 11 17.502ZM15 7.005a5 5 0 1 0-10 0 5 5 0 0 0 10 0Z" fill="#000000" /><path d="M23 17.5a5.5 5.5 0 1 0-11 0 5.5 5.5 0 0 0 11 0Zm-5.59-3.492L17.5 14l.09.008a.5.5 0 0 1 .402.402l.008.09V17h2.504l.09.008a.5.5 0 0 1 .402.402l.008.09-.008.09a.5.5 0 0 1-.402.402l-.09.008H18L18 20.5l-.008.09a.5.5 0 0 1-.402.402L17.5 21l-.09-.008a.5.5 0 0 1-.402-.402L17 20.5V18h-2.496l-.09-.008a.5.5 0 0 1-.402-.402l-.008-.09.008-.09a.5.5 0 0 1 .402-.402l.09-.008H17L17 14.5l.008-.09a.5.5 0 0 1 .402-.402Z" fill="#000000" /></svg>
            Add Candidate
          </Button>
        </Box>
        <Divider sx={{
          borderColor: "black",
          borderBottomWidth: 2,
          mt: 2,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)"
        }} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: { md: "row", xs: "column", sm: "column" }, gap: 1, mt: 2, justifyContent: "center", alignItems: "center" }}>

        <Box sx={{ width: { md: "50%", sm: "100%", xs: "100%" }, display: "flex", flexDirection: { sm: "row", md: "row", xs: "column" }, gap: 1 }}>

          <Box sx={{ border: "1px solid #e5e7eb", p: 1, width: { md: "50%", xs: "100%", sm: "50%" }, borderRadius: 2, backgroundColor: "#f9fafb", display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "center", alignItems: "center" }}>
              <Box sx={{ width: "80%" }}>
                <Typography sx={{ color: "#4b5563", fontSize: "clamp(18px, 2vw, 20px)" }}>Total Interviews</Typography>
                <Typography sx={{ fontWeight: "bold", mb: 1, fontSize: "clamp(20px, 2vw, 24px)" }}>142</Typography>
              </Box>
              <Box sx={{ width: "20%" }}>
                <BookIcon sx={{ fontSize: "2rem" }} />
              </Box>
            </Box>
            <Box>
              <Typography sx={{ color: "#6b7280", fontSize: { md: "1rem", xs: "0.7rem", sm: "0.8rem" } }}>+12% from last month</Typography>
            </Box>
          </Box>
          <Box sx={{ border: "1px solid #e5e7eb", p: 1, width: { md: "50%", xs: "100%", sm: "50%" }, borderRadius: 2, backgroundColor: "#f9fafb", display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "center", alignItems: "center" }}>
              <Box sx={{ width: "80%" }}>
                <Typography sx={{ color: "#4b5563", fontSize: "clamp(18px, 2vw, 20px)" }}>Active Candidates</Typography>
                <Typography sx={{ fontWeight: "bold", mb: 1, fontSize: "clamp(20px, 2vw, 24px)" }}>89</Typography>
              </Box>
              <Box sx={{ width: "20%" }}>
                <svg width="35" height="35" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11 17.5a6.47 6.47 0 0 1 1.023-3.5h-7.77a2.249 2.249 0 0 0-2.25 2.25v.919c0 .572.18 1.13.511 1.596C4.056 20.929 6.58 22 10 22c.932 0 1.797-.08 2.592-.24A6.475 6.475 0 0 1 11 17.502ZM15 7.005a5 5 0 1 0-10 0 5 5 0 0 0 10 0Z" fill="#000000" /><path d="M23 17.5a5.5 5.5 0 1 0-11 0 5.5 5.5 0 0 0 11 0Zm-5.59-3.492L17.5 14l.09.008a.5.5 0 0 1 .402.402l.008.09V17h2.504l.09.008a.5.5 0 0 1 .402.402l.008.09-.008.09a.5.5 0 0 1-.402.402l-.09.008H18L18 20.5l-.008.09a.5.5 0 0 1-.402.402L17.5 21l-.09-.008a.5.5 0 0 1-.402-.402L17 20.5V18h-2.496l-.09-.008a.5.5 0 0 1-.402-.402l-.008-.09.008-.09a.5.5 0 0 1 .402-.402l.09-.008H17L17 14.5l.008-.09a.5.5 0 0 1 .402-.402Z" fill="#000000" /></svg>
              </Box>
            </Box>
            <Box>
              <Typography sx={{ color: "#6b7280", fontSize: { md: "1rem", xs: "0.7rem", sm: "0.8rem" } }}>+8% from last month</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: { md: "50%", sm: "100%", xs: "100%" }, display: "flex", flexDirection: { sm: "row", md: "row", xs: "column" }, gap: 1 }}>
          <Box sx={{ border: "1px solid #e5e7eb", p: 1, width: { md: "50%", xs: "100%", sm: "50%" }, borderRadius: 2, backgroundColor: "#f9fafb", display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "center", alignItems: "center" }}>
              <Box sx={{ width: "80%" }}>
                <Typography sx={{ color: "#4b5563", fontSize: "clamp(18px, 2vw, 20px)" }}>Success Rate</Typography>
                <Typography sx={{ fontWeight: "bold", mb: 1, fontSize: "clamp(20px, 2vw, 24px)" }}>76%</Typography>
              </Box>
              <Box sx={{ width: "20%" }}>
                <svg width="35" height="35" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 5.23a2.25 2.25 0 0 1 2.25-2.25h1.5A2.25 2.25 0 0 1 15 5.23V21H9V5.23ZM7.5 10H5.25A2.25 2.25 0 0 0 3 12.25v8c0 .415.336.75.75.75H7.5V10ZM16.5 21h3.75a.75.75 0 0 0 .75-.75v-11A2.25 2.25 0 0 0 18.75 7H16.5v14Z" fill="#000000" /></svg>
              </Box>
            </Box>
            <Box>
              <Typography sx={{ color: "#6b7280", fontSize: { md: "1rem", xs: "0.7rem", sm: "0.8rem" } }}>+3% from last month</Typography>
            </Box>
          </Box>
          <Box sx={{ border: "1px solid #e5e7eb", p: 1, width: { md: "50%", xs: "100%", sm: "50%" }, borderRadius: 2, backgroundColor: "#f9fafb", display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "center", alignItems: "center" }}>
              <Box sx={{ width: "80%" }}>
                <Typography sx={{ color: "#4b5563", fontSize: "clamp(18px, 2vw, 20px)" }}>Total Interviews</Typography>
                <Typography sx={{ fontWeight: "bold", mb: 1, fontSize: "clamp(20px, 2vw, 24px)" }}>142</Typography>
              </Box>
              <Box sx={{ width: "20%" }}>
                <BookIcon sx={{ fontSize: "2rem" }} />
              </Box>
            </Box>
            <Box>
              <Typography sx={{ color: "#6b7280", fontSize: { md: "1rem", xs: "0.7rem", sm: "0.8rem" } }}>+12% from last month</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "100%", p: 1, mt: 1.5, backgroundColor: "#f9fafb", borderRadius: 2, display: "flex", flexDirection: { md: "row", xs: "column", sm: "column" }, gap: 1 }}>
        <Box sx={{ width: { md: "70%", xs: "100%", sm: "100%" }, backgroundColor: "white", p: 1, borderRadius: 2, border: "1px solid #e5e7eb" }}>
          <Typography sx={{ fontWeight: "bold", fontSize: { md: "1.5rem", sm: "1.4rem", xs: "1.3rem" } }}>Performance Metrics</Typography>
          <Divider sx={{ borderColor: "#e5e7eb", borderWidth: 1 }} />
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5, alignItems: "center" }}>
              <Box
                sx={{
                  backgroundColor: "#f3f4f6",
                  width: 50,
                  height: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 2,
                }}
              >
                <AccessTimeFilledIcon />
              </Box>
              <Box>
                <Typography sx={{ color: "#111827", fontSize: { md: "1.2rem", xs: "1rem", sm: "1.2rem" } }}>Avg Interview Duration</Typography>
                <Typography sx={{ color: "#6b7280", fontSize: { md: "0.9rem", xs: "0.8rem", sm: "0.8rem" } }}>This month</Typography>
              </Box>
            </Box>
            <Typography sx={{ fontWeight: "bold", fontSize: { md: "1.6rem", sm: "1.3rem" } }}>42 min</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5, alignItems: "center" }}>
              <Box
                sx={{
                  backgroundColor: "#f3f4f6",
                  width: 50,
                  height: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 2,
                }}
              >
                <StarIcon />
              </Box>
              <Box>
                <Typography sx={{ color: "#111827", fontSize: { md: "1.2rem", xs: "1rem", sm: "1.2rem" } }}>Candidate Rating</Typography>
                <Typography sx={{ color: "#6b7280", fontSize: { md: "0.9rem", xs: "0.8rem", sm: "0.8rem" } }}>Average score</Typography>
              </Box>
            </Box>
            <Typography sx={{ fontWeight: "bold", fontSize: { md: "1.6rem", sm: "1.3rem" } }}>4.2/5</Typography>
          </Box>
        </Box>
        <Box sx={{ width: { md: "30%", xs: "100%", sm: "100%" }, backgroundColor: "white", p: 1, borderRadius: 2, border: "1px solid #e5e7eb" }}>
          <Typography sx={{ fontWeight: "bold", fontSize: { md: "1.5rem", sm: "1.4rem", xs: "1.3rem" } }}>Quick Stats</Typography>
          <Divider sx={{ borderColor: "#e5e7eb", borderWidth: 1 }} />
          <Box sx={{ width: "100%", mt: 1 }}>
            <Box sx={{ width: "100%", backgroundColor: "#f9fafb", p: 1, borderRadius: 2, border: "1px solid #e5e7eb", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <Box sx={{width:"50px", height:"50px",borderRadius:"50%",mb:1, backgroundColor:"#e5e7eb", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <TodayIcon sx={{color:"#4b5563"}} />
              </Box>
              <Typography sx={{fontWeight:"bold", fontSize:{md:"2rem", xs:"1.3rem"}}}>8</Typography>
              <Typography sx={{ color:"#4b5563"}}>Today's Interviews</Typography>
            </Box>
          </Box>
           <Box sx={{ width: "100%", mt: 1 }}>
            <Box sx={{ width: "100%", backgroundColor: "#f9fafb", p: 1, borderRadius: 2, border: "1px solid #e5e7eb", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <Box sx={{width:"50px", height:"50px",borderRadius:"50%",mb:1, backgroundColor:"#e5e7eb", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <svg width="30" height="30" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11 17.5a6.47 6.47 0 0 1 1.022-3.5h-7.77a2.249 2.249 0 0 0-2.248 2.25v.577c0 .892.318 1.756.898 2.435 1.566 1.834 3.952 2.74 7.098 2.74.931 0 1.796-.08 2.593-.24A6.475 6.475 0 0 1 11 17.5ZM10 2.005a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" fill="#4b5563"/><path d="M17.5 12a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm2 5.5h-2V15a.5.5 0 1 0-1 0v3a.5.5 0 0 0 .5.5h2.5a.5.5 0 0 0 0-1Z" fill="#4b5563"/></svg>
              </Box>
              <Typography sx={{fontWeight:"bold", fontSize:{md:"2rem", xs:"1.3rem"}}}>15</Typography>
              <Typography sx={{ color:"#4b5563"}}>Pending Interviews</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}