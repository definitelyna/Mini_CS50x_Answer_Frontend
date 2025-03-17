import { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import "./QuestionCheck.css";

const QuestionCheck = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "Nonthreathening",
      star_rating: 3,
      answered: false,
    },
    {
      id: 2,
      question: "Don’t be greedy",
      star_rating: 3,
      answered: true,
    },
    {
      id: 3,
      question: "Books",
      star_rating: 4,
      answered: false,
    },
    {
      id: 4,
      question: "Play to win",
      star_rating: 4,
      answered: true,
    },
    {
      id: 5,
      question: "Game room",
      star_rating: 5,
      answered: false,
    },
  ]);

  // useEffect(() => {
  //     fetch("https://isph-mini-cs50x-api.vercel.app/questions")
  //         .then((res) => res.json())
  //         .then((data) => setQuestions(data));
  // }, []);

  return (
    <Box>
      <Box
        sx={{
          height: "100vh",
          width: "70vw",
          color: "#a40f33",
          bgcolor: "#f4f3ec",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          pl: 3,
        }}
      >
        {questions.map((question) => (
          <Box key={question.id}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <h2>{question.question}</h2>
              {Array.from({ length: question.star_rating }, (_, i) => (
                <div key={i}>⭐</div>
              ))}
            </Box>

            <TextField />
            <p>Answered: {question.answered ? "Yes" : "No"}</p>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default QuestionCheck;
