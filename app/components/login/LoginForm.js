"use client";
import React, { useState } from "react";
import {
    Box,
    TextField,
    MenuItem,
    IconButton,
    InputAdornment,
    Typography,
    Button
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from '@mui/icons-material/Google';
import toast from "react-hot-toast";
import { login } from "../../_api/auth";
import { useDispatch } from "react-redux";
import { setUserId } from "../../store/slices/authSlice";
import { verifyToken } from "../../_api/auth";
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const dispatch = useDispatch();
    const router = useRouter();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            login(formData).then((res) => {
                console.log(res)
                toast.success("🎉 Signup Successful!");
                verifyToken().then((res) => {
                  dispatch(setUserId( res.user));
                });
                setFormData({
                    email: "",
                    password: "",
                });
                router.push("/")
            }).catch((error) => {

                toast.error(err.message);
            })

            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
            }, 2000);
        } catch (err) {
            toast.error(err.message);
        }
    };
    const handleGoogleSignIn = async () => {
        try {
            window.location.href = "http://localhost:5000/api/auth/google";
            toast.success("🎉 Redirecting to Google...");
        } catch (error) {
            console.error("Google Sign-in error:", error);
            toast.error("❌ Failed to connect to Google Sign-in. Try again.");
        }
    };
    const inputStyle = {
        mt: "13px",
        '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: '2px solid black',
            },
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: '2px solid black',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            border: '2px solid black',
        },
        '& .MuiInputLabel-root': {
            color: 'black',
        },
        '& .Mui-focused .MuiInputLabel-root': {
            color: 'black',
        },
        '& .MuiSelect-icon': {
            color: 'black',
        },
        "& label.Mui-focused": {
            color: "black",
        },
    };
    return (
        <Box sx={{ width: "100%" }}>
            <Typography
                variant="h5"
                textAlign="center"
                mb={2}
                sx={{ fontWeight: "bold", color: "black" }}
            >
                Sign In
            </Typography>
            <form action="" onSubmit={handleSubmit}>
                <TextField
                    size="small"
                    fullWidth
                    required
                    label="Email"
                    variant="outlined"
                    name="email"
                    placeholder="exampleemail@gmail.com"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    sx={inputStyle}
                    autoComplete={undefined}
                />

                <TextField
                    size="small"
                    fullWidth
                    required
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    name="password"
                    placeholder="Enter at least 8+ characters"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete={undefined}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={inputStyle}
                />


                <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, backgroundColor: "black", borderRadius: 2, fontWeight: "bold" }}>
                    {isSubmitted ? (
                        <Box
                            component="span"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 1,
                                animation: "fadeIn 0.5s ease-in-out",
                            }}
                        >
                            ✔ Signed In
                        </Box>
                    ) : (
                        "Sign In"
                    )}
                </Button>
            </form>
            <Typography sx={{ textAlign: "center", mt: 1, color: "gray", fontSize: "13px" }}>
                Or sign in with
            </Typography>
            <Box
                sx={{
                    mt: 1,
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    color: "black",
                }}
            >
                <Box
                    onClick={handleGoogleSignIn}
                    sx={{
                        backgroundColor: "#fef1f1",
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        width: "20%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        '&:hover': {
                            backgroundColor: "#fddddd",
                        },
                    }}
                >
                    <IconButton sx={{ p: 0 }} >
                        <GoogleIcon sx={{ fontSize: 20, color: "#DB4437" }} />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}