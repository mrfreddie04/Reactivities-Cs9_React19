import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import agent from "./../api/agent";
import { AxiosResponse } from 'axios';
import { useLocation } from 'react-router';

export const useActivities = (id?: string) => {
  const { pathname } = useLocation();

  const { data: activities, isPending:  isLoadingActivities } = useQuery({ 
    queryKey: ['activities'], 
    queryFn: async () => {
      const response = await agent.get<Activity[]>("/activities");
      return response.data;
    },
    enabled: !id && pathname === '/activities'
    //,staleTime: 1000 * 60 * 5
  });

  const { data: activity, isLoading: isLoadingActivity } = useQuery({ 
    queryKey: ['activities', id], 
    queryFn: async () => {
      const response = await agent.get<Activity>(`/activities/${id}`);
      return response.data;
    },
    enabled: !!id 
  });  

  const queryClient = useQueryClient();

  const updateActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      await agent.put<Activity>("/activities", activity);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['activities'] });      
    },    
  });  

  const createActivity = useMutation({
    mutationFn: async (activity: CreateActivityDto) => {
      const response = await agent.post<string, AxiosResponse<string,CreateActivityDto>, CreateActivityDto>("/activities", activity);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['activities'] });      
    },    
  });    

  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/activities/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['activities'] });      
    },    
  });      

  return { 
    activities, 
    isLoadingActivities,
    activity,
    isLoadingActivity,
    updateActivity,
    createActivity,
    deleteActivity
  };
}