import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material"
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";

export default function ActivityDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { activity, isLoadingActivity } = useActivities(id); 

  if(isLoadingActivity) {
    return (
      <Card sx={{borderRadius: 3, backgroundColor: '#ccc'}}>
        <CardContent>
          <Typography variant="h5">Loading...</Typography>
        </CardContent>
      </Card>
    );
  }  

  if(!activity) {
    return (
      <Card sx={{borderRadius: 3, backgroundColor: '#ccc'}}>
        <CardContent>
          <Typography variant="h5" color="error">Activity not found</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{borderRadius: 3, backgroundColor: '#ccc'}}>
      <CardMedia 
        component='img'
        src={`/images/categoryImages/${activity.category}.jpg`}
      />
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography variant="subtitle1" fontWeight='light'>{activity.date}</Typography>
        <Typography variant="body1">{activity.description}</Typography>
      </CardContent>
      <CardActions sx={{display: 'flex', justifyContent: 'start', gap: 1}}>
        <Button color='primary' onClick={()=>{navigate(`/manage/${activity.id}`)}}>
          Edit
        </Button>
        <Button color='inherit' onClick={()=>{navigate('/activities')}}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  )
}