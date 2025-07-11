"use client";
import {
    Box,
    TextField,
    Typography,
    InputAdornment,
    MenuItem,
    Divider,
    Grid,
    Button,
    IconButton
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useCallback, useEffect, useState } from "react";
import { getJobs } from "../../_api/createJob";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import debounce from "lodash.debounce";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import toast from "react-hot-toast";


export default function AllJob() {
    const [mounted, setMounted] = useState(false);
    const [status, setStatus] = useState("");
    const options = ["all", "live", "draft", "closed"];
    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [query, setQuery] = useState("");

    const fetchJobs = async () => {
        const limit = 5;
        getJobs(page, limit).then((res) => {
            setJobs(res.data);
            const page = Math.ceil(res.totalJobs / limit);
            setTotalPage(page)
        })
    };

   const handleCopy = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    toast.success("Copied to clipboard!")
  });
};
    useEffect(() => {
        fetchJobs();
    }, [page]);

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
                const page = Math.ceil(res.totalJobs / 5);
                setTotalPage(page)
            })
        }, 1000)
        , []
    )


    const debouncedSearch = useCallback(
        debounce((value) => {
            getJobs(page, 5, value).then((res) => {
                setJobs(res.data);
                const page = Math.ceil(res.totalJobs / 5);
                setTotalPage(page)
            })
        }, 1000)
        , []
    )


    const handleChangeStatus = (e) => {
        const value = e.target.value;
        setStatus(value);
        debouncedStatus(value);
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        debouncedSearch(value);
    }

    const inputStyle = {
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

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { md: "row", xs: "column" },
                    justifyContent: "space-between",
                    gap: 2
                }}
            >
                {/* Left Section */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography
                        sx={{
                            fontWeight: "bold",
                            fontSize: {
                                xs: "1.3rem",
                                sm: "1.5rem",
                                md: "2rem"
                            }
                        }}
                    >
                        Interview Management
                    </Typography>
                    <Typography
                        sx={{
                            color: "gray",
                            fontSize: {
                                xs: "0.70rem",
                                sm: "1.1rem",
                                md: "1.1rem"
                            }
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
                        mt: { xs: 0, sm: 0 }
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
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderRadius: 2,
                                    border: "2px solid #e5e7eb"
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black',
                                    borderWidth: 2,
                                },
                            }
                            ,
                            "& input": {
                                padding: {
                                    xs: "6px 8px",
                                    sm: "8px 12px",
                                    md: "10px 14px"
                                }
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon
                                        sx={{
                                            fontSize: {
                                                xs: 18,
                                                sm: 20,
                                                md: 24
                                            }
                                        }}
                                    />
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        select
                        size="small"
                        label="Status"
                        value={status}
                        onChange={handleChangeStatus}
                        sx={{
                            borderRadius: 2,
                            width: { xs: "100%", sm: "150px", md: "180px" },
                            ...inputStyle
                        }}

                    >
                        {options.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
            </Box>
            <Divider
                sx={{
                    my: { xs: 1.5, sm: 2, md: 3 },
                    borderColor: "black",
                    borderBottomWidth: 2,
                    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.2)"
                }}
            />
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                <IconButton onClick={handlePrev}
                    disabled={page === 1}>
                    <ArrowBackIosNewIcon />
                </IconButton>
                <Typography variant="body1">
                    Page {page}
                </Typography>
                <IconButton onClick={handleNext}
                    disabled={page === totalPage} >
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
            <Box mt={3} sx={{ width: "100%", }}>
                <Grid container spacing={2}>

                    {
                        jobs.map((item, index) => {
                            return (
                                <Grid key={index} item xs={12} sm={6} md={4}>
                                    <Box
                                        sx={{
                                            backgroundColor: "#f9fafb",
                                            p: 2,
                                            borderRadius: 2,
                                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                                            mb: 2,
                                        }}
                                    >
                                        <Box mb={1}>
                                            <Typography fontWeight="bold">{item.jobTitle}</Typography>

                                            <Box display="flex" alignItems="center" gap={1}>
                                                <Typography>Interview Code: {item.interviewCode}</Typography>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleCopy(item.interviewCode)}
                                                    aria-label="Copy Interview Code"
                                                >
                                                    <ContentCopyIcon fontSize="small" />
                                                </IconButton>
                                            </Box>

                                            <Box display="flex" alignItems="center" gap={1}>
                                                <Typography>Password: {item.password}</Typography>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleCopy(item.password)}
                                                    aria-label="Copy Password"
                                                >
                                                    <ContentCopyIcon fontSize="small" />
                                                </IconButton>
                                            </Box>

                                            <Typography>
                                                Scheduled At: {new Date(item.scheduledAt).toLocaleString()}
                                            </Typography>
                                        </Box>

                                        <Box display="flex" gap={1}>
                                            <Button variant="outlined" color="primary">Join</Button>
                                            <Button variant="outlined" color="secondary">Edit</Button>
                                            <Button variant="outlined" color="error">Delete</Button>
                                        </Box>
                                    </Box>
                                </Grid>

                            );
                        })
                    }
                </Grid>
                {/* <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                    <IconButton onClick={handlePrev}
                        disabled={page === 1}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <Typography variant="body1">
                        Page {page}
                    </Typography>
                    <IconButton onClick={handleNext}
                        disabled={page === totalPage} >
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box> */}
            </Box>
        </Box>
    );
}
