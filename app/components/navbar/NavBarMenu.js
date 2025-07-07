'use client';

import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { verifyToken } from "../../_api/auth";
import { useDispatch, useSelector } from 'react-redux';
import { setUserId } from "../../store/slices/authSlice";


export default function NavBarMenu() {
  const router = useRouter();
  const pathName = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const baseNavItems = [
    { name: 'Home', path: '/' },
    { name: 'How it works', path: '/working' },
    { name: 'FAQs', path: '/FAQs' },
  ];
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      verifyToken().then((res) => {
        console.log(res);
        if (res.success) {
          dispatch(setUserId(res.user));
        } else {
          console.log("Token verification failed:", res);
        }
      });
    }, 200); // 200ms delay is often enough

    return () => clearTimeout(timer);
  }, []);

  const userId = useSelector((state) => state.auth.userId);
  const navItems = userId
    ? [...baseNavItems, { name: 'Dashboard', path: '/dashboard' }]
    : baseNavItems;

  if (!mounted || isMobile) {
    return <Box />;
  }



  return (
    <Box sx={{ display: 'flex', gap: 5, flexDirection: 'row', alignItems: 'center' }}>
      {navItems.map((item) => {
        const isActive = pathName === item.path;

        return (
          <Box key={item.name} sx={{ position: 'relative', cursor: 'pointer' }}>
            <Typography
              onClick={() => router.push(item.path)}
              sx={{
                fontWeight: isActive ? 'bold' : 'normal',
                color: isActive ? 'black' : 'gray',
              }}
            >
              {item.name}
            </Typography>

            {isActive && (
              <motion.div
                layoutId="underline"
                style={{
                  height: 3,
                  backgroundColor: 'black',
                  position: 'absolute',
                  bottom: -4,
                  left: 0,
                  right: 0,
                  borderRadius: 2,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
}
