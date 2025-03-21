import { useQuery } from '@tanstack/react-query';

const fetchRankings = async () => {
  const response = await fetch(
    'https://isph-mini-cs50x-api.vercel.app/ranking'
  );
  if (!response.ok) throw new Error('Failed to fetch rankings');
  return response.json();
};

const useTeamRankings = () => {
  return useQuery({
    queryKey: ['rankings'],
    queryFn: fetchRankings,
    staleTime: 60000, // Cache for 1 min
    refetchInterval: 5000,
  });
};

export default useTeamRankings;
