import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Providers from './providers';
import { Toolbar, Box } from '@mui/material';
import { Toaster } from "react-hot-toast";



export const metadata = {
  title: 'Next.js App Router + MUI',
  description: 'A starter template using App Router and MUI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              overflowY:"scroll"
            }}
          >
            <Navbar />
            <Toolbar />


            <Box component="main" sx={{ flex: 1,  }}>
              {children}
            </Box>
            <Toaster position="top-center" reverseOrder={false} />


            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
