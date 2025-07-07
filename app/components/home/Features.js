
import { Typography, Button, Box } from '@mui/material';

export default function Features() {
    const featuresI = [
        'Create and manage job postings',
        'Design custom interview questions',
        'Real-time candidate evaluation',
        'Detailed analytics and insights',
    ];
    const featuresC = [
  'Browse available job opportunities',
  'Join interviews seamlessly',
  'Interactive interview experience',
  'Receive feedback and results',
];
    return (
        <Box>
            <Typography sx={{
                textAlign: "center",
                fontSize: {
                    xs: "1.2rem",
                    sm: "1.4rem",
                    md: "1.5rem",
                },
                color: "black",
                fontWeight: "bold",
               my:2
            }}>
                Powerful Features
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", justifyContent: "center", alignItems: "center" }}>
                <Box sx={{ display: "flex", flexDirection: "row", width: "100%", p: 2 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: { md: "50%", xs: "100%" } }}>
                        <Typography variant='h7' sx={{ fontWeight: "bold" }}>
                            For Interviewers
                        </Typography>
                        <Box>
                            {featuresI.map((feature, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.53 12.97a.75.75 0 0 0-1.06 1.06l4.5 4.5a.75.75 0 0 0 1.06 0l11-11a.75.75 0 0 0-1.06-1.06L8.5 16.94l-3.97-3.97Z" fill="#000000" /></svg>
                                    <Typography variant="body1" sx={{color:"gray",lineHeight:3}}>{feature}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                     <Box sx={{ display: { xs: 'none', md: 'block' }, width:"50%" , backgroundColor:"#d3d3d3", borderRadius:2 }}>
                        1deded
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", width: "100%", p: 2, gap:2 }}>

                    <Box sx={{ display: { xs: 'none', md: 'block' }, width:"50%" , backgroundColor:"#d3d3d3", borderRadius:2 }}>
                        2deded
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: { md: "50%", xs: "100%" } }}>
                        <Typography variant='h7' sx={{ fontWeight: "bold" }}>
                            For Candidates
                        </Typography>
                        <Box>
                            {featuresC.map((feature, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.53 12.97a.75.75 0 0 0-1.06 1.06l4.5 4.5a.75.75 0 0 0 1.06 0l11-11a.75.75 0 0 0-1.06-1.06L8.5 16.94l-3.97-3.97Z" fill="#000000" /></svg>
                                    <Typography sx={{color:"gray", lineHeight:3}} variant="body1">{feature}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}