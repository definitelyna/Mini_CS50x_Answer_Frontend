const fetchTeamName = async (email: string, accessToken: string) => {
  const response = await fetch(
    "https://isph-mini-cs50x-api.vercel.app/get-team-name",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ email: email }),
      redirect: "follow",
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export default fetchTeamName;