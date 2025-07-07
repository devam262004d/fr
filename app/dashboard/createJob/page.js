"use client"
import React, { useState } from "react";
import {
    Box,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Checkbox,
    ListItemText,
    OutlinedInput,
    Chip,
    Typography,
    Button,
    FormControlLabel
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { createInterviewJob } from "../../_api/createJob";
import toast from "react-hot-toast";
const interviewTypes = ["Technical", "HR", "Managerial"];

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
        },
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
            const data = {
                ...formData,
                draft: true
            }
            const res = await createInterviewJob(data);
            console.log("Submitted Data:", formData);
            toast.success("Interview job created successfully!");
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
        } catch (error) {
            console.error("Submission Error:", err.message);
            toast.error(err.message || "Failed to Save Draft interview job");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await createInterviewJob(formData);
            toast.success("Interview job created successfully!");
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
        } catch (err) {
            console.error("Submission Error:", err.message);
            toast.error(err.message || "Failed to create interview job");
        }
    };
    return (
        <Box sx={{ width: "100%", pt: 2, }}>
            <form action="" onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row", sm: "column" }, justifyContent: "space-between", alignItems: { md: "center", }, gap: { xs: 2, sm: 2 } }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: "bold",
                                fontSize: {
                                    xs: "1.3rem",
                                    sm: "1.5rem",
                                    md: "2rem",
                                },
                            }}
                        >
                            Create Job
                        </Typography>

                        <Typography
                            sx={{
                                color: "gray",
                                fontSize: {
                                    xs: "0.80rem",
                                    sm: "1.1rem",
                                    md: "1.1rem",
                                },
                            }}
                        >
                            Set up a new interview position and define requirements
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                        <Button
                            onClick={handleSubmitDraft}
                            sx={{
                                textTransform: "none",
                                border: "2px solid #e5e7eb",
                                color: "black",
                                borderRadius: 2,
                                fontSize: {
                                    xs: "0.75rem",
                                    sm: "0.875rem",
                                    md: "1rem",
                                },
                                px: {
                                    xs: 1.5,
                                    sm: 2,
                                    md: 3,
                                },
                                py: {
                                    xs: 0.5,
                                    sm: 0.75,
                                },
                                gap: 1,
                            }}
                        >
                            <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ verticalAlign: "middle" }}
                            >
                                <path
                                    d="M13.939 5 19 10.06 9.062 20a2.25 2.25 0 0 1-1 .58l-5.115 1.395a.75.75 0 0 1-.92-.921l1.394-5.116a2.25 2.25 0 0 1 .58-.999L13.94 5Zm-7.414 6-1.5 1.5H2.75a.75.75 0 0 1 0-1.5h3.775Zm14.352-8.174.153.144.145.153a3.579 3.579 0 0 1-.145 4.908L20.06 9l-5.061-5.06.97-.97a3.579 3.579 0 0 1 4.908-.144ZM10.525 7l-1.5 1.5H2.75a.75.75 0 1 1 0-1.5h7.775Zm4-4-1.5 1.5H2.75a.75.75 0 1 1 0-1.5h11.775Z"
                                    fill="currentColor"
                                />
                            </svg>
                            Save Draft
                        </Button>

                        <Button
                            type="submit"
                            sx={{
                                textTransform: "none",
                                border: "1px solid black",
                                color: "white",
                                backgroundColor: "black",
                                borderRadius: 2,
                                fontSize: {
                                    xs: "0.75rem",
                                    sm: "0.875rem",
                                    md: "1rem",
                                },
                                px: {
                                    xs: 1.5,
                                    sm: 2,
                                    md: 3,
                                },
                                py: {
                                    xs: 0.5,
                                    sm: 0.75,
                                },
                                gap: 1,
                            }}
                        >
                            <svg
                                width="1em"
                                height="1em"
                                fill="none"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ verticalAlign: "middle" }}
                            >
                                <path
                                    d="M11.883 3.007 12 3a1 1 0 0 1 .993.883L13 4v7h7a1 1 0 0 1 .993.883L21 12a1 1 0 0 1-.883.993L20 13h-7v7a1 1 0 0 1-.883.993L12 21a1 1 0 0 1-.993-.883L11 20v-7H4a1 1 0 0 1-.993-.883L3 12a1 1 0 0 1 .883-.993L4 11h7V4a1 1 0 0 1 .883-.993L12 3l-.117.007Z"
                                    fill="currentColor"
                                />
                            </svg>
                            Publish Job
                        </Button>

                    </Box>
                </Box>
                <Box
                    sx={{
                        gap: 2,
                        width: "100%",
                        display: "flex",
                        flexDirection: { md: "row", xs: "column-reverse", sm: "column-reverse" },
                        mt: 2,
                        alignItems: { md: "stretch", xs: "unset", sm: "unset" },
                    }}
                >


                    <Box
                        sx={{
                            width: { md: "70%", xs: "100%", sm: "100%" },
                            border: "1px solid #e5e7eb",
                            borderRadius: 2,
                            p: 1,
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>Basic Information
                        </Typography>


                        <TextField
                            type="text"
                            required
                            label="Job Title"
                            placeholder="e.g. Senior Frontend Developer"
                            size="small"
                            fullWidth
                            variant="outlined"
                            value={formData.jobTitle}
                            onChange={handleChange("jobTitle")}

                            sx={inputStyle}

                        />
                        <Box sx={{ mt: 1 }}>
                            <TextField
                                size="small"
                                fullWidth
                                required
                                label="Interview Type"
                                name="gender"
                                value={formData.interviewType}
                                onChange={handleChange("interviewType")}
                                select

                                sx={inputStyle}
                            >
                                <MenuItem disabled value="">
                                    Select Type
                                </MenuItem>
                                {interviewTypes.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
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
                                                border: "2px solid #e5e7eb",
                                                borderRadius: "8px",
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: "8px",
                                                },
                                                "& fieldset": {
                                                    border: "none",
                                                },
                                            },
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box mt={1} mb={1}>
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
                                    <Chip
                                        key={skill}
                                        label={skill}
                                        onDelete={() => handleDeleteSkill(skill)}
                                    />
                                ))}
                            </Box>
                        </Box>
                        <TextField
                            type="email"
                            label="Candidate Email"
                            placeholder="candidate@gmail.com"
                            size="small"
                            fullWidth
                            variant="outlined"
                            value={formData.userEmail}
                            onChange={handleChange("userEmail")}

                            sx={inputStyle}

                        />
                        <Box mt={1}>
                            <TextField
                                sx={inputStyle}
                                size="small"
                                label="Description"
                                multiline
                                maxRows={3}
                                minRows={3}
                                value={formData.description}
                                onChange={handleChange("description")}
                                fullWidth
                            />
                        </Box>




                    </Box>


                    <Box
                        sx={{
                            width: { md: "30%", xs: "100%", sm: "100%" },
                            border: "2px solid #e5e7eb",
                            borderRadius: 2,
                            p: 1,
                            height: "100%"

                        }}
                    >
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                Job Preview
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography>
                                        Status
                                    </Typography>
                                    <Typography sx={{ backgroundColor: "#f3f4f6", px: 1, borderRadius: 1 }}>
                                        {formData.status}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography>
                                        Interviews
                                    </Typography>
                                    <Typography>
                                        0
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography>
                                        Created
                                    </Typography>
                                    <Typography>
                                        {dayjs().format("YYYY-MM-DD HH:mm")}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </form>
        </Box>
    );
}