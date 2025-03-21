// import { useEffect, useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import "./QuestionCheck.css";
import Title from "./components/Title";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import useFetchQuestions from "./hooks/useFetchQuestions";
import useFetchTeamSolves from "./hooks/useFetchTeamSolves";
import React from "react";
import {Question, CleanedQuestions} from "../../type/QuestionCheckTypes.ts";
import AnswerQuestions from "./components/AnswerQuestions/AnswerQuestions.tsx";

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

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  console.log(teamSolves)

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
          minWidth: "800px",
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
              flexDirection: isLargeScreen ? "row" : "column",
              alignItems: "center",
              width: "100%",
              gap: 2,
            }}
          >
          <AnswerQuestions questions={questions} teamNameId={teamNameId} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: isLargeScreen ? "50%" : "100%",
            }}
          >
            <Leaderboard isLargeScreen={isLargeScreen}/>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionCheck;
