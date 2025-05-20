import { useLocation, useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import agent from "./../api/agent"; 
import { LoginSchema } from "../schemas/loginSchema";
import { RegisterSchema } from "../schemas/registerSchema";

export const useAccount = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { data: currentUser, isLoading: isLoadingUserInfo } = useQuery({ 
    queryKey: ['user'], 
    queryFn: async () => {
     //console.log("Fetching current user");
      const response = await agent.get<UserDto>(`/account/user-info`);
      return response.data;
    },
    enabled: !queryClient.getQueryData(['user']) && pathname !== '/login' && pathname !== '/register'
  });    

  const loginUser = useMutation({
    mutationFn: async (creds: LoginSchema) => {
      await agent.post<LoginSchema>("/login?useCookies=true", creds);
    },
    onSuccess: async () => {
      await queryClient.fetchQuery({ queryKey: ['user'] });   
    },    
  });    

  const registerUser = useMutation({
    mutationFn: async (creds: RegisterSchema) => {
      await agent.post<RegisterSchema>("/account/register", creds);      
      //console.log(result);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });   
      toast.info("Register successful - you can login now");
      navigate('/login');  
    }
    // onError: (error) => {
    //   console.log("ERROR",error);
    // }
  });      

  const logoutUser = useMutation({
    mutationFn: async () => {
      await agent.post("/account/logout");
    },
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: ['user'] });   
      queryClient.removeQueries({ queryKey: ['activities'] });   
      navigate('/');   
    },        
  });

  return { 
    loginUser,
    logoutUser,
    registerUser,
    isLoadingUserInfo,
    currentUser
  };  
}