import { useState, useEffect } from "react";
import { createClient, User } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import QuestionCheck from "./pages/QuestionCheck/QuestionCheck";
import InputTeam from "./pages/InputTeam/InputTeam";
import useFetchQuestions from "./pages/QuestionCheck/hooks/useFetchQuestions";
import useFetchTeamSolves from "./pages/QuestionCheck/hooks/useFetchTeamSolves";
import useTeamRankings from "./pages/QuestionCheck/hooks/useTeamRankings";
import { CircularProgress, Box } from "@mui/material";

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
      body: JSON.stringify({ email: session.user.email }),
      redirect: "follow",
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

const App = () => {
  const [session, setSession] = useState(null);
  const [teamNameId, setTeamNameId] = useState<string>("");
  const [teamName, setTeamName] = useState<string>("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      // @ts-ignore
      setSession(session);
      // @ts-ignore

      if (session !== null) {
        const safeSession = { ...session, expires_at: session.expires_at ?? 0 };
        fetchTeamName(safeSession).then((data) => {
          console.log(data);
          setTeamNameId(data.team_name_id);
          setTeamName(data.team_name);
        });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // @ts-ignore
      setSession(session);
      // @ts-ignore
    });

    return () => subscription.unsubscribe();
  }, []);

  const { data: questionList, isLoading: isQuestionLoading } =
    useFetchQuestions();

  const { data: teamSolves, isLoading: isTeamSolvesLoading } =
    useFetchTeamSolves(teamNameId);

  const { data: teamRankings, isLoading: isTeamRankingsLoading } =
    useTeamRankings();

  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
        showLinks={false}
      />
    );
  } else if (
    isQuestionLoading ||
    isTeamSolvesLoading ||
    isTeamRankingsLoading
  ) {
    return (
      <Box sx={{ display: "flex", width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress sx={{ color: "#A51C30"}} />;
      </Box>
    );
  } else if (teamName == null) {
    return <InputTeam session={session} />;
  } else {
    return (
      <QuestionCheck
        teamNameId={teamNameId}
        questionList={questionList}
        teamSolves={teamSolves}
        teamRankings={teamRankings}
      />
    );
  }
};

export default App;
