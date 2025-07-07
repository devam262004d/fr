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
import { signup } from "../../_api/auth";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

const genders = ["Male", "Female", "Other"];
const accountTypes = ["Interviewer", "Candidate"];

export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        gender: "",
        accountType: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
       
    };
console.log(formData);
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            signup(formData)
                .then((res) => {
                    toast.success("🎉 Signup Successful!");
                    setFormData({
                        fullName: "",
                        phoneNumber: "",
                        gender: "",
                        accountType: "",
                        email: "",
                        password: "",
                    });
                    router.push("/login");
                })
                .catch((error) => {
                    toast.error(error.message);
                });

            setIsSubmitted(true);
            setTimeout(() => setIsSubmitted(false), 2000);
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleGoogleSignIn = () => {
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
                Create an account
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    size="small"
                    required
                    fullWidth
                    label="Full name"
                    name="fullName"
                    placeholder="Enter Your Full name"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    sx={inputStyle}
                />

                <TextField
                    size="small"
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    placeholder="Enter Your phone Number"
                    type="number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    sx={inputStyle}
                />

                <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                    <TextField
                        size="small"
                        fullWidth
                        required
                        label="Gender"
                        name="gender"
                        select
                        value={formData.gender}
                        onChange={handleChange}
                        sx={inputStyle}
                    >
                        <MenuItem disabled value="">
                            Select Gender
                        </MenuItem>
                        {genders.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        size="small"
                        fullWidth
                        required
                        label="Account Type"
                        name="accountType"
                        select
                        value={formData.accountType}
                        onChange={handleChange}
                        sx={inputStyle}
                    >
                        <MenuItem disabled value="">
                            Select Account Type
                        </MenuItem>
                        {accountTypes.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

                <TextField
                    size="small"
                    fullWidth
                    required
                    label="Email"
                    name="email"
                    placeholder="exampleemail@gmail.com"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    sx={inputStyle}
                />

                <TextField
                    size="small"
                    fullWidth
                    required
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter at least 8+ characters"
                    value={formData.password}
                    onChange={handleChange}
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

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 2,
                        backgroundColor: "black",
                        borderRadius: 2,
                        fontWeight: "bold",
                        textTransform: "none",
                    }}
                >
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
                            ✔ Signed Up
                        </Box>
                    ) : (
                        "Sign Up"
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
                    <IconButton sx={{ p: 0 }}>
                        <GoogleIcon sx={{ fontSize: 20, color: "#DB4437" }} />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}
