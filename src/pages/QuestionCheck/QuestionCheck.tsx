import { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import "./QuestionCheck.css";
import Title from "./components/Title";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import React from "react";
import { Question, CleanedQuestions } from "../../type/QuestionCheckTypes.ts";
import AnswerQuestions from "./components/AnswerQuestions/AnswerQuestions.tsx";

interface Props {
  teamNameId: string;
  teamName: string;
  questionList: Array<Question>;
  teamSolves: { solves: Array<boolean> };
  teamRankings: Array<TeamData>;
}

interface TeamData {
  team_name: string;
  wrong_answers: number;
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
      answered: questionAnswered ? questionAnswered[i] : false,
    });

  }
  
  cleanedQuestions.pop()

  console.log(cleanedQuestions)

  return cleanedQuestions;
};

const QuestionCheck: React.FC<Props> = ({
  teamNameId,
  teamName,
  questionList,
  teamSolves,
  teamRankings,
}) => {
  const [teamData, setTeamData] = useState<TeamData>({
    team_name: "",
    wrong_answers: 0,
  });

  // Get team data to get guest attempts
  if (teamRankings && teamData.team_name === "") {
    for (let i = 0; i < teamRankings.length; i++) {
      if (teamRankings[i].team_name === teamNameId) {
        setTeamData(teamRankings[i]);
        break;
      }
    }
  }

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

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
            width: "100%",
            gap: 2,
          }}
        >
          <AnswerQuestions
            questions={questions}
            teamNameId={teamNameId}
            teamName={teamName}
            guessAttemps={teamData.wrong_answers}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: isLargeScreen ? "50%" : "100%",
              mt: 7,
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
