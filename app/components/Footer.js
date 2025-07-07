import { Box, Typography, Divider } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "white" }}>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", sm: "row" },
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 4,
          p:4,
          px: { xs: 2, sm: 6 },
        }}
      >

        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.25 2a3.25 3.25 0 0 0-3.241 3.007c.08-.005.16-.007.241-.007h9.5A4.25 4.25 0 0 1 19 9.25v6.5c0 .08-.002.161-.007.241A3.25 3.25 0 0 0 22 12.75v-6A4.75 4.75 0 0 0 17.25 2h-9Z"
                fill="#000000"
              />
              <path
                d="M17.99 16a3.25 3.25 0 0 1-3.24 3h-4.083L7 21.75c-.824.618-2 .03-2-1v-1.76a3.25 3.25 0 0 1-3-3.24v-6.5A3.25 3.25 0 0 1 5.25 6h9.5A3.25 3.25 0 0 1 18 9.25v6.5c0 .084-.003.168-.01.25Z"
                fill="#000000"
              />
            </svg>
            <Typography variant="h6" fontWeight="bold">
              InterviewHub
            </Typography>
          </Box>
          <Typography color="text.secondary">
            Streamlining interviews for better hiring decisions.
          </Typography>
        </Box>

        <Box sx={{ flex: 1, minWidth: 150 }}>
          <Typography fontWeight="bold" mb={1}>
            Company
          </Typography>
          <Typography variant="body2" color="text.secondary">About Us</Typography>
          <Typography variant="body2" color="text.secondary">Careers</Typography>
          <Typography variant="body2" color="text.secondary">Blog</Typography>
          <Typography variant="body2" color="text.secondary">Contact</Typography>
        </Box>


        <Box sx={{ flex: 1, minWidth: 150 }}>
          <Typography fontWeight="bold" mb={1}>
            Product
          </Typography>
          <Typography variant="body2" color="text.secondary">Features</Typography>
          <Typography variant="body2" color="text.secondary">Pricing</Typography>
          <Typography variant="body2" color="text.secondary">Demo</Typography>
          <Typography variant="body2" color="text.secondary">Integrations</Typography>
        </Box>

      
        <Box sx={{ flex: 1, minWidth: 150 }}>
          <Typography fontWeight="bold" mb={1}>
            Resources
          </Typography>
          <Typography variant="body2" color="text.secondary">Help Center</Typography>
          <Typography variant="body2" color="text.secondary">Privacy Policy</Typography>
          <Typography variant="body2" color="text.secondary">Terms of Service</Typography>
          <Typography variant="body2" color="text.secondary">Support</Typography>
        </Box>
      </Box>

 
      <Divider sx={{ my: 3 }} />

      <Box sx={{ textAlign: "center", px: 2 }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} InterviewHub. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
