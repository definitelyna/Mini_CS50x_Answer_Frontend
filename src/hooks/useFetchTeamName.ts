import { useQuery } from "@tanstack/react-query";

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

const useFetchTeamName = (email: string, accessToken: string) => {
  return useQuery({
    queryKey: ["teamName"],
    queryFn: () => fetchTeamName(email, accessToken),
  });
};

export default useFetchTeamName;
