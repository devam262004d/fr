"use client";
import { Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

export default function Advanced() {
  // Animation variants for reusable settings
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const cardAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <Box>
      {/* Title Section */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Typography
          textAlign="center"
          sx={{
            fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.5rem" },
            color: "black",
            fontWeight: "bold",
          }}
        >
          Advanced Analytics
        </Typography>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Typography
          sx={{
            color: "gray",
            textAlign: "center",
            fontSize: { xs: "0.7rem", sm: "1rem", md: "1rem" },
            mt: 1,
          }}
        >
          Get deep insights into interview performance and candidate responses
        </Typography>
      </motion.div>

      {/* Feature Cards */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
          width: "100%",
          gap: 2,
          mt: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {[
          {
            icon: (
              <svg width="30" height="30" fill="none" viewBox="0 0 24 24">
                <path
                  d="M10.14 2.006c.707 0 1.11.704 1.11 1.411V7.75h-.895a2 2 0 1 0 0 1.5h.895v10.898c0 .596-.252 1.189-.783 1.46a3.399 3.399 0 0 1-1.56.388c-1.51 0-2.633-.764-3.356-1.668a5.171 5.171 0 0 1-1.02-2.137 3.447 3.447 0 0 1-1.269-.69C2.552 16.89 2 15.91 2 14.466c0-.755.054-1.413.19-1.966H6.4c.678 0 1.24.5 1.335 1.151a2 2 0 1 0 1.507-.009A2.85 2.85 0 0 0 6.4 11H3.04a2.036 2.036 0 0 1 .495-.302 4.893 4.893 0 0 1-.178-1.127c-.033-.735.077-1.5.295-2.181.216-.67.558-1.323 1.038-1.774a2.122 2.122 0 0 1 1.096-.567c.199-.84.706-1.534 1.353-2.037.831-.648 1.92-1.006 3-1.006ZM12.75 17h1.65a2.85 2.85 0 0 0 2.85-2.85v-1.795a2 2 0 1 0-1.5 0v1.795a1.35 1.35 0 0 1-1.35 1.35h-1.65V3.417c0-.707.403-1.411 1.11-1.411 1.082 0 2.17.358 3.001 1.006.647.503 1.154 1.198 1.353 2.037.42.07.794.284 1.096.567.48.451.822 1.103 1.038 1.774.218.681.328 1.446.295 2.181-.017.376-.072.76-.178 1.127l.066.03c.37.174.67.447.894.81.425.685.575 1.671.575 2.928 0 1.445-.552 2.426-1.262 3.035a3.447 3.447 0 0 1-1.27.69 5.172 5.172 0 0 1-1.019 2.137c-.723.904-1.846 1.668-3.357 1.668a3.399 3.399 0 0 1-1.56-.387c-.53-.272-.782-.865-.782-1.461V17ZM8 8.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Zm.5 6.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Zm7.5-4.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0Z"
                  fill="#000"
                />
              </svg>
            ),
            title: "AI-Powered Analysis",
            desc: "Intelligent evaluation of candidate responses and communication skills",
          },
          {
            icon: (
              <svg width="30" height="30" fill="none" viewBox="0 0 24 24">
                <path
                  d="M9 5.23a2.25 2.25 0 0 1 2.25-2.25h1.5A2.25 2.25 0 0 1 15 5.23V21H9V5.23ZM7.5 10H5.25A2.25 2.25 0 0 0 3 12.25v8c0 .415.336.75.75.75H7.5V10ZM16.5 21h3.75a.75.75 0 0 0 .75-.75v-11A2.25 2.25 0 0 0 18.75 7H16.5v14Z"
                  fill="#000"
                />
              </svg>
            ),
            title: "Performance Metrics",
            desc: "Comprehensive scoring and ranking system for fair evaluation",
          },
          {
            icon: (
              <svg width="30" height="30" fill="none" viewBox="0 0 24 24">
                <path
                  d="M16.25 2a.75.75 0 0 1 .743.648L17 2.75v.749h.749a2.25 2.25 0 0 1 2.25 2.25V16h-3.754l-.154.005a2.25 2.25 0 0 0-2.09 2.084l-.006.161v3.755H5.754a2.25 2.25 0 0 1-2.25-2.25L3.502 5.75a2.25 2.25 0 0 1 2.25-2.25l.747-.001.001-.749a.75.75 0 0 1 1.493-.102L8 2.75v.749H11V2.75a.75.75 0 0 1 1.494-.102l.007.102v.749h2.997l.001-.749a.75.75 0 0 1 .75-.75Z"
                  fill="#000"
                />
              </svg>
            ),
            title: "Detailed Reports",
            desc: "Generate comprehensive interview reports and candidate profiles",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={cardAnimation}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6, delay: index * 0.3 }}
            viewport={{ once: true }}
            style={{
              width: "100%",
              maxWidth: "350px",
              border: "2px solid #e5e7eb",
              padding: "16px",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ mt: 1 }}>{item.icon}</Box>
            <Typography sx={{ fontWeight: "bold" }}>{item.title}</Typography>
            <Typography sx={{ textAlign: "center", mb: 1, fontSize: "0.9rem" }}>
              {item.desc}
            </Typography>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
