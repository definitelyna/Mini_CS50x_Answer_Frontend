const fetchTeamSolves = async (teamNameId: string) => {
    if (!teamNameId) {
      return [];
    }
  
    const response = await fetch(
      `https://isph-mini-cs50x-api.vercel.app/team/${encodeURI(
        teamNameId
      )}/questions`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    return response.json();
  };

export default fetchTeamSolves;