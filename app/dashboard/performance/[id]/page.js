"use client"

import { useParams, } from "next/navigation";
import { useEffect, useState } from "react";
import { getJobDetails } from "../../../_api/createJob";
import { submitFinalDecision } from "../../../_api/createJob";
import { useRouter } from 'next/navigation';
import { Box, TextField, Button, Typography, Divider, FormControlLabel, Radio, FormControl, RadioGroup } from '@mui/material';

export default function PerformancePage() {
    const { id: roomId } = useParams();
    const [analyzeData, setAnalyzeData] = useState(null);
    const [resumeData, setResumeData] = useState();
    const [metrics, setMetrics] = useState(null);
    const [technicalSkills, setTechnicalSkills] = useState(0);
    const [option, setOption] = useState();
    const [description, setDescription] = useState();
    const [flag, setFlag] = useState(false);
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        submitFinalDecision(option, description, roomId).then((res) => {
            console.log(res);
            setDescription("");
            router.push("/dashboard/alljob");
        })
    };

    useEffect(() => {
        getJobDetails(roomId).then((res) => {
            const data = JSON.parse(res.analyzeData);
            console.log(res)
            const dataa = {
                resumedata: res.resumeDetails,
                jobTitle: res.jobTitle,
                candidateEmail: res.candidateEmail,
            }
            setMetrics(data.candidateAnalysis.metrics);
            setTechnicalSkills(data.candidateAnalysis.TechnicalSkills);
            setFlag(res.flag);
            setResumeData(dataa);
            setAnalyzeData(data);
        })
    }, []);


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
    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1, }}>
            <Box sx={{ width: "100%", p: 1, border: "1px solid #e5e7eb", borderRadius: 2, backgroundColor: "#f9fafb" }} >
                <Typography sx={{ fontWeight: "bold", fontSize: { md: "1.5rem", sm: "1.4rem", xs: "1.3rem" } }}>Candidate Information</Typography>
                <Box sx={{ display: "flex", flexDirection: { md: "row", xs: "column", sm: "column" }, justifyContent: { md: "space-between", xs: "flex-start", sm: "flex-start" }, alignItems: { md: "center", xs: "flex-start", sm: "flex-start" } }}>
                    <Box sx={{ mt: 1, width: { md: "33.33%" } }}>
                        <Typography sx={{ color: "#6b7280", fontWeight: "bold" }}>
                            Full Name
                        </Typography>
                        <Typography>
                            {resumeData ? (`${resumeData.resumedata["name"]}`) : ("Data not available")}
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 1, width: { md: "33.33%" } }}>
                        <Typography sx={{ color: "#6b7280", fontWeight: "bold" }}>
                            Email
                        </Typography>
                        <Typography>
                            {resumeData ? (`${resumeData.candidateEmail}`) : ("Data not available")}
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 1, width: { md: "33.33%" } }}>
                        <Typography sx={{ color: "#6b7280", fontWeight: "bold" }}>
                            Position Applied
                        </Typography>
                        <Typography>
                            {resumeData ? (`${resumeData.jobTitle}`) : ("Data not available")}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ width: "100%", p: 1, border: "1px solid #e5e7eb", borderRadius: 2, backgroundColor: "#f9fafb" }} >
                <Typography sx={{ fontWeight: "bold", fontSize: { md: "1.5rem", sm: "1.4rem", xs: "1.3rem" } }}>Interview Summary</Typography>
                <Box sx={{ display: "flex", flexDirection: { md: "row", xs: "column", sm: "column" }, justifyContent: { md: "space-between", xs: "flex-start", sm: "flex-start" }, alignItems: { md: "center", xs: "flex-start", sm: "flex-start" } }}>
                    <Box sx={{ mt: 1, width: { md: "33.33%" } }}>
                        <Typography sx={{ color: "#6b7280", fontWeight: "bold" }}>
                            Date
                        </Typography>
                        <Typography>
                            Data not available
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 1, width: { md: "33.33%" } }}>
                        <Typography sx={{ color: "#6b7280", fontWeight: "bold" }}>
                            Duration
                        </Typography>
                        <Typography>
                            Data not available
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 1, width: { md: "33.33%" } }}>
                        <Typography sx={{ color: "#6b7280", fontWeight: "bold" }}>
                            Time
                        </Typography>
                        <Typography>
                            Data not available
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ width: "100%", border: "1px solid #e5e7eb", p: 1, borderRadius: 2, backgroundColor: "#f9fafb" }}>
                <Typography sx={{ fontWeight: "bold", fontSize: { md: "1.5rem", sm: "1.4rem", xs: "1.3rem" } }}>Question & Answer Analysis</Typography>
                {
                    analyzeData ? (
                        analyzeData.qaPairs.map((item, index) => {
                            return (
                                <Box key={index} sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 1, width: "100%" }}>
                                    <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 3, borderColor: "#d1d5db", }} />
                                    <Box>
                                        <Typography sx={{ fontWeight: "bold" }}>Q{index + 1}: {item.question}</Typography>
                                        <Box sx={{ width: '100%', backgroundColor: "white", color: "#4b5563", p: 1, borderRadius: 2 }}>
                                            {item.answer}
                                        </Box>
                                    </Box>
                                </Box>
                            )
                        })
                    ) : (
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 1, width: "100%" }}>
                            <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 3, borderColor: "#d1d5db", }} />
                            <Box>
                                <Typography>Data not available</Typography>
                                <Box sx={{ width: '100%', backgroundColor: "white", width: "100%", color: "#4b5563", p: 1, borderRadius: 2 }}>
                                    .
                                </Box>
                            </Box>
                        </Box>
                    )
                }
            </Box>
            <Box sx={{ width: "100%", backgroundColor: "#f9fafb", borderRadius: 2, border: "1px solid #e0e0e0", p: 1, }}>
                <Typography sx={{ fontWeight: "bold", fontSize: { md: "1.5rem", sm: "1.4rem", xs: "1.3rem" } }}>
                    Score Sheet
                </Typography>
                <Box sx={{ width: "100%", display: "flex", flexDirection: { md: "row", xs: "column" }, justifyContent: { md: "space-between" }, m: "0 auto", gap: 2 }}>
                    <Box sx={{
                        mt: 1, width: { md: "50%", xs: "100%" }
                    }}>
                        <Typography sx={{ fontWeight: "bold" }}>
                            Communication & Soft Skills
                        </Typography>

                        <Box sx={{ display: "flex", flexDirection: { md: "column", xs: "column" }, justifyContent: { md: "space-between" }, m: "0 auto" }}>

                            {
                                metrics ? (
                                    metrics.map((item, index) => {
                                        const keyy = Object.keys(item)[0];
                                        const value = item[keyy];
                                        return (
                                            <Box key={index + 1} sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                                {
                                                    keyy == "speakingRate" ? (
                                                        <Box key={keyy} sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                                            <Typography sx={{ color: "4b5577" }}>{keyy}</Typography>
                                                            <Box sx={{ color: "#4b5577" }}>{value}</Box>
                                                        </Box>
                                                    ) : (
                                                        <>
                                                            <Typography key={index} sx={{ color: "#4b5577" }}>{keyy}</Typography>
                                                            <Box key={keyy} sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
                                                                <Box sx={{ width: "120px", borderRadius: 4, height: "10px", backgroundColor: "#e5e7eb" }}>
                                                                    <Box sx={{ width: `${value * 10}%`, backgroundColor: "#374151", borderRadius: 4, height: "9px" }} ></Box>
                                                                </Box>
                                                                <Typography sx={{ color: "#4b5577" }}>{value}/10</Typography>
                                                            </Box>
                                                        </>
                                                    )
                                                }
                                            </Box>
                                        )
                                    })

                                ) : (
                                    <Box key={1}>
                                        data not available
                                    </Box>
                                )
                            }
                        </Box>
                    </Box>
                    <Box sx={{ mt: 1, width: { md: "50%", xs: "100%" } }}>
                        <Typography sx={{ fontWeight: "bold" }}>
                            Technical Skills
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                            <Typography sx={{ color: "#4b5577" }} >technicalSkills</Typography>
                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
                                <Box sx={{ width: "120px", borderRadius: 4, height: "10px", backgroundColor: "#e5e7eb" }}>
                                    <Box sx={{ width: `${technicalSkills * 10}%`, backgroundColor: "#374151", borderRadius: 4, height: "9px" }} ></Box>
                                </Box>
                                <Typography>{technicalSkills}/10</Typography>
                            </Box>
                        </Box>

                        <Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ width: "100%", backgroundColor: "#f9fafb", p: 1, border: "1px solid #e0e0e0", borderRadius: 2, }}>
                {
                    analyzeData ? (
                        <>
                            <Typography sx={{ fontWeight: "bold", fontSize: { md: "1.5rem", sm: "1.4rem", xs: "1.3rem" } }}>Interview Summary</Typography>
                            <Box sx={{ backgroundColor: "white", borderRadius: 2, p: 1, color: "#4b5577" }}>
                                {analyzeData.summary}
                            </Box>
                        </>
                    ) : (
                        <Typography sx={{ fontWeight: "bold", fontSize: { md: "1.5rem", sm: "1.4rem", xs: "1.3rem" } }}>Data not available</Typography>
                    )
                }
            </Box>
            <Box sx={{ mb: 2, width: "100%", backgroundColor: "#f9fafb", p: 1, border: "1px solid #e0e0e0", borderRadius: 2 }}>
                <Typography sx={{ fontWeight: "bold", fontSize: { md: "1.5rem", sm: "1.4rem", xs: "1.3rem" } }}>Final Decision</Typography>
                <Box>
                    {
                        flag == false ? (
                            <form onSubmit={handleSubmit}>
                                <FormControl required component="fieldset">
                                    <RadioGroup
                                        value={option}
                                        onChange={(e) => setOption(e.target.value)}
                                        sx={{ display: "flex", flexDirection: "row", gap: 1 }}
                                    >
                                        <FormControlLabel value="Reject" control={<Radio sx={{
                                            color: 'red', '&.Mui-checked': { color: 'darkred' }, '& .MuiSvgIcon-root': {
                                                fontSize: 20,
                                            },
                                        }} />} label="Reject" />
                                        <FormControlLabel value="OnHold" control={<Radio sx={{
                                            color: 'red', '&.Mui-checked': { color: 'darkred' }, '& .MuiSvgIcon-root': {
                                                fontSize: 20,
                                            },
                                        }} />} label="On Hold" />
                                        <FormControlLabel value="MoveForward" control={<Radio sx={{
                                            color: 'red', '&.Mui-checked': { color: 'darkred' }, '& .MuiSvgIcon-root': {
                                                fontSize: 20,
                                            },
                                        }} />} label="Move Forward" />
                                    </RadioGroup>
                                </FormControl>
                                <Box sx={{ mt: 1, mb: 1 }}>
                                    <TextField
                                        required
                                        label="Description"
                                        multiline
                                        rows={3}
                                        fullWidth
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Enter additional details..."
                                        sx={inputStyle}
                                    />
                                </Box>
                                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                                    <Box sx={{ fontSize: { xs: "0.7rem", md: "0.9rem" } }}>
                                        Overall Score:{analyzeData ? (analyzeData.candidateAnalysis.selectionChance) : ("0")}/100
                                    </Box>
                                    <Button type="submit" sx={{ backgroundColor: "black", color: "white", borderRadius: 2, px: 2 }}>
                                        Submit
                                    </Button>
                                </Box>
                            </form>
                        ) : (
                            <Box>
                                Form Already Submitted!
                            </Box>
                        )
                    }
                </Box>
            </Box>
        </Box>
    )
};