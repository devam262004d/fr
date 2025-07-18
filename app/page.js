"use client";
import { Container, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import Features from "./components/home/Features";
import Advanced from './components/home/Advanced';
import UsersSay from './components/home/UsersSay';
import { motion } from "framer-motion";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const scaleIcon = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { duration: 0.6, type: "spring" } }
};

export default function HomePage() {
  return (
    <Box sx={{ width: '100%', color: 'black', mt: 3 }}>
      
      {/* Heading */}
      <motion.div variants={fadeInUp}  initial="hidden" whileInView="visible" viewport={{ once: true }} >
        <Typography sx={{
          textAlign: "center",
          fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
          fontWeight: 600
        }}>
          Streamline Your Interview Process
        </Typography>
      </motion.div>

      {/* Sub Heading */}
      <Box sx={{ width: { md: "50%", xs: "100%" }, m: "0 auto", mt: 1 }}>
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Typography sx={{
            textAlign: "center",
            fontSize: { xs: "0.7rem", sm: "1rem", md: "1rem" },
            color: "gray"
          }}>
            Connect interviewers and candidates seamlessly. Create jobs, conduct interviews, and analyze responses with powerful AI insights.
          </Typography>
        </motion.div>
      </Box>

      {/* Buttons */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ display: "flex", justifyContent: "center", marginTop: 16, gap: 16 }}
      >
        <Link href="/signup">
          <Button sx={{ backgroundColor: "black", color: "white", fontWeight: "bold", p: 1, borderRadius: 2 }}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M13.057..." fill="#ffffff" /></svg>&nbsp; Start Interviewing
          </Button>
        </Link>
        <Link href="/login">
          <Button sx={{ backgroundColor: "white", color: "black", fontWeight: "bold", border: "1px solid black", borderRadius: 2 }}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M7.608..." fill="#000000" /></svg>&nbsp; Watch Demo
          </Button>
        </Link>
      </motion.div>

      {/* Dashboard Preview */}
      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} >
        <Box sx={{ width: { md: "80%", xs: "95%" }, backgroundColor: "lightgray", height: "300px", m: "0 auto", mt: 3, borderRadius: 3, textAlign: "center" }}>
          Platform Dashboard Preview
        </Box>
      </motion.div>

      {/* How It Works Heading */}
      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Typography sx={{
          textAlign: "center",
          fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.5rem" },
          color: "black",
          fontWeight: "bold",
          mt: 2
        }}>
          How It Works
        </Typography>
      </motion.div>

      {/* Steps Section */}
      <Box sx={{ m: "0 auto", display: "flex", flexDirection: { md: "row", xs: "column" }, justifyContent: "center", alignItems: "center", gap: 2, width: { md: "80%", xs: "95%" }, mt: 2 }}>
        {[
          { img: "https://img.icons8.com/?size=100&id=oyYc30cNLZha&format=png&color=000000", title: "1. Create Job", text: "Interviewers create job postings with specific requirements and interview questions." },
          { img: "https://img.icons8.com/?size=100&id=11220&format=png&color=000000", title: "2. Connect & Interview", text: "Candidates join and participate in structured interviews with real-time interaction." },
          { img: "https://img.icons8.com/?size=100&id=XhWaB9MgdMYh&format=png&color=000000", title: "3. Analyze Results", text: "Get detailed analysis of questions, answers, and performance metrics." }
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <motion.div
              variants={scaleIcon}
              initial="hidden"
              whileInView="visible"
              whileHover={{ scale: 1.2 }}
              viewport={{ once: true }}
              style={{ display: 'flex', justifyContent: 'center', backgroundColor: "#f3f4f6", padding: 10, borderRadius: "50%" }}
            >
              <motion.img
                src={item.img}
                alt="icon"
                style={{ width: 35, height: 35 }}
                whileHover={{ filter: "invert(30%) sepia(100%) saturate(500%) hue-rotate(180deg)" }}
              />
            </motion.div>
            <Typography sx={{ fontWeight: "bold", mt: 1 }}>{item.title}</Typography>
            <Typography variant='caption' sx={{ textAlign: 'center', color: "gray" }}>{item.text}</Typography>
          </motion.div>
        ))}
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
   

      {/* Footer CTA */}
      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} >
        <Box sx={{ gap: 3, width: "100%", backgroundColor: "black", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", p: { md: 4, xs: 3, sm: 3 } }}>
          <Typography sx={{
            color: "white", fontWeight: "bold", textAlign: "center", fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.7rem" }
          }}>
            Ready to Transform Your Interviews?
          </Typography>
          <Typography sx={{ color: "lightgray", textAlign: "center" }}>
            Join thousands of companies already using InterviewHub
          </Typography>
          <Link href={"/signup"}>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              sx={{ backgroundColor: "white", color: "black", fontWeight: "bold", border: "1px solid black", borderRadius: 2, px: 2, py: 2 }}
            >
              Get Started Today
            </Button>
          </Link>
        </Box>
      </motion.div>
    </Box>
  );
}
