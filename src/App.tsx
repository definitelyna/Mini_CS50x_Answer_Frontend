import { useState, useEffect } from "react";
import { createClient, User } from "@supabase/supabase-js";
import QuestionCheck from "./pages/QuestionCheck/QuestionCheck";
import InputTeam from "./pages/InputTeam/InputTeam";
import useFetchQuestions from "./pages/QuestionCheck/hooks/useFetchQuestions";
import useTeamRankings from "./pages/QuestionCheck/hooks/useTeamRankings";
import { CircularProgress, Box } from "@mui/material";
import SignIn from "./pages/SignIn/SignIn";
import useFetchTeamSolves from "./hooks/useFetchTeamSolves";
import fetchTeamName from "./utils/fetchTeamName";

interface Session {
  expires_at?: number;
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

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [authState, setAuthState] = useState<{
    email: string | undefined;
    accessToken: string;
    teamName: string | null;
    teamNameId: string;
  }>({
    email: "",
    accessToken: "",
    teamName: null,
    teamNameId: "",
  });

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (session) {
        fetchTeamName(session.user.email, session.access_token).then((data) => {
          setAuthState({
            email: session.user.email,
            accessToken: session.access_token,
            teamName: data.team_name,
            teamNameId: data.team_name_id,
          });
        });
      } 
    });

    return () => subscription.unsubscribe();
  }, []);

  const { teamName, teamNameId } = authState;

  // Ensure the API calls only trigger when data is available
  const { data: teamRankings, isLoading: isTeamRankingsLoading } =
    useTeamRankings();

  const {
    data: teamSolves,
    isLoading: isTeamSolvesLoading,
    refetch,
  } = useFetchTeamSolves(teamNameId);

  // Trigger a refetch as soon as `teamNameId` is available
  useEffect(() => {
    if (teamNameId) {
      refetch(); // Ensures fetch happens in the same render cycle
    }
  }, [teamNameId, refetch]);

  const { data: questionList, isLoading: isQuestionLoading } =
    useFetchQuestions();

  if (!session) {
    return <SignIn supabase={supabase} />;
  } else if (
    isTeamSolvesLoading ||
    isQuestionLoading ||
    isTeamRankingsLoading
  ) {
    return (
      <Box
        sx={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "#A51C30" }} />
      </Box>
    );
  } else if (teamName == null) {
    return <InputTeam setAuthState={setAuthState} teamNameId={teamNameId} />;
  } else {
    return (
      <QuestionCheck
        teamName={teamName}
        teamNameId={teamNameId}
        questionList={questionList}
        teamSolves={teamSolves}
        teamRankings={teamRankings}
      />
    );
  }
};

export default App;
