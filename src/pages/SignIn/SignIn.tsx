import { useState } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

interface Props {
  supabase: SupabaseClient<any, "public", any>;
}

const SignIn: React.FC<Props> = ({ supabase }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    
    if (error) alert(error.message);
    setLoading(false);
  };

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h5">Sign In</Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSignIn}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </Container>
  );
};

export default SignIn;
