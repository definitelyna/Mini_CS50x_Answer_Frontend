import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import supabase from '../utils/supabaseClient';

const fetchRankings = async () => {
  const response = await fetch(
    'https://isph-mini-cs50x-api.vercel.app/ranking'
  );
  if (!response.ok) throw new Error('Failed to fetch rankings');
  return response.json();
};

const useTeamRankings = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['rankings'],
    queryFn: fetchRankings,
    staleTime: 60000, // Cache for 1 min
    refetchInterval: 30000, // Polling every 30s
  });

  useEffect(() => {
    const submissionsSubscription = supabase
      .channel('submissions')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'submissions' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['rankings'] });
        }
      )
      .subscribe();

    const hintsSubscription = supabase
      .channel('hints_given')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'hints_given' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['rankings'] });
        }
      )
      .subscribe();

    return () => {
      submissionsSubscription.unsubscribe();
      hintsSubscription.unsubscribe();
    };
  }, [queryClient]);

  return query;
};

export default useTeamRankings;
