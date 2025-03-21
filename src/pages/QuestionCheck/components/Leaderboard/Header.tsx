import Typography from "@mui/material/Typography";
import {Box, Card, Divider} from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        minHeight: 40,
        gap: 2,
        backgroundColor: "#f6f6f6",
        boxShadow: 2,
        borderRadius: 1,
      }}
    >
      {/* Team Name */}
      <Typography
        variant="h6"
        sx={{
          paddingLeft: 2,
          flexShrink: 0,
          width: 100,
          fontSize: "1rem",
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        Team Name
      </Typography>

      <Divider orientation="vertical" flexItem/>

      {/* Score */}
      <Box
        sx={{
          display: "flex",
          flexShrink: 0,
          minWidth: 120,
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "1rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Points
        </Typography>
      </Box>
    </Card>
  );
};

export default Header;
