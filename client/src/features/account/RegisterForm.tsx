import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterSchema, registerSchema } from "../../lib/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockOpen } from "@mui/icons-material";
import { Paper, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router";
import TextInput from "../../app/shared/components/TextInput";
import { useAccount } from "../../lib/hooks/useAccount";


export default function RegisterForm() {
  const { registerUser } = useAccount(); 
  const { control, handleSubmit, setError, formState: { isValid, isSubmitting } } = useForm<RegisterSchema>({
    mode: 'onTouched',
    resolver: zodResolver(registerSchema)
  });

  const onSubmit: SubmitHandler<RegisterSchema> = async (data: RegisterSchema) => {
    registerUser.mutate(data, {
      onError: (errors) => {
        if( Array.isArray(errors)) {
          errors.forEach( (error: string) => {     
            const err = error.toLowerCase();  
            if(err.includes('email')) setError('email',{message: error});
            else if(err.includes('displayName')) setError('displayName',{message: error});
            else if(err.includes('password')) setError('password',{message: error});
            else setError('root',{message: error});
          })
        }
      }  
    });      
  }  
    
  return (
    <Paper 
      component='form' 
      onSubmit={handleSubmit(onSubmit)} 
      sx={{ display:'flex', flexDirection:'column', gap:3, maxWidth: 'md', marginX: 'auto', borderRadius: 3, padding: 3 }}
    >
      <Box display='flex' alignItems='center' justifyContent='center' gap={3} color='secondary.main'>
        <LockOpen fontSize='large' />
        <Typography variant="h4">Sign Up</Typography>    
      </Box>
      <TextInput label='Display name' name='displayName' control={control}/>   
      <TextInput label='Email' name='email' control={control}/>
      <TextInput label='Password' name='password' control={control} type='password' />

      <Button 
        type='submit'
        color='success' 
        size='large'
        variant='contained' 
        disabled={!isValid || isSubmitting}
      >
        Register
      </Button>
      <Typography sx={{textAlign: 'center'}}>
        Already have an account?&nbsp; 
        <Typography component={Link} to="/login" color="primary">Sign in</Typography>
      </Typography>
    </Paper>     
  )
}
