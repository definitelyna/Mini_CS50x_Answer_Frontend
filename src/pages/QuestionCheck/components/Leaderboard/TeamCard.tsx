import React from "react";
import { Card, Typography, Box, Divider } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const TeamCard = ({ teamData }) => {
  const { team_name, solves, score, hints_given, wrong_answers } = teamData;
  const [statuses, _] = solves;

  return (
    <Card sx={{ display: "flex", alignItems: "center", gap: 2, minHeight: 40, boxShadow: 2, borderRadius: 1,}}>
      {/* Team Name */}
      <Typography
        variant="h6"
        sx={{
          paddingLeft: 2,
          width: 100,
          fontSize: "1rem",
          fontWeight: "normal",
          textAlign: "left",
        }}
      >
        {team_name}
      </Typography>

      <Divider orientation="vertical" flexItem />

      {/* Status Icons */}
      {/* <Box sx={{ display: "flex", gap: 1, flexGrow: 1, justifyContent: "center", minWidth: 200 }}>
        {statuses.map((status, index) => (
          status ? (
            <CheckCircleIcon key={index} sx={{ color: "green", fontSize: "1.8rem" }} />
          ) : (
            <CancelIcon key={index} sx={{ color: "red", fontSize: "1.8rem" }} />
          )
        ))}
      </Box>

      <Divider orientation="vertical" flexItem /> */}

      {/* Wrong Answers Given */}
      {/* <Box sx={{ display: "flex", flexShrink: 0, minWidth: 50, gap: 1, justifyContent: "center", }}>
        <Typography variant="h6" sx={{ fontWeight: 'normal', fontSize: "1rem", whiteSpace: "nowrap", textAlign: "left"}}>
          {wrong_answers}
        </Typography>
      </Box>

      <Divider orientation="vertical" flexItem /> */}

      {/* Hints Given */}
      {/* <Box sx={{ display: "flex", flexShrink: 0, minWidth: 50, gap: 1, justifyContent: "center", }}>
        <Typography variant="h6" sx={{ fontWeight: 'normal', fontSize: "1rem", whiteSpace: "nowrap", textAlign: "left"}}>
          {hints_given}
        </Typography>
      </Box> */}

      {/* <Divider orientation="vertical" flexItem /> */}

      {/* Score */}
      <Box sx={{ display: "flex", width: 100, gap: 1, justifyContent: "center", }}>
        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: "1rem", whiteSpace: "nowrap", textAlign: "left"}}>
          {score} ⭐
        </Typography>
      </Box>
    </Card>
  );
};

export default TeamCard;
