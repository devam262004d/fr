"use client";
import React, { useState } from "react";
import {
    Box,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Chip,
    Typography,
    Button
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { createInterviewJob } from "../../_api/createJob";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const interviewTypes = ["Technical", "HR", "Managerial"];

// Animation Variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const scaleUp = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};
 const blink = {
        hidden: { opacity: 0 },
        visible: {
            opacity: [0, 1], // Keyframes for blinking
            transition: {
                duration: 1, // Total cycle time
                ease: "easeInOut"
            }
        }
    };


export default function Page() {
    const inputStyle = {
        mt: 1,
        '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: '2px solid black',
            },
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: '2px solid #d1d5db',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            border: '2px solid black',
        },
        '& .MuiInputLabel-root': {
            color: 'black',
        },
        '& .MuiSelect-icon': {
            color: 'black',
        },
        "& label.Mui-focused": {
            color: "black",
        }
    };

    const [formData, setFormData] = useState({
        interviewType: "",
        scheduledAt: dayjs(),
        skills: [],
        description: "",
        jobTitle: "",
        skillInput: "",
        status: "Live",
        userEmail: "",
    });

    const handleChange = (field) => (e) => {
        setFormData((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    const handleDateChange = (value) => {
        setFormData((prev) => ({ ...prev, scheduledAt: value }));
    };

    const handleAddSkill = (e) => {
        if (e.key === "Enter" && formData.skillInput.trim() !== "") {
            e.preventDefault();
            setFormData((prev) => ({
                ...prev,
                skills: [...prev.skills, prev.skillInput.trim()],
                skillInput: "",
            }));
        }
    };

    const handleDeleteSkill = (skillToDelete) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.filter((s) => s !== skillToDelete),
        }));
    };

    const handleSubmitDraft = async (e) => {
        e.preventDefault();
        try {
            const data = { ...formData, draft: true };
            await createInterviewJob(data);
            toast.success("Draft saved successfully!");
            resetForm();
        } catch (error) {
            toast.error(error.message || "Failed to save draft");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createInterviewJob(formData);
            toast.success("Interview job created successfully!");
            resetForm();
        } catch (err) {
            toast.error(err.message || "Failed to create interview job");
        }
    };

    const resetForm = () => {
        setFormData({
            interviewType: "",
            scheduledAt: dayjs(),
            skills: [],
            description: "",
            jobTitle: "",
            skillInput: "",
            status: "Live",
            userEmail: ""
        });
    };

    return (
        <motion.div initial="hidden" animate="visible"   >
            <Box sx={{ width: "100%", pt: 2 }}>
                <form onSubmit={handleSubmit}>
                    {/* Header */}
                    <motion.div variants={blink} className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: { xs: "1.3rem", md: "2rem" } }}>
                                Create Job
                            </Typography>
                            <Typography sx={{ color: "gray", fontSize: { xs: "0.85rem", md: "1.1rem" } }}>
                                Set up a new interview position and define requirements
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", gap: 1, mt: { xs: 2, md: 0 } }}>
                            <Button
                                onClick={handleSubmitDraft}
                                component={motion.button}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                sx={{
                                    textTransform: "none",
                                    border: "2px solid #e5e7eb",
                                    color: "black",
                                    borderRadius: 2,
                                    fontSize: "1rem",
                                    px: 3,
                                    py: 1
                                }}
                            >
                                Save Draft
                            </Button>
                            <Button
                                type="submit"
                                component={motion.button}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                sx={{
                                    textTransform: "none",
                                    color: "white",
                                    backgroundColor: "black",
                                    borderRadius: 2,
                                    fontSize: "1rem",
                                    px: 3,
                                    py: 1
                                }}
                            >
                                Publish Job
                            </Button>
                        </Box>
                    </motion.div>

                    {/* Form Sections */}
                    <Box sx={{
                        display: "flex",
                        flexDirection: { md: "row", xs: "column-reverse" },
                        gap: 2,
                        mt: 3
                    }}>
                       
                        <motion.div variants={fadeInUp} style={{ flex: 1, border: "1px solid #e5e7eb", borderRadius: 8, padding: 16 }}>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>Basic Information</Typography>
                            <TextField
                                label="Job Title"
                                required
                                fullWidth
                                size="small"
                                value={formData.jobTitle}
                                onChange={handleChange("jobTitle")}
                                sx={inputStyle}
                            />
                            <FormControl
                                fullWidth
                                size="small"
                                sx={{
                                    mt: 2,
                                    "& .MuiInputLabel-root": {
                                        color: "gray" // Default color
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: "black !important" // ✅ Force black when focused
                                    }
                                }}
                            >
                                <InputLabel id="interview-type-label">Interview Type</InputLabel>
                                <Select
                                    labelId="interview-type-label"
                                    label="Interview Type"
                                    value={formData.interviewType}
                                    onChange={handleChange("interviewType")}
                                    sx={{
                                        borderRadius: 2,
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#d1d5db",
                                            borderWidth: "2px"
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#000"
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#000"
                                        }
                                    }}
                                >
                                    <MenuItem disabled value="">
                                        Select Type
                                    </MenuItem>
                                    {interviewTypes.map((type, idx) => (
                                        <MenuItem key={idx} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Box mt={2}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        label="Scheduled At"
                                        value={formData.scheduledAt}
                                        onChange={handleDateChange}
                                        slotProps={{
                                            textField: {
                                                size: "small",
                                                fullWidth: true,
                                                sx: {
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: 2,
                                                        "& fieldset": {
                                                            borderColor: "#d1d5db", 
                                                            borderWidth: "2px"
                                                        },
                                                        "&:hover fieldset": {
                                                            borderColor: "black" 
                                                        },
                                                        "&.Mui-focused fieldset": {
                                                            borderColor: "black" 
                                                        }
                                                    },
                                                    "& .MuiInputLabel-root": {
                                                        color: "gray"
                                                    },
                                                    "& .MuiInputLabel-root.Mui-focused": {
                                                        color: "black"
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                </LocalizationProvider>
                            </Box>
                            <Box mt={1}>
                                <TextField
                                    size="small"
                                    sx={inputStyle}
                                    label="Add Skills"
                                    placeholder="Press Enter to add"
                                    value={formData.skillInput}
                                    onChange={handleChange("skillInput")}
                                    onKeyDown={handleAddSkill}
                                    fullWidth
                                />
                                <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
                                    {formData.skills.map((skill) => (
                                        <Chip key={skill} label={skill} onDelete={() => handleDeleteSkill(skill)} />
                                    ))}
                                </Box>
                            </Box>

                            <TextField
                                type="email"
                                label="Candidate Email"
                                size="small"
                                fullWidth
                                sx={{ mt: 2, ...inputStyle }}
                                value={formData.userEmail}
                                onChange={handleChange("userEmail")}
                            />

                            <TextField
                                label="Description"
                                multiline
                                minRows={3}
                                size="small"
                                fullWidth
                                sx={{ mt: 2, ...inputStyle }}
                                value={formData.description}
                                onChange={handleChange("description")}
                            />
                        </motion.div>

                        {/* Right Preview */}
                        <motion.div variants={scaleUp} style={{ width: "100%", height: "100%", maxWidth: 300, border: "2px solid #e5e7eb", borderRadius: 8, padding: 16 }}>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>Job Preview</Typography>
                            <Box mt={2}>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography>Status</Typography>
                                    <Typography sx={{ background: "#f3f4f6", px: 1, borderRadius: 1 }}>{formData.status}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography>Interviews</Typography>
                                    <Typography>0</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography>Created</Typography>
                                    <Typography>{dayjs().format("YYYY-MM-DD HH:mm")}</Typography>
                                </Box>
                            </Box>
                        </motion.div>
                    </Box>
                </form>
            </Box>
        </motion.div>
    );
}
