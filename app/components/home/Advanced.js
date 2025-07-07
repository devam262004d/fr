import { Typography, Button, Box } from '@mui/material';
export default function Advanced() {
  return (
    <Box>
      <Box >
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
          Advanced Analytics
        </Typography>
        <Typography sx={{
          color: "gray", textAlign: "center", fontSize: {
            xs: "0.7rem",
            sm: "1rem",
            md: "1rem",
          }, mt: 1
        }}>
          Get deep insights into interview performance and candidate responses
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: { md: "row", xs: "column" }, width: "100%", gap: 2, mt: 2, justifyContent: "center", alignItems: "center" }}>
        <Box sx={{ width: { md: "33.33%", xs: "95%", sm: "70%" }, border: "2px solid #e5e7eb", p: 1, borderRadius: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Box sx={{ mt: 1 }}>
            <svg width="30" height="30" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.14 2.006c.707 0 1.11.704 1.11 1.411V7.75h-.895a2 2 0 1 0 0 1.5h.895v10.898c0 .596-.252 1.189-.783 1.46a3.399 3.399 0 0 1-1.56.388c-1.51 0-2.633-.764-3.356-1.668a5.171 5.171 0 0 1-1.02-2.137 3.447 3.447 0 0 1-1.269-.69C2.552 16.89 2 15.91 2 14.466c0-.755.054-1.413.19-1.966H6.4c.678 0 1.24.5 1.335 1.151a2 2 0 1 0 1.507-.009A2.85 2.85 0 0 0 6.4 11H3.04a2.036 2.036 0 0 1 .495-.302 4.893 4.893 0 0 1-.178-1.127c-.033-.735.077-1.5.295-2.181.216-.67.558-1.323 1.038-1.774a2.122 2.122 0 0 1 1.096-.567c.199-.84.706-1.534 1.353-2.037.831-.648 1.92-1.006 3-1.006ZM12.75 17h1.65a2.85 2.85 0 0 0 2.85-2.85v-1.795a2 2 0 1 0-1.5 0v1.795a1.35 1.35 0 0 1-1.35 1.35h-1.65V3.417c0-.707.403-1.411 1.11-1.411 1.082 0 2.17.358 3.001 1.006.647.503 1.154 1.198 1.353 2.037.42.07.794.284 1.096.567.48.451.822 1.103 1.038 1.774.218.681.328 1.446.295 2.181-.017.376-.072.76-.178 1.127l.066.03c.37.174.67.447.894.81.425.685.575 1.671.575 2.928 0 1.445-.552 2.426-1.262 3.035a3.447 3.447 0 0 1-1.27.69 5.172 5.172 0 0 1-1.019 2.137c-.723.904-1.846 1.668-3.357 1.668a3.399 3.399 0 0 1-1.56-.387c-.53-.272-.782-.865-.782-1.461V17ZM8 8.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Zm.5 6.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Zm7.5-4.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0Z" fill="#000000" /></svg>
          </Box>
          <Typography sx={{ fontWeight: "bold" }}>
            AI-Powered Analysis
          </Typography>
          <Typography sx={{
            textAlign: "center", mb: 1, fontSize: {
              xs: "0.8rem",
              sm: "0.9rem",
              md: "0.9rem",
            }
          }}>
            Intelligent evaluation of candidate responses and communication skills
          </Typography>
        </Box>
         <Box sx={{ width: { md: "33.33%", xs: "95%", sm: "70%" }, border: "2px solid #e5e7eb", p: 1, borderRadius: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Box sx={{ mt: 1 }}>
            <svg width="30" height="30" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 5.23a2.25 2.25 0 0 1 2.25-2.25h1.5A2.25 2.25 0 0 1 15 5.23V21H9V5.23ZM7.5 10H5.25A2.25 2.25 0 0 0 3 12.25v8c0 .415.336.75.75.75H7.5V10ZM16.5 21h3.75a.75.75 0 0 0 .75-.75v-11A2.25 2.25 0 0 0 18.75 7H16.5v14Z" fill="#000000"/></svg>
          </Box>
          <Typography sx={{ fontWeight: "bold" }}>
            Performance Metrics
          </Typography>
          <Typography sx={{
            textAlign: "center", mb: 1, fontSize: {
              xs: "0.8rem",
              sm: "0.9rem",
              md: "0.9rem",
            }
          }}>
            Comprehensive scoring and ranking system for fair evaluation
          </Typography>
        </Box>
       <Box sx={{ width: { md: "33.33%", xs: "95%", sm: "70%" }, border: "2px solid #e5e7eb", p: 1, borderRadius: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Box sx={{ mt: 1 }}>
           <svg width="30" height="30" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.25 2a.75.75 0 0 1 .743.648L17 2.75v.749h.749a2.25 2.25 0 0 1 2.25 2.25V16h-3.754l-.154.005a2.25 2.25 0 0 0-2.09 2.084l-.006.161v3.755H5.754a2.25 2.25 0 0 1-2.25-2.25L3.502 5.75a2.25 2.25 0 0 1 2.25-2.25l.747-.001.001-.749a.75.75 0 0 1 1.493-.102L8 2.75v.749H11V2.75a.75.75 0 0 1 1.494-.102l.007.102v.749h2.997l.001-.749a.75.75 0 0 1 .75-.75Zm3.31 15.5-4.066 4.065.001-3.315.007-.102a.75.75 0 0 1 .641-.641l.102-.007h3.314ZM11.247 16H7.25l-.102.007a.75.75 0 0 0 0 1.486l.102.007h3.998l.102-.007a.75.75 0 0 0 0-1.486L11.248 16Zm5-4H7.25l-.102.007a.75.75 0 0 0 0 1.486l.102.007h8.998l.102-.007a.75.75 0 0 0 0-1.486L16.248 12Zm0-4H7.25l-.102.007a.75.75 0 0 0 0 1.486l.102.007h8.998l.102-.007a.75.75 0 0 0 0-1.486L16.248 8Z" fill="#000000"/></svg>
          </Box>
          <Typography sx={{ fontWeight: "bold" }}>
           Detailed Reports
          </Typography>
          <Typography sx={{
            textAlign: "center", mb: 1, fontSize: {
              xs: "0.8rem",
              sm: "0.9rem",
              md: "0.9rem",
            }
          }}>
           Generate comprehensive interview reports and candidate profiles
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}