"use client";

import { Box, Grid, Typography, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getJobDetails } from "../../../_api/createJob";

export default function CandidatesPerformancePage() {
    const { id: roomId } = useParams();
    const [metrics, setMetrics] = useState(null);
    // const [technicalSkills, setTechnicalSkills] = useState(0);
    const [analyzeData, setAnalyzeData] = useState(null);
    const [keyStrengths, setKeyStrengths] = useState(null);
    useEffect(() => {
        getJobDetails(roomId).then((res) => {
            const data =  JSON.parse(res.analyzeData);
            setMetrics(data.candidateAnalysis.metrics);
            // setTechnicalSkills(data.candidateAnalysis.TechnicalSkills);
            setAnalyzeData(data);
            setKeyStrengths(data.candidateAnalysis.keyStrengths);
            console.log(data)
        })
    }, []);

    return (
        <Grid container spacing={1} sx={{ width: "100%" }}>
            <Grid item size={{ md: 12, xs: 12, sm: 12 }}>
                <Box sx={{ p: 2, border: "1px solid #e5e7eb", borderRadius: 2, backgroundColor: "#f9fafb" }}>
                    <Box>
                        <Typography sx={{ fontWeight: "bold", fontSize: { md: "1.1rem", sm: "1.2rem", xs: "1.1rem" } }}>Performance Overview</Typography>
                        <Box sx={{ gap: { xs: 1, sm: 1 }, mt: 1, width: "100%", display: "flex", flexDirection: { md: "row", xs: "column", sm: "column" }, justifyContent: "space-between", alignItems: "center" }}>

                            <Box sx={{ width: { md: "20%", xs: "90%", sm: "90%" }, backgroundColor: "white", p: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <Typography sx={{ fontWeight: "bold" }}>
                                    {metrics ? (`${metrics[1].clarity}/10`) : ("8/10")}
                                </Typography>
                                <Typography sx={{ color: "#4b5563" }}>
                                    Clarity
                                </Typography>
                            </Box>
                            <Box sx={{ width: { md: "20%", xs: "90%", sm: "90%" }, backgroundColor: "white", p: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <Typography sx={{ fontWeight: "bold" }}>
                                    {metrics ? (`${metrics[2].confidence}/10`) : ("8/10")}
                                </Typography>
                                <Typography sx={{ color: "#4b5563" }}>
                                    Confidence
                                </Typography>
                            </Box>
                            <Box sx={{ width: { md: "20%", xs: "90%", sm: "90%" }, backgroundColor: "white", p: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <Typography sx={{ fontWeight: "bold" }}    >
                                    {analyzeData ? (`${analyzeData.candidateAnalysis.relevance}/10`) : ("8/10")}
                                </Typography>
                                <Typography sx={{ color: "#4b5563" }}>
                                    Relevance
                                </Typography>
                            </Box>
                            <Box sx={{ width: { md: "20%", xs: "90%", sm: "90%" }, backgroundColor: "white", p: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <Typography sx={{ fontWeight: "bold" }}>
                                    {analyzeData ? (`${analyzeData.candidateAnalysis.selectionChance}`) : ("80%")}
                                </Typography>
                                <Typography sx={{ color: "#4b5563" }}>
                                    Selection Chance
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Grid>
            <Grid item size={{ md: 6, xs: 12, sm: 12 }}>
                <Box sx={{ p: 2, border: "1px solid #e5e7eb", borderRadius: 2, backgroundColor: "#f9fafb", height: { md: "300px", xs: "100%", sm: "100%" }, overflowY: "auto" }}>
                    <Box>
                        <Typography sx={{ fontWeight: "bold", fontSize: { md: "1.1rem", sm: "1.2rem", xs: "1.1rem" } }}>Strengths & Areas for Improvement</Typography>
                        <Box>
                            <Box sx={
                                {
                                    mt: 1,
                                    p: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1
                                }
                            }>
                                <Typography sx={{ mb: 1, color: "black" }}>
                                    Key Strengths
                                </Typography>
                                {
                                    keyStrengths ? (
                                        keyStrengths.map((item, index) => (
                                            <Box key={index} sx={{ border: "1px solid #e5e7eb", p: 1, borderRadius: 2, backgroundColor: "white" }}>
                                                {item}
                                            </Box>
                                        ))
                                    ) : (
                                        <Box sx={{ border: "1px solid #e5e7eb", p: 1, borderRadius: 2, backgroundColor: "white" }}>
                                            No specific keyStrengths identified
                                        </Box>
                                    )
                                }
                            </Box>
                            <Box sx={
                                {
                                    mt: 1,
                                    p: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1
                                }
                            }>
                                <Typography sx={{ mb: 1, color: "black" }}>
                                    Areas for Improvement
                                </Typography>

                                <Box sx={{ border: "1px solid #e5e7eb", p: 1, borderRadius: 2, backgroundColor: "white" }}>
                                    No specific weaknesses identified
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Grid>
            <Grid item size={{ md: 6, xs: 12, sm: 12 }}>
                <Box sx={{ p: 2, border: "1px solid #e5e7eb", borderRadius: 2, backgroundColor: "#f9fafb", height: { md: "300px", xs: "100%", sm: "100%" }, overflowY: "auto" }}>
                    <Box>
                        <Typography sx={{ fontWeight: "bold", fontSize: { md: "1.1rem", sm: "1.2rem", xs: "1.1rem" } }}>Interview Summary</Typography>
                        <Box sx={{ width: "95%", borderRadius: 2, backgroundColor: "white", p: 1 }}>

                            {
                                analyzeData ? (
                                    <Typography>
                                        {analyzeData.summary}
                                    </Typography>
                                ) : (
                                    <Typography>
                                        he candidate showcased their technical expertise, provided relevant examples, and demonstrated confidence. The interviewer maintained a good flow and asked relevant
                                    </Typography>
                                )
                            }
                        </Box>
                    </Box>
                </Box>
            </Grid>
            <Grid item size={{ md: 12, xs: 12, sm: 12 }}>
                <Box sx={{ p: 2, border: "1px solid #e5e7eb", borderRadius: 2, backgroundColor: "#f9fafb", mb: 2 }}>
                    <Box>
                        <Typography sx={{ fontWeight: "bold", fontSize: { md: "1.1rem", sm: "1.2rem", xs: "1.1rem" } }}>Interview Questions & Answers</Typography>
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
                </Box>
            </Grid>

        </Grid>
    );
}