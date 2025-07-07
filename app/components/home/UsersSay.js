import { Typography, Button, Box } from '@mui/material';

export default function UsersSay() {
    return (
        <Box>
            <Box sx={{ mb: 2 }}>
                <Typography textAlign={"center"} sx={{
                    textAlign: "center",
                    fontSize: {
                        xs: "1.2rem",
                        sm: "1.4rem",
                        md: "1.5rem",
                    },
                    color: "black",
                    fontWeight: "bold",
                }}>
                    What Our Users Say
                </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "column", md: "row", gap: 20, justifyContent: "center", alignItems: "center" } }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignContent: "center", width: { md: "45%", xs: "95%", sm: "70%" }, border: "2px solid #e5e7eb", p: 2, borderRadius: 2 }}>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
                        <Box>
                            <img src="https://www.svgrepo.com/show/148911/manager-avatar.svg" alt="Man Holding Hands" width={60} height={60} />
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography sx={{ fontWeight: "bold" }}>
                               Sarah Johnson
                            </Typography>
                            <Typography sx={{ color: "gray" }}>
                                 HR Manager
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography sx={{
                            fontSize: {
                                xs: "0.8rem",
                                sm: "0.9rem",
                                md: "0.9rem",
                            }
                        }}>
                            "InterviewHub has revolutionized our hiring process. The analytics help us make better decisions."
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", alignContent: "center", width: { md: "45%", xs: "95%", sm: "70%" }, border: "2px solid #e5e7eb", p: 2, borderRadius: 2 }}>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
                        <Box>
                            <img src="https://www.svgrepo.com/show/483717/woman-silhouette.svg" alt="Man Holding Hands" width={60} height={60} />
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography sx={{ fontWeight: "bold" }}>
                                Mike Chen
                            </Typography>
                            <Typography sx={{ color: "gray" }}>
                                Software Developer
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography sx={{
                            fontSize: {
                                xs: "0.8rem",
                                sm: "0.9rem",
                                md: "0.9rem",
                            }
                        }}>
                            "As a candidate, the interview experience was smooth and professional. Great platform!"
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}