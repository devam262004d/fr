import { Container, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import Features from "./components/home/Features";
import Advanced from './components/home/Advanced';
import UsersSay from './components/home/UsersSay';

export default function HomePage() {

  return (
    <Box
      sx={{
        width: '100%',
        color: 'black',
        mt: 3
      }}
    >
      <Typography sx={{
        textAlign: "center",
        fontSize: {
          xs: "1.2rem",
          sm: "1.5rem",
          md: "2rem",
        },
        fontWeight: 600
      }}>
        Streamline Your Interview Process
      </Typography>
      <Box sx={{ width: { md: "50%", xs: "100%" }, m: "0 auto", mt: 1 }}>

        <Typography sx={{
          textAlign: "center",
          fontSize: {
            xs: "0.7rem",
            sm: "1rem",
            md: "1rem",
          },
          color: "gray"
          ,
        }} >
          Connect interviewers and candidates seamlessly. Create jobs, conduct interviews, and analyze responses with powerful AI insights.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", mt: 2, gap: 2 }}>
        <Link href="/signup">
          <Button sx={{ backgroundColor: "black", color: "white", fontWeight: "bold", p: 1, borderRadius: 2 }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.057 7.431a2.5 2.5 0 1 1 3.536 3.536 2.5 2.5 0 0 1-3.536-3.536Zm2.475 1.06a1 1 0 1 0-1.414 1.415 1 1 0 0 0 1.414-1.414Z" fill="#ffffff" /><path d="M21.509 4.323a2.75 2.75 0 0 0-1.811-1.81l-.663-.206a6.75 6.75 0 0 0-6.773 1.674l-.996.995a3.498 3.498 0 0 0-4.57.327L5.455 6.546a.75.75 0 0 0 0 1.06l1.591 1.591-.18.18a1.75 1.75 0 0 0 0 2.475l.496.495-1.396.796a.75.75 0 0 0-.158 1.182l3.889 3.89a.75.75 0 0 0 1.181-.159l.798-1.395.497.497a1.75 1.75 0 0 0 2.475 0l.177-.176 1.59 1.59a.75.75 0 0 0 1.06 0l1.242-1.243a3.497 3.497 0 0 0 .328-4.568l.998-.998a6.75 6.75 0 0 0 1.673-6.776l-.206-.664Zm-2.256-.378c.393.122.701.43.823.823l.207.664a5.25 5.25 0 0 1-1.302 5.27l-5.395 5.396a.25.25 0 0 1-.353 0L7.926 10.79a.25.25 0 0 1 0-.353l5.396-5.397a5.25 5.25 0 0 1 5.269-1.301l.662.205Zm-1.289 9.896c.453.766.35 1.769-.308 2.427l-.712.712-1.06-1.059 2.08-2.08ZM7.758 6.364a1.998 1.998 0 0 1 2.428-.308l-2.08 2.08-1.06-1.06.712-.712Zm2.818 9.198-.514.897-2.5-2.5.898-.512 2.116 2.115ZM6.69 18.395a.75.75 0 0 0-1.06-1.061l-2.476 2.475a.75.75 0 0 0 1.061 1.06l2.475-2.474ZM4.745 15.39a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 1 1-1.061-1.06l1.06-1.06a.75.75 0 0 1 1.061 0ZM8.632 20.341a.75.75 0 1 0-1.06-1.06l-1.059 1.058a.75.75 0 0 0 1.06 1.06l1.06-1.058Z" fill="#ffffff" /></svg> &nbsp; Start Interviewing
          </Button>
        </Link>
        <Link href="/login">
          <Button sx={{ backgroundColor: "white", color: "black", fontWeight: "bold", border: "1px solid black", borderRadius: 2 }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7.608 4.615a.75.75 0 0 0-1.108.659v13.452a.75.75 0 0 0 1.108.659l12.362-6.726a.75.75 0 0 0 0-1.318L7.608 4.615ZM5 5.274c0-1.707 1.826-2.792 3.325-1.977l12.362 6.726c1.566.853 1.566 3.101 0 3.953L8.325 20.702C6.826 21.518 5 20.432 5 18.726V5.274Z" fill="#000000" /></svg>&nbsp; Watch Demo
          </Button>
        </Link>
      </Box>
      <Box sx={{ width: { md: "80%", xs: "95%" }, backgroundColor: "lightgray", height: "300px", m: "0 auto", mt: 3, borderRadius: 3, color: "white", textAlign: "center" }}>
        Platform Dashboard Preview
      </Box>
      <Typography sx={{
        textAlign: "center",
        fontSize: {
          xs: "1.2rem",
          sm: "1.4rem",
          md: "1.5rem",
        },
        color: "black",
        fontWeight: "bold",
        mt: 2
        ,
      }} >
        How It Works
      </Typography>
      <Box sx={{ m: "0 auto", display: "flex", flexDirection: { md: "row", xs: "column" }, justifyContent: "center", alignItems: "center", gap: 2, width: { md: "80%", xs: "95%" }, mt: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', backgroundColor: "#f3f4f6", p: 1, borderRadius: "50%" }}>
            <img
              src="https://img.icons8.com/?size=100&id=oyYc30cNLZha&format=png&color=000000"
              alt="icon"
              style={{ width: 35, height: 35 }}
            />
          </Box>
          <Typography sx={{ fontWeight: "bold" }}>
            1. Create Job
          </Typography>
          <Typography variant='caption' sx={{ textAlign: 'center', color: "gray" }}>
            Interviewers create job postings with specific requirements and interview questions.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', backgroundColor: "#f3f4f6", p: 1, borderRadius: "50%" }}>
            <img
              src="https://img.icons8.com/?size=100&id=11220&format=png&color=000000"
              alt="icon"
              style={{ width: 35, height: 35 }}
            />
          </Box>
          <Typography sx={{ fontWeight: "bold" }}>
            2. Connect & Interview
          </Typography>
          <Typography variant='caption' sx={{ textAlign: 'center', color: "gray" }}>
            Candidates join and participate in structured interviews with real-time interaction.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', backgroundColor: "#f3f4f6", p: 1, borderRadius: "50%" }}>
            <img
              src="https://img.icons8.com/?size=100&id=XhWaB9MgdMYh&format=png&color=000000"
              alt="icon"
              style={{ width: 35, height: 35 }} // customize size here
            />
          </Box>
          <Typography sx={{ fontWeight: "bold" }}>
            3. Analyze Results
          </Typography>
          <Typography variant='caption' sx={{ textAlign: 'center', color: "gray" }}>
            Get detailed analysis of questions, answers, and performance metrics.
          </Typography>
        </Box>
      </Box>
      <Box sx={{ width: "100%", backgroundColor: "#f9fafb", p: { md: 4, xs: 1 }, mt: 2 }}>
        <Features />
      </Box>
      <Box sx={{ width: "100%", p: { md: 4, xs: 1 }, mt: 2 }}>
        <Advanced />
      </Box>
      <Box sx={{ width: "100%", p: { md: 4, xs: 1 }, mt: 2 }}>
        <UsersSay />
      </Box>
      <Box sx={{ gap: 3, width: "100%", backgroundColor: "black", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", p: { md: 4, xs: 3, sm: 3, } }}>
        <Box>
          <Typography sx={{
            color: "white", fontWeight: "bold", textAlign: "center", fontSize: {
              xs: "1.2rem",
              sm: "1.5rem",
              md: "1.7rem"
            }
          }}>
            Ready to Transform Your Interviews?
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ color: "lightgray", textAlign: "center" }}>
            Join thousands of companies already using InterviewHub
          </Typography>
        </Box>
        <Link href={"/signup"}>
          <Button sx={{ backgroundColor: "white", color: "black", fontWeight: "bold", border: "1px solid black", borderRadius: 2, px:2, py:2 }}>
            Get Started Today
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
