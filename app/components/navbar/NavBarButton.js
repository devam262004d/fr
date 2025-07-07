"use client";

import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import HelpIcon from "@mui/icons-material/Help";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { removeUserId } from "../../store/slices/authSlice";
import { logout } from "../../_api/auth";

export default function NavBarButton() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);

  const [openSidebar, setOpenSidebar] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const pathName = usePathname();

  useEffect(() => {
    setHydrated(true); 
  }, []);

  const handleLogout = () => {
    logout();
    dispatch(removeUserId());
    router.push("/login");
  };


  const navLinks = [
    { name: "Home", path: "/", icon: <HomeIcon fontSize="small" /> },
    { name: "How it works", path: "/working", icon: <InfoIcon fontSize="small" /> },
    { name: "FAQs", path: "/FAQs", icon: <HelpIcon fontSize="small" /> },
    ...(userId
      ? [
         {
          name:"Dashboard",
          path:"/dashboard",
          icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.246 14.001c.967 0 1.75.784 1.75 1.75v3.5a1.75 1.75 0 0 1-1.75 1.75H3.75A1.75 1.75 0 0 1 2 19.251v-3.5c0-.966.784-1.75 1.75-1.75h5.496Zm11.004 0c.966 0 1.75.784 1.75 1.75v3.5a1.75 1.75 0 0 1-1.75 1.75h-5.496a1.75 1.75 0 0 1-1.75-1.75v-3.5c0-.966.783-1.75 1.75-1.75h5.496Zm0-11.005c.966 0 1.75.784 1.75 1.75v5.503A1.75 1.75 0 0 1 20.25 12H3.75A1.75 1.75 0 0 1 2 10.25V4.746a1.75 1.75 0 0 1 1.606-1.744l.144-.006h16.5Z" fill="#000000"/></svg>
        },
        {
          name: "Logout",
          path: "#",
          icon: <LogoutIcon fontSize="small" />,
          onClick: handleLogout,
        },
       
      ]
      : [
        {
          name: "Signup",
          path: "/signup",
          icon: <PersonAddIcon fontSize="small" />,
        },
        {
          name: "Login",
          path: "/login",
          icon: <LoginIcon fontSize="small" />,
        },
      ]),
  ];


  if (!hydrated) return null;


  if (isMobile) {
    return (
      <>
        <IconButton onClick={() => setOpenSidebar(true)}>
          <MenuIcon sx={{ fontSize: 28, color: "black" }} />
        </IconButton>

        <AnimatePresence>
          {openSidebar && (
            <>
              {/* Overlay */}
              <motion.div
                onClick={() => setOpenSidebar(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  background: "#000",
                  zIndex: 1000,
                }}
              />

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{
                  position: "fixed",
                  top: 15,
                  bottom: 15,
                  left: 15,
                  width: 250,
                  background: "#fff",
                  zIndex: 1100,
                  boxShadow: "2px 0 10px rgba(0,0,0,0.2)",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  borderRadius: 10,
                  overflowY: "auto",
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography fontWeight="bold" variant="h6">
                    INTERVIEW
                  </Typography>
                  <IconButton onClick={() => setOpenSidebar(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>

                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, type: "spring", stiffness: 80 }}
                  style={{
                    height: 1,
                    width: "100%",
                    margin: "1rem 0",
                    background: "linear-gradient(90deg, rgb(13, 0, 255), rgb(255, 0, 0))",
                    transformOrigin: "center",
                    borderRadius: 8,
                  }}
                />

                <List>
                  {navLinks.map((item) => {
                    const isActive = item.path !== "#" && pathName === item.path;

                    return (
                      <ListItem key={item.name} disablePadding>
                        <ListItemButton
                          onClick={() => {
                            item.onClick ? item.onClick() : router.push(item.path);
                            setOpenSidebar(false); // optional: close sidebar if needed
                          }}
                          disableRipple
                          sx={{
                            backgroundColor: isActive ? "black" : "transparent",
                            borderRadius: 2,
                            color: isActive ? "white" : "black",
                            "&:hover": {
                              backgroundColor: isActive ? "black" : "#f1f1f1",
                            },
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            {item.icon}
                            <ListItemText primary={item.name} />
                          </Box>
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>

              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }


  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>
      {userId ? (
        <Button
          onClick={handleLogout}
          sx={{
            border: "1px solid black",
            color: "black",
            px: 4,
            borderRadius: 2,
            fontWeight: "bold",
          }}
        >
          Logout
        </Button>
      ) : (
        <>
          <Button
            onClick={() => router.push("/login")}
            sx={{
              border: "1px solid black",
              color: "black",
              px: 4,
              borderRadius: 2,
              fontWeight: "bold",
            }}
          >
            Login
          </Button>
          <Button
            onClick={() => router.push("/signup")}
            sx={{
              backgroundColor: "black",
              color: "white",
              borderRadius: 2,
              p: 1,
              fontWeight: "bold",
            }}
          >
            Get started
          </Button>
        </>
      )}
    </Box>
  );
}
