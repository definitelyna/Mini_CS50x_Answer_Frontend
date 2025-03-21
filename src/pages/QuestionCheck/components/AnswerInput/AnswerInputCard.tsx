import { Box, TextField, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import {useQueryClient} from "@tanstack/react-query";
import WellDoneModal from "../CongratulationsModal.tsx";
import WrongModal from "../WrongModal.tsx";

interface Question {
  id: number;
  question: string;
  star_rating: number;
  answered: boolean;
}

interface Props {
  question: Question;
  teamNameId: string;
}

const submitAnswer = async (team_name_id: string, question_id: number, answer: string) => {
  try {
    const response = await fetch("https://isph-mini-cs50x-api.vercel.app/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        team_name_id: team_name_id,
        question_id: question_id,
        answer: answer,
      }),
    });

    if (!response.ok) {
      console.error(response);
      return { correct: false, error: response.status };
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error sending data:", error);
    return { correct: false };
  }
};


const AnswerInputCard: React.FC<Props> = ({ teamNameId, question }) => {
  const [response, setResponse] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [congrats, setCongrats] = useState<boolean>(false);
  const [wrong, setWrong] = useState<boolean>(false);

  const handleClose = () => {
    setCongrats(false);
    setWrong(false);
  };

  const queryClient = useQueryClient();

  const handleSubmit = () => {
    console.log(
      `Answer for Question ${question.id}:`,
      response || "No response"
    );
    // Send response to backend

    setSubmitting(true);

    submitAnswer(teamNameId, question.id, response).then((response) => {
      if(response.correct){
        setCongrats(true);
        // @ts-ignore
        queryClient.invalidateQueries(["questions"]);
        setResponse("Answered");
      } else {
        setWrong(true);
      }
    }).finally(() => {
      setSubmitting(false);
    });
  };

  return (
    <Box
      key={question.id}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "left",
        mb: 7,
        paddingLeft: "40px",
      }}
    >
      <WellDoneModal open={congrats} onClose={handleClose} questionId={question.question} />
      <WrongModal open={wrong} onClose={handleClose} questionId={question.question} />

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
          placeholder={question.answered ? "Answered" : "Your answer"}
          disabled={question.answered}
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          autoComplete="off"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !question.answered) {
              handleSubmit();
            }
          }}
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
          {submitting ? <CircularProgress size={20} thickness={10} color='inherit' /> : "Submit"}
        </Button>
      )}
    </Box>
  );
};

export default AnswerInputCard;
