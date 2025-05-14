import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { activitySchema, ActivitySchema } from "../../../lib/schemas/activitySchema";
import TextInput from "../../../app/shared/components/TextInput";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/LocationInput";

export default function ActivityForm() {
  const { control, reset, handleSubmit } = useForm<ActivitySchema>({
    mode: 'onTouched',
    resolver: zodResolver(activitySchema)
  });
  const navigate = useNavigate();  
  const { id } = useParams();
  const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id); 

  useEffect(() => {
    if(activity) {
      reset({
        ...activity,
        location: {
          city: activity.city,
          venue: activity.venue,
          latitude: activity.latitude,
          longitude: activity.longitude
        }
      });
    }
  },[activity, reset]);

  const onSubmit: SubmitHandler<ActivitySchema> = async (data) => {
    const { location,...rest } = data;
    const flattenedData = {...rest, ...location};

    try {
      if(activity) {
        updateActivity.mutateAsync({...activity,...flattenedData}, {
          onSuccess: () => navigate(`/activities/${activity.id}`)
        });
      } else {
        console.log("Create", flattenedData);
        createActivity.mutate(flattenedData, {
          onSuccess: (id) => navigate(`/activities/${id}`)
        });
      }
    } catch(error) {
      console.log(error);
    }
  };

  if(isLoadingActivity) {
    return (
      <Paper sx={{borderRadius: 3, padding: 3}}>
        <Typography variant="h5" gutterBottom color="primary">
          Loading activity...
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{borderRadius: 3, padding: 3}}>
      <Typography variant="h5" gutterBottom color="primary">
        { activity ? 'Edit activity' : 'Create activity'}
      </Typography>
      <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={3}>
        <TextInput label='Title' name='title' control={control}/>
        <TextInput label='Description' name='description' multiline rows={3} control={control}/>
        <Box display='flex' gap={3}>
          <SelectInput label='Category' name='category' control={control} items={categoryOptions}/>
          <DateTimeInput label='Date' name='date' control={control}/>
        </Box>
        
        {/* <TextInput label='City' name='city' control={control}/>
        <TextInput label='Venue' name='venue' control={control}/> */}
        <LocationInput label='Enter the location' name='location' control={control}/>

        <Box display='flex' justifyContent='end' gap={3}>
          <Button color='inherit' type='button' onClick={()=>{}}>Cancel</Button>
          <Button 
            color='success' 
            variant='contained' 
            type='submit'
            disabled={updateActivity.isPending || createActivity.isPending}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}