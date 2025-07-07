import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
const SignUpForm = dynamic(() => import('../components/signup/SignUpForm'));

export default function SignUp() {
  return (
<Box
  sx={{
    display: "flex",
    justifyContent: "center",
    pt: { xs: 5, sm: 5, md: 5 },
    alignItems: "center",
    
  }}
>
  <Box
    sx={{
      width: {md:"80%", xs:"95%", sm:"95%"},
      borderRadius: 5,
      display: "flex",
      flexDirection: "row",
      overflow: "hidden",
      boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
      transition: "all 0.3s ease-in-out",
      backgroundColor: "white",
    }}
  >
    <Box
      sx={{
        backgroundColor: { md: "white", xs: "white" },
        width: { xs: "100%", md: "60%" },
        p: { xs: 3, md: 4 },
        color: { xs: "#fff", md: "#000" },
        transition: "all 0.3s ease-in-out",
      }}
    >
      <SignUpForm/>
    </Box>
    <Box
      sx={{
        backgroundColor: "black",
        width: { md: "40%" },
        display: { xs: "none", md: "block" },
        p: 4,
        color: "#fff",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <img
        src="https://res.cloudinary.com/dg3wqwjpr/image/upload/v1751000120/Selection_ucgciz.png"
        alt="Dancing Illustration"
        width="100%"
        height="100%"
      />
    </Box>
  </Box>
</Box>

  );
}