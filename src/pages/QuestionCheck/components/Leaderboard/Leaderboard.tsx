import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import useTeamRankings from "../../hooks/useTeamRankings";
import LeaderboardTable from "./LeaderboardTable";


const Leaderboard : React.FC = () => {
  const { data: rankings, isLoading, isError } = useTeamRankings();

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        flexDirection="column"
      >
        <Typography
          variant="h4"
          color="#a40f33"
          align="center"
          sx={{ mt: 3, mb: 2 }}
        >
          ISPH Mini CS50x Leaderboard
        </Typography>
        <Typography color="error">Error fetching rankings.</Typography>
      </Box>
    );

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      sx={{ backgroundColor: "#fcf8ed", width: "100%", maxWidth: "400px" }}
    >
      <h2>Leaderboard</h2>
      <LeaderboardTable rankings={rankings} />
    </Box>
  );
};

export default Leaderboard;
