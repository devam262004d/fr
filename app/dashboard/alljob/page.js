"use client";
import {
    Box,
    TextField,
    Typography,
    InputAdornment,
    Divider,
    Grid,
    Button,
    IconButton,
    Dialog,
    DialogContent,
    DialogActions,
    MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useCallback, useEffect, useState } from "react";
import { getJobs, deleteJob, editDate } from "../../_api/createJob";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import debounce from "lodash.debounce";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import toast from "react-hot-toast";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Chip from '@mui/material/Chip';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";

const interviewTypes = ["draft", "live", "closed"];


export default function AllJob() {
    const [mounted, setMounted] = useState(false);
    const [status, setStatus] = useState("");
    const options = ["all", "live", "draft", "closed"];
    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [dateData, setDateData] = useState(dayjs());
    const [jobId, setJobId] = useState(null);
    const [deleteCount, setDeleteCount] = useState();
    const [inputValue, setInputValue] = useState("");
    const handleOpen = (id) => {
        if (!id) return;
        setJobId(id);
        setOpen(true);
    };
    const router = useRouter();
    const handleClose = () => setOpen(false);

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const scaleUp = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
    };

    const slideInLeft = {
        hidden: { opacity: 0, x: -50 },  // Start slightly left
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: "easeOut" }
        }
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



    const fetchJobs = async () => {
        const limit = 5;
        const res = await getJobs(page, limit);
        setJobs(res.data);
        setTotalPage(Math.ceil(res.totalJobs / limit));


    };





    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success("Copied to clipboard!");
        });
    };

    const handleChangeMenu = (value) => {
        setInputValue(value);
    }

    useEffect(() => {
        console.log("helo")
        fetchJobs();
    }, [page, deleteCount]);

    const handlePrev = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (page < totalPage) setPage((prev) => prev + 1);
    };

    const debouncedStatus = useCallback(
        debounce((value) => {
            getJobs(page, 5, query, value).then((res) => {
                setJobs(res.data);
                setTotalPage(Math.ceil(res.totalJobs / 5));
            });
        }, 1000),
        []
    );

    const debouncedSearch = useCallback(
        debounce((value) => {
            getJobs(page, 5, value).then((res) => {
                setJobs(res.data);
                setTotalPage(Math.ceil(res.totalJobs / 5));
            });
        }, 1000),
        []
    );

    const handleChangeStatus = (e) => {
        const value = e.target.value;
        setStatus(value);
        debouncedStatus(value);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        debouncedSearch(value);
    };

    const handleDelete = (id) => {
        console.log(id);
        deleteJob(id).then((res) => {
            setDeleteCount(deleteCount + 1);
            toast.success("Job Deleted Successfully!");
        })
    }

    const inputStyle = {
        "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "2px solid black",
            },
        },
        "& .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #d1d5db",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "2px solid black",
        },
        "& .MuiInputLabel-root": {
            color: "black",
        },
        "& .MuiSelect-icon": {
            color: "black",
        },
        "& label.Mui-focused": {
            color: "black",
        },
    };


    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDateChange = (value) => {
        setDateData(value);
    };

    const handleSubmitDate = () => {
        console.log("Job ID:", jobId);
        console.log("New Date:", dateData.format());
        const formData = {
            id: jobId,
            dateData: dateData.format(),
            menuvalue: inputValue,
        }
        editDate(formData);
        setOpen(false);
        toast.success("Interview time updated!");
    };

    if (!mounted) return null;


    return (

        <Box >
            <Dialog open={open} onClose={handleClose} fullWidth  >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        mt: 2,
                    }}
                >
                    <AccessTimeFilledIcon sx={{ fontSize: 50, color: "#4b5563" }} />
                </Box>
                <DialogContent>
                    <Typography sx={{ textAlign: "center", mb: 2, fontWeight: "bold" }}>
                        Set the duration for your interview session
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Scheduled At"
                            value={dateData}
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
                    <Box sx={{ mt: "10px" }}>
                        <TextField
                            size="small"
                            fullWidth
                            required
                            label="Job Status"
                            name="status"
                            value={inputValue}
                            onChange={(e) => handleChangeMenu(e.target.value)}
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
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        sx={{
                            border: "1px solid black",
                            color: "black",
                            fontWeight: "bold",
                            backgroundColor: "white",
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmitDate}
                        sx={{ backgroundColor: "black", color: "white", fontWeight: "bold" }}
                    >
                        Edit Time
                    </Button>
                </DialogActions>
            </Dialog>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { md: "row", xs: "column" },
                    justifyContent: "space-between",
                    gap: 2,
                }}
            >

                <Box component={motion.div}
                    // variants={blink}
                    // initial="hidden"
                    // animate="visible"
                    // viewport={{ once: true }}
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography
                        sx={{
                            fontWeight: "bold",
                            fontSize: { xs: "1.3rem", sm: "1.5rem", md: "2rem" },
                        }}
                    >
                        Interview Management
                    </Typography>
                    <Typography
                        sx={{
                            color: "gray",
                            fontSize: { xs: "0.70rem", sm: "1.1rem", md: "1.1rem" },
                        }}
                    >
                        Manage all created interviews including drafts and published jobs
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 2,
                        width: { xs: "100%", sm: "auto" },
                        mt: { xs: 0, sm: 0 },
                    }}
                >
                    <TextField
                        placeholder="Search..."
                        variant="outlined"
                        size="small"
                        value={query}
                        onChange={handleChange}
                        sx={{
                            borderRadius: 2,
                            width: { xs: "100%", sm: "200px", md: "250px" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderRadius: 2,
                                    border: "2px solid #e5e7eb",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "black",
                                    borderWidth: 2,
                                },
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon
                                        sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        select
                        size="small"
                        label="Status"
                        value={status}
                        onChange={handleChangeStatus}
                        sx={{ borderRadius: 2, width: { xs: "100%", sm: "150px", md: "180px" }, ...inputStyle }}
                    >
                        {options.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
            </Box>

            <Divider sx={{
                borderColor: "black",
                borderBottomWidth: 2,
                mt: 2,
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)"
            }} />

            {/* Pagination */}
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                <IconButton onClick={handlePrev} disabled={page === 1}>
                    <ArrowBackIosNewIcon />
                </IconButton>
                <Typography variant="body1">Page {page}</Typography>
                <IconButton onClick={handleNext} disabled={page === totalPage}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>

            {/* Jobs List */}
            <Box mt={3} sx={{ width: "100%" }}>

                <Grid container spacing={2}>
                    {jobs.map((item, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4}>
                            <Box
                                component={motion.div}
                                variants={fadeInUp}
                                initial="hidden"
                                animate="visible"
                                viewport={{ once: true }}
                                sx={{ backgroundColor: "#f9fafb", p: 2, borderRadius: 2, boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)", mb: 2 }}>

                                <Box mb={1}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            mb: 1
                                        }}
                                    >
                                        <Typography fontWeight="bold">{item.jobTitle}</Typography>
                                        <Chip label={item.interviewDecison ? (item.interviewDecison.decision) : ("Not Decided")} size="small" sx={{ fontSize: "12px", height: "20px", color: "red" }} />
                                    </Box>

                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Typography>Interview Code: {item.interviewCode}</Typography>
                                        <IconButton size="small" onClick={() => handleCopy(item.interviewCode)}>
                                            <ContentCopyIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Typography>Password: {item.password}</Typography>
                                        <IconButton size="small" onClick={() => handleCopy(item.password)}>
                                            <ContentCopyIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                    <Typography>Scheduled At: {new Date(item.scheduledAt).toLocaleString()}</Typography>
                                </Box>
                                <Box display="flex" gap={1}>
                                    <Button sx={{ py: 0, px: 0, textTransform: "none", border: "1px solid black", backgroundColor: "black", color: "white", boxShadow: 2, borderRadius: 1 }} onClick={() => {
                                        router.push(`/dashboard/performance/${item.interviewCode}`)
                                    }}>
                                        View
                                    </Button>
                                    <Button sx={{ py: 0, px: 0, textTransform: "none", border: "1px solid black", backgroundColor: "black", color: "white", boxShadow: 2, borderRadius: 1 }} onClick={() => handleOpen(item._id)}>
                                        Edit
                                    </Button>
                                    <Button sx={{ py: 0, px: 0, textTransform: "none", border: "1px solid black", backgroundColor: "black", color: "white", boxShadow: 2, borderRadius: 1 }} onClick={() => {
                                        handleDelete(item._id);
                                    }}>
                                        Delete
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

        </Box>
    );
}
