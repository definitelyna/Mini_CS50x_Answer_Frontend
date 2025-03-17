// import { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import "./QuestionCheck.css";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

const QuestionCheck = () => {
  const questions = [
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
  ];

  // useEffect(() => {
  //     fetch("https://isph-mini-cs50x-api.vercel.app/questions")
  //         .then((res) => res.json())
  //         .then((data) => setQuestions(data));
  // }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        bgcolor: "#f4eac6",
        width: "100%",
      }}
    >
      <Box
        sx={{
          height: "auto",
          width: "67vw",
          color: "#A51C30",
          bgcolor: "#fcf8ed",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
        }}
      >
        <Box sx={{ textAlign: "right", mt: 3 }}>
          <h1 style={{ fontSize: 60, marginLeft: "auto" }}>
            MINI CS50x PUZZLE DAY
          </h1>
          <h3 style={{ fontWeight: "normal" }}>By STEM Society</h3>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            mt: 7,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "60%",
              px: 5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignSelf: "flex-end",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <b>Guess attempts</b>
              <Box>23</Box>
            </Box>

            {questions.map((question) => (
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

                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
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
                  />

                  {question.answered ? (
                    <LockOpenOutlinedIcon />
                  ) : (
                    <LockOutlinedIcon />
                  )}
                </Box>

                <Button
                  sx={{
                    bgcolor: "#A51C30",
                    color: "#fcf8ed",
                    mt: 2,
                    width: "20%",
                  }}
                >
                  Submit
                </Button>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              width: "30%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <b>Leaderboard</b>

          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionCheck;
