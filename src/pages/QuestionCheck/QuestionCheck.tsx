// import { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import "./QuestionCheck.css";
import Title from "./components/Title";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import AnswerInputCard from "./components/AnswerInput/AnswerInputCard";
import useFetchQuestions from "./hooks/useFetchQuestions";
import useFetchTeamSolves from "./hooks/useFetchTeamSolves";

interface Question {
  id: number;
  question: string;
  star_rating: number;
}

interface CleanedQuestions {
  id: number;
  question: string;
  star_rating: number;
  answered: boolean;
}

interface Props {
  teamNameId: string;
}

const cleanQuestionData = (
  questionList: Array<Question>,
  questionAnswered: Array<boolean>
) => {

  const cleanedQuestions: Array<CleanedQuestions> = [];

  for (let i = 0; i < questionList.length; i++) {
    cleanedQuestions.push({
      id: questionList[i].id,
      question: questionList[i].question,
      star_rating: questionList[i].star_rating,
      answered: questionAnswered[i],
    });
  }

  return cleanedQuestions;
};

const QuestionCheck: React.FC<Props> = ({ teamNameId }) => {
  const { data: questionList, isLoading: isQuestionLoading } =
    useFetchQuestions();

  const { data: teamSolves, isLoading: isTeamSolvesLoading } =
    useFetchTeamSolves(teamNameId);

  if (isQuestionLoading || isTeamSolvesLoading || !questionList) {
    return <div>Loading...</div>;
  }

  const questions: Array<CleanedQuestions> = cleanQuestionData(
    questionList,
    teamSolves.solves
  );

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
        <Title />
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
            <Box display="flex" justifyContent="space-between">
              <Box>
                <h2>Team name</h2>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignSelf: "flex-end",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h2>Guess attempts</h2>
                <h3 style={{ fontWeight: "normal" }}>23</h3>
              </Box>
            </Box>

            {questions.map((question) => (
              <AnswerInputCard key={question.id} question={question} />
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
            <Leaderboard />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionCheck;
