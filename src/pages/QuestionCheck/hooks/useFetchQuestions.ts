import { useQuery } from "@tanstack/react-query";

const fetchQuestions = async () => {
  const response = await fetch(
    "https://isph-mini-cs50x-api.vercel.app/questions",
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

const useFetchQuestions = () => {
  return useQuery({
    queryKey: ["questions"],
    queryFn: fetchQuestions,
  });
};

export default useFetchQuestions;
