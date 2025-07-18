import { Box, List, ListItem, ListItemText, IconButton, Typography, Accordion, AccordionSummary, AccordionDetails, } from "@mui/material";
import dynamic from 'next/dynamic';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const FaqQ = dynamic(() => import('../components/faqs/FaqQ'));
const FaqCard = dynamic(() => import("../components/faqs/FaqCard"));

export default function FAQs() {
 const faqs = [
    {
      question: "How do I receive my interview invitation?",
      ans1:"You will receive an email invitation with your unique Meeting ID and password. The email will contain:",
      answer:[
        "Interview date and time",
        "Meeting ID (e.g., 123-456-789)",
        "Password for secure access"
      ],
    },
    {
      question: "What do I need to join an interview?",
      ans1:"To join your interview, you'll need:",
      answer: [
        "A device with camera and microphone (computer, tablet, or smartphone)",
        "Stable internet connection",
        "Your Meeting ID and password from the email",
        "A quiet, well-lit environment",
      ],
    },
      {
      question: "How do I schedule an interview as an interviewer?",
      ans1:"As an interviewer, you can schedule interviews by:",
      answer: [
        "Logging into your interviewer dashboard",
        "Clicking 'Schedule New Interview'",
        "The system automatically generates Meeting ID and password",
        "Entering candidate's email and interview details",
        "Invitation email is sent to the candidate automatically",
      ],
    },
      {
      question: "How do I join the video call?",
      answer: "Go to our website, click 'Join Interview', enter your Meeting ID and password We recommend joining 5-10 minutes early to test your audio and video."
    },
      {
      question: "What if I experience technical difficulties during the interview?",
      ans1:"If you encounter issues:",
      answer: [
        "Try refreshing your browser",
        "Check your internet connection",
      ],
    },
   
  ];
  return (
    <Box>

   
    <Box sx={{ width: "100%", backgroundColor: "#f9fafb", p: 1, py: 10 }}>
      <Box  >
        <Typography sx={{
          textAlign: "center", fontWeight: "bold", fontSize: {
            md: "2rem",
            sm: "1.8rem",
            xs: "1.5rem"
          }
        }}>Frequently Asked Questions</Typography>
        <Typography sx={{
          textAlign: "center", fontSize: {
            md: "1rem",
            sm: "1rem",
            xs: "0.7rem"
          }, color: "#4b5563"
        }}>Find answers to common questions about InterviewConnect's video interview platform</Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", pt: 2 }}>
        <FaqQ />
      </Box>
      <Box sx={{ width: "100%", mt: 5 }}>
        <FaqCard />
      </Box>
    </Box>
      <Box>
        <Box sx={{ width: "100%", maxWidth: "800px", margin: "auto", p: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
            Frequently Asked Questions
          </Typography>

          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              sx={{
                mb: 1,
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`faq-content-${index}`}
                id={`faq-header-${index}`}
              >
                <Typography sx={{ fontWeight: 500 }}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {
                  faq.ans1?(<Typography sx={{ color: "gray", mb:1 }}>{faq.ans1}</Typography>):("")
                }
                {Array.isArray(faq.answer) ? (
                  <ul style={{ margin: 0, paddingLeft: "20px" }}>
                    {faq.answer.map((item, i) => (
                      <li key={i} style={{ marginBottom: "6px", color: "gray" }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography sx={{ color: "gray" }}>{faq.answer}</Typography>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
     </Box>
  );
}