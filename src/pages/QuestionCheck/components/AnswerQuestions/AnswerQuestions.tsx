import TeamInfo from "../TeamInfo/TeamInfo.tsx";
import AnswerInputCard from "../AnswerInput/AnswerInputCard.tsx";
import {Box} from "@mui/material";
import React from "react";
import {Question} from "../../../../type/QuestionCheckTypes.ts";

interface Props {
  teamNameId: string;
  questions: Array<Question>;
}

const AnswerQuestions : React.FC<Props> = ({teamNameId, questions}) => {

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        mt: 7,
      }}
    >
      <TeamInfo teamNameId={teamNameId} guessAttemps={23}/>
      {questions.map((question) => {
        const questionWithAnswered = { ...question, answered: question.answered ?? false };
        return <AnswerInputCard teamNameId={teamNameId} key={question.id} question={questionWithAnswered} />
      })}
    </Box>
  )
}

export default AnswerQuestions;
