import {Box, TextField, Button} from "@mui/material";
import "./InputTeam.css";
import {ChangeEvent, useState, useEffect} from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {createClient, User} from "@supabase/supabase-js";
import {Auth} from "@supabase/auth-ui-react";
import {ThemeSupa} from "@supabase/auth-ui-shared";
import QuestionCheck from "../QuestionCheck/QuestionCheck";
import updateTeamName from "./utils/updateTeamName";

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

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const fetchTeamName = async (session: Session) => {
  const response = await fetch(
    "https://isph-mini-cs50x-api.vercel.app/get-team-name",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: session.access_token,
      },
      body: JSON.stringify({email: session.user.email}),
      redirect: "follow",
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

const InputTeam = () => {
  const [session, setSession] = useState(null);
  const [, setEmail] = useState<string>("");
  const [teamNameId, setTeamNameId] = useState<string>("");
  const [teamName, setTeamName] = useState<string>("");
  const [inputTeamName, setInputTeamName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      // @ts-ignore
      setSession(session);
      // @ts-ignore
      setEmail(session?.user.email);


      if (session !== null) {
        const safeSession = {...session, expires_at: session.expires_at ?? 0};
        fetchTeamName(safeSession).then((data) => {
          console.log(data);
          setTeamNameId(data.team_name_id);
          setTeamName(data.team_name);
        });
      }
    });

    const {
      data: {subscription},
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // @ts-ignore
      setSession(session);
      // @ts-ignore
      setEmail(session?.user.email);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleInputTeamNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTeamName(e.target?.value);
  };

  const handleSubmit = () => {
    if (inputTeamName === "") {
      setError(true);
      return;
    }

    updateTeamName(teamNameId, inputTeamName).then(() => {
      ;
    });
  };

  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        appearance={{theme: ThemeSupa}}
        providers={[]}
        showLinks={false}
      />
    );
  } else if (teamName == null) {
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
          <br/>
          Mini CS50x Puzzle Day!
          <br/>
          <br/>
          What's your team name?
        </h1>

        <Box sx={{mt: 4}}>
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
            sx={{marginLeft: 3}}
            onClick={handleSubmit}
          >
            <ArrowForwardIosIcon/>
          </Button>
        </Box>
      </Box>
    );
  } else {
    return <QuestionCheck teamNameId={teamNameId}/>;
  }
};

export default InputTeam;
