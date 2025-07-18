"use client";
import { Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

export default function UsersSay() {
  const cardVariantsLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const cardVariantsRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <Box>
      {/* Section Title */}
      <Box sx={{ mb: 2 }}>
        <Typography
          textAlign={"center"}
          sx={{
            fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.5rem" },
            color: "black",
            fontWeight: "bold",
          }}
        >
          What Our Users Say
        </Typography>
      </Box>

      {/* Testimonials */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* First Testimonial (Left Slide) */}
        <motion.div
          variants={cardVariantsLeft}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              width: "100%",
              border: "2px solid #e5e7eb",
              p: 2,
              borderRadius: 2,
              background: "#fff",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row", gap: 3, mb: 1 }}>
              <Box>
                <img
                  src="https://www.svgrepo.com/show/148911/manager-avatar.svg"
                  alt="Avatar"
                  width={60}
                  height={60}
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography sx={{ fontWeight: "bold" }}>Sarah Johnson</Typography>
                <Typography sx={{ color: "gray" }}>HR Manager</Typography>
              </Box>
            </Box>
            <Typography
              sx={{
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "0.9rem" },
              }}
            >
              "InterviewHub has revolutionized our hiring process. The analytics help
              us make better decisions."
            </Typography>
          </Box>
        </motion.div>

        {/* Second Testimonial (Right Slide) */}
        <motion.div
          variants={cardVariantsRight}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              width: "100%",
              border: "2px solid #e5e7eb",
              p: 2,
              borderRadius: 2,
              background: "#fff",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row", gap: 3, mb: 1 }}>
              <Box>
                <img
                  src="https://www.svgrepo.com/show/483717/woman-silhouette.svg"
                  alt="Avatar"
                  width={60}
                  height={60}
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography sx={{ fontWeight: "bold" }}>Mike Chen</Typography>
                <Typography sx={{ color: "gray" }}>Software Developer</Typography>
              </Box>
            </Box>
            <Typography
              sx={{
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "0.9rem" },
              }}
            >
              "As a candidate, the interview experience was smooth and professional.
              Great platform!"
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
