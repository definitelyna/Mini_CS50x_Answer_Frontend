import { Box, TextField, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { useState } from "react";

interface Question {
  id: number;
  question: string;
  star_rating: number;
  answered: boolean;
}

interface Props {
  question: Question;
  questionsAnswered: Array<boolean>;
}

const AnswerInputCard: React.FC<Props> = ({ question }) => {
  const [response, setResponse] = useState("");

  const handleSubmit = () => {
    console.log(
      `Answer for Question ${question.id}:`,
      response || "No response"
    );
    // Send response to backend
  };

  return (
    <Box
      key={question.id}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "left",
        mb: 7,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <h2 style={{ fontWeight: "normal" }}>{question.question}</h2>
        {Array.from({ length: question.star_rating }, (_, i) => (
          <div key={i}>
            <Box
              component="img"
              src="/rubber-duck.png"
              sx={{ height: "4vh", ml: 0.5 }}
            ></Box>
          </div>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextField
          sx={{
            height: 40,
            "& .MuiInputBase-root": {
              height: 40,
              bgcolor: question.answered ? "green" : "white",
            },
            width: "70%",
          }}
          placeholder="Answer"
          disabled={question.answered}
          value={response}
          onChange={(e) => setResponse(e.target.value)}
        />

        {question.answered ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
      </Box>

      {question.answered ? (
        <></>
      ) : (
        <Button
          sx={{
            bgcolor: "#A51C30",
            color: "#fcf8ed",
            mt: 2,
            width: "20%",
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      )}
    </Box>
  );
};

export default AnswerInputCard;
