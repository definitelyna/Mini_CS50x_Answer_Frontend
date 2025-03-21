import React from "react";

import {Flipped, Flipper} from "react-flip-toolkit";

import TeamCard from "./TeamCard.js";
import {Box, Divider} from "@mui/material";
import Header from "./Header.js";

// @ts-ignore
interface LeaderboardTableProps {
  rankings?: any
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({rankings}) => {
  return (
    <Box sx={{width: "100%", borderRadius: 2, mt: 2}}>
      <Header/>
      <Divider sx={{width: "100%", my: 1}}/>
      <Flipper flipKey={rankings.map((d: any) => d.team_name).join("-")}>
        <Box
          component="ul"
          sx={{width: "100%", listStyle: "none", padding: 0, margin: 0}}
        >
          {rankings.map((d: any, index: any) => (
            <Flipped key={d.team_name + index} flipId={d.team_name}>
              <Box component="li" sx={{mb: 1}}>
                <TeamCard teamData={d}/>
              </Box>
            </Flipped>
          ))}
        </Box>
      </Flipper>
    </Box>
  );
};

export default LeaderboardTable;
