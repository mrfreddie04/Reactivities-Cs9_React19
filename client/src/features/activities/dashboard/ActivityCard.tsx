import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material"
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate } from "react-router";

type Props = {
  activity: Activity
}

export default function ActivityCard({activity}: Props) {
  const navigate = useNavigate();
  const { deleteActivity } = useActivities();   

  return (
    <Card sx={{borderRadius: 3, backgroundColor: '#ddd'}}>
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography sx={{color: 'text.secondary', marginBottom: 1}}>{activity.date}</Typography>
        <Typography variant="body2">{activity.description}</Typography>
        <Typography variant="subtitle1">{activity.city} / {activity.venue}</Typography>
      </CardContent>
      <CardActions sx={{display: 'flex', justifyContent: 'space-between', paddingBottom: 2}}>
        <Chip label={activity.category} variant="outlined"/>
        <Box display='flex' gap={1}>
          <Button 
            size='medium' variant='contained' color="error"
            onClick={() => deleteActivity.mutate(activity.id)}
            disabled={deleteActivity.isPending}
          >
            Delete
          </Button>        
          <Button 
            size='medium' variant='contained'
            onClick={() => {navigate(`/activities/${activity.id}`)}}
          >
            View
          </Button>
        </Box>
      </CardActions>
    </Card>
  )
}