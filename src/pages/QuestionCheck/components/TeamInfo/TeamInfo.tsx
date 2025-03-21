import {Box} from "@mui/material";
import React from "react";

interface Props {
  teamNameId: string;
  guessAttemps: number;
}

const TeamInfo : React.FC<Props> = ({ teamNameId, guessAttemps }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "60%",
        px: 5,
        mb: 3
      }}
    >
      <Box display="flex" justifyContent="space-between" flexDirection='column'>
        <Box sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}>
          <h2>Team name: </h2>
          &nbsp;
          <h2 style={{ fontWeight: "normal" }}>{teamNameId}</h2>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <h2>Guess attempts: </h2>
          &nbsp;
          <h2 style={{ fontWeight: "normal" }}>{guessAttemps}</h2>
        </Box>
      </Box>
    </Box>
  )
}

export default TeamInfo;
