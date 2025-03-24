import { Box, TextField, Button } from "@mui/material";
import "./InputTeam.css";
import { ChangeEvent, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import updateTeamName from "./utils/updateTeamName";

interface User {
  id: string;
  email: string;
}

interface Session {
  expires_at: number;
  provider_token?: string | null;
  provider_refresh_token?: string | null;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: User;
}

interface Props {
  session: Session;
}

const InputTeam: React.FC<Props> = ({ session }) => {
  const [inputTeamName, setInputTeamName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleInputTeamNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTeamName(e.target?.value);
  };

  const handleSubmit = () => {
    if (inputTeamName === "") {
      setError(true);
      return;
    }

    const teamNameId = session.user.email;

    updateTeamName(teamNameId, inputTeamName).then(() => {});
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
          value={inputTeamName}
          onChange={handleInputTeamNameChange}
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
