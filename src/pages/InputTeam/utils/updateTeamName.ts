const updateTeamName = async (teamNameId: string, inputTeamName: string) => {
  console.log(teamNameId, inputTeamName)

  const response = await fetch(
    "https://isph-mini-cs50x-api.vercel.app/update-team-name",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ team_name_id: teamNameId, team_name: inputTeamName }),
      redirect: "follow",
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export default updateTeamName;
