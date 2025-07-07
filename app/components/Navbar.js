
import dynamic from 'next/dynamic';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
const NavBarMenu = dynamic(() => import('../components/navbar/NavBarMenu'));
const NavBarButton = dynamic(()=> import("../components/navbar/NavBarButton"));


const Navbar = () => {
  console.log(
    typeof window !== 'undefined'
      ? '✅ Client-side render (NavbarShell)'
      : '🖥️ Server-side render (NavbarShell)'
  );

  return (
    <>
      <AppBar sx={{
        backgroundColor: 'white',
        color: 'black',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}>
        <Toolbar>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              width: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Typography variant='h6' sx={{ fontWeight: 'bold', color: 'black' }}>
                INTERVIEW
              </Typography>
              <NavBarMenu />
            </Box>
            <Box>
              <NavBarButton/>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};


export default Navbar;
