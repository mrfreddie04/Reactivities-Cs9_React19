import { Grid2, Typography } from "@mui/material";
import ActivityList from "./ActivityList";
import { useActivities } from "../../../lib/hooks/useActivities";

export default function ActivityDashboard() {
  const { activities, isLoadingActivities } = useActivities(); 

  if(!activities || isLoadingActivities ) {
    return (
      <Typography>Loading...</Typography>
    );
  }

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={7}>
        <ActivityList />
      </Grid2>
      <Grid2 size={5}>
        Activity filters go here
      </Grid2>
    </Grid2>
  )
}