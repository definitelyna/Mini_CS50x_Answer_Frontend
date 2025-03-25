import { useState, useMemo } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import {
  TextField,
  Button,
  Typography,
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Props {
  supabase: SupabaseClient<any, "public", any>;
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
      const top = Math.min(
        Math.max(
          row * spacingY + Math.random() * (spacingY * 0.6) - spacingY * 0.3,
          0
        ),
        100
      );
      const left = Math.min(
        Math.max(
          col * spacingX + Math.random() * (spacingX * 0.6) - spacingX * 0.3,
          0
        ),
        100
      );

      ducks.push({
        id: `${row}-${col}`,
        top: `${top}%`,
        left: `${left}%`,
        rotation: `${Math.random() * 360}deg`,
      });
    }
  }
  return ducks;
};

const SignIn: React.FC<Props> = ({ supabase }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const ducks = useMemo(() => generateDucks(10, 20), []);

  const handleSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
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

      {/* Sign-In Form */}
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
          zIndex: 2,
        }}
      >
        <Box textAlign={"center"} color={"#A51C30"}>
          <h1>Welcome to Mini CS50x Puzzle Day!</h1>
          <br />
          <h3 style={{ color: "black" }}>
            Please enter the login details in the slip sheet provided
          </h3>
        </Box>
        <ThemeProvider theme={theme}>
          <TextField
            label="Email"
            variant="standard"
            margin="normal"
            fullWidth
            color="secondary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{color: "#A51C30"}}
            InputLabelProps={{
              style: { color: "#A51C30" },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="standard"
            fullWidth
            margin="normal"
            color="secondary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              style: { color: "#A51C30" },
            }}
          />

          {error && <Typography color="error">{error}</Typography>}
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSignIn}
            disabled={loading}
            sx={{ mt: 2 }}
          >
            <ArrowForwardIosIcon />
          </Button>
        </ThemeProvider>
      </Box>
    </Box>
  );
};

export default SignIn;
