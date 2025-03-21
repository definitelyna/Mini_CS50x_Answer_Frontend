import React from "react";
import { Card, Typography, Box, Divider } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const TeamCard = ({ teamData }) => {
  const { team_name, solves, score, hints_given, wrong_answers } = teamData;
  const [statuses, _] = solves;

  return (
    <Card sx={{ display: "flex", alignItems: "center", justifyContent: 'space-evenly', gap: 2, minHeight: 40, boxShadow: 2, borderRadius: 1,}}>
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

      {/* Score */}
      <Box sx={{ display: "flex", width: 100, gap: 1, justifyContent: "center", minWidth: 120,}}>
        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: "1rem", whiteSpace: "nowrap", textAlign: "center"}}>
          {score} ⭐
        </Typography>
      </Box>
    </Card>
  );
};

export default TeamCard;
