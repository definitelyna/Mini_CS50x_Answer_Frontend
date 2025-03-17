import { Box, TextField, Button } from "@mui/material";
import "./InputTeam.css";
import { ChangeEvent, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

const InputTeam = () => {
  const navigation = useNavigate();
  const [teamName, setTeamName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleTeamNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target?.value);
  };

  const handleSubmit = () => {
    if (teamName === "") {
      setError(true);
      return;
    }

    // Save team name to local storage

    // Redirect to next page
    navigation("/QuestionCheck");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h1>
        Welcome to
        <br />
        Mini CS50x Puzzle Day!
        <br />
        <br />
        What's your team name?
      </h1>

      <Box sx={{ mt: 4 }}>
        <TextField
          id="teamName"
          variant="standard"
          value={teamName}
          onChange={handleTeamNameChange}
          error={error}
            helperText={error ? "Team name is required" : ""}
        />

        <Button
          variant="contained"
          sx={{ marginLeft: 3 }}
          onClick={handleSubmit}
        >
          <ArrowForwardIosIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default InputTeam;
