import { Grid2, Typography } from "@mui/material";
import ActivityList from "./ActivityList";
import { useActivities } from "../../../lib/hooks/useActivities";
import ActivityFilters from "./ActivityFilters";

export default function ActivityDashboard() {
  const { activities, isLoadingActivities } = useActivities(); 

  if(isLoadingActivities ) {
    return (<Typography>Loading...</Typography>);
  }

  if(!activities ) {
    return (<Typography>No activities found</Typography>);
  }

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={8}>
        <ActivityList />
      </Grid2>
      <Grid2 size={4}>
        <ActivityFilters />
      </Grid2>
    </Grid2>
  )
}