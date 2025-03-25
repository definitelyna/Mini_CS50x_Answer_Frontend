import {
  Box,
  TextField,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { ChangeEvent, useState, useMemo } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import updateTeamName from "./utils/updateTeamName";

interface Props {
  teamNameId: string;
  setAuthState: (authState: {
    email: string | undefined;
    accessToken: string;
    teamName: string | null;
    teamNameId: string;
  }) => void;
}

const theme = createTheme({
  palette: {
    secondary: {
      main: "#A51C30", // Crimson Red
    },
  },
  components: {
    MuiInput: {
      styleOverrides: {
        underline: {
          "&:before": {
            borderBottomColor: "#A51C30", // Lighter Red
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottomColor: "#A51C30", // Lighter Red
          },
        },
      },
    },
  },
});

// Function to generate evenly spaced but slightly randomized ducks
const generateDucks = (rows: number, cols: number) => {
  const ducks = [];
  const spacingX = 100 / cols;
  const spacingY = 100 / rows;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      ducks.push({
        id: `${row}-${col}`,
        top: `${
          row * spacingY + Math.random() * (spacingY * 0.6) - spacingY * 0.3
        }%`,
        left: `${
          col * spacingX + Math.random() * (spacingX * 0.6) - spacingX * 0.3
        }%`,
        rotation: `${Math.random() * 360}deg`,
      });
    }
  }
  return ducks;
};

const InputTeam: React.FC<Props> = ({ teamNameId, setAuthState }) => {
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

    updateTeamName(teamNameId, inputTeamName).then((response) => {
      console.log(response);
      //@ts-ignore
      setAuthState((prevState) => ({
        ...prevState,
        teamName: inputTeamName,
      }));
    });
  };

  // Use useMemo to generate ducks only once when the component mounts
  const ducks = useMemo(() => generateDucks(10, 20), []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        bgcolor: "#f4eac6",
      }}
    >
      {/* Duck Background */}
      {ducks.map((duck) => (
        <Box
          key={duck.id}
          sx={{
            position: "absolute",
            width: 50,
            height: 50,
            backgroundImage: "url(/rubber-duck.png)",
            backgroundSize: "cover",
            top: duck.top,
            left: duck.left,
            transform: `rotate(${duck.rotation})`,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      ))}

      <ThemeProvider theme={theme}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width={300}
          sx={{
            background: "rgba(255, 255, 255, 1)",
            p: 3,
            borderRadius: 2,
            border: 1,
            borderColor: "black",
            zIndex: 2,
            color: "#A51C30"
          }}
        >
          <h1>Enter your team name</h1>

          <Box sx={{ mt: 4 }}>
            <TextField
              id="teamName"
              variant="standard"
              value={inputTeamName}
              color="secondary"
              onChange={handleInputTeamNameChange}
              error={error}
              helperText={error ? "Team name is required" : ""}
            />

            <Button
              variant="contained"
              color="secondary"
              sx={{ marginLeft: 3 }}
              onClick={handleSubmit}
            >
              <ArrowForwardIosIcon />
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  );
};

export default InputTeam;
