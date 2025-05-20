import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "../../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAccount } from "../../lib/hooks/useAccount";
import { Box, Button, Paper, Typography } from "@mui/material";
import TextInput from "../../app/shared/components/TextInput";
import { LockOpen } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router";


export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useAccount(); 
  const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm<LoginSchema>({
    mode: 'onTouched',
    resolver: zodResolver(loginSchema)
  });

  const onSubmit: SubmitHandler<LoginSchema> = async (data: LoginSchema) => {
    await loginUser.mutateAsync(data, {
      onSuccess: () => {
        const url = location.state?.from || '/activities';
        // console.log("FROM",location.state?.from);
        console.log("URL",url)
        navigate(url);   
      }
    });      
  }  

  //console.log("LoginForm");

  return (
    <Paper 
      component='form' 
      onSubmit={handleSubmit(onSubmit)} 
      sx={{ display:'flex', flexDirection:'column', gap:3, maxWidth: 'md', marginX: 'auto', borderRadius: 3, padding: 3 }}
    >
      <Box display='flex' alignItems='center' justifyContent='center' gap={3} color='secondary.main'>
        <LockOpen fontSize='large' />
        <Typography variant="h4">Sign In</Typography>    
      </Box>
      <TextInput label='Email' name='email' control={control}/>   
      <TextInput label='Password' name='password' control={control} type='password' />
      <Button 
        type='submit'
        color='success' 
        size='large'
        variant='contained' 
        disabled={!isValid || isSubmitting}
      >
        Login
      </Button>
      <Typography sx={{textAlign: 'center'}}>
        Don't have an account?&nbsp; 
        <Typography component={Link} to="/register" color="primary">Sign up</Typography>
      </Typography>
    </Paper>     
  )
}

//sx={{marginLeft: 2}} - could use instead of &nbsp;