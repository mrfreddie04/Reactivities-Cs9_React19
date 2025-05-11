import { Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router";

export default function ServerError() {
  const { state } = useLocation();
  
  return (
    <Paper>
      { state?.error ? (
        <>
          <Typography gutterBottom variant="h3" color='secondary' sx={{paddingX: 4, paddingTop: 2}}>
            {state.error?.message || 'There has been an error'}
          </Typography>
          <Divider/>
          <Typography variant="body1" sx={{padding: 4}}>
            {state.error?.details || 'Internal server error'}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" sx={{color: 'secondary'}}>
            Server error
        </Typography>
      )}
    </Paper>
  )
}
