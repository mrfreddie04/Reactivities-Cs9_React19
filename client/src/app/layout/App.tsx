import { useEffect, useState } from "react";
import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    axios.get<Activity[]>("https://localhost:5001/api/activities")
      .then((response) => setActivities(response.data));
    //cleanup
    //return () => {};
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(activity => activity.id === id));
    setEditMode(false);
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
    setEditMode(false);
  }

  const handleOpenForm = (id?: string) => {
    if(id) {
      handleSelectActivity(id);
    } else {
      handleCancelSelectActivity();
    }
    setEditMode(true);
  }

  const handleCloseForm = () => {
    setEditMode(false);
  }

  const handleSubmitForm = (activity: Activity) => {    
    if(activity.id) {
      setActivities( activities => activities.map( item => item.id === activity.id ? activity : item));
    } else {
      const newActivity = {...activity, id: activities.length.toString()};
      setSelectedActivity(newActivity);
      setActivities( activities => [...activities, newActivity]);
    }
    setEditMode(false);
  }

  const handleDeleteActivity = (id: string) => {
    setActivities( activities => activities.filter( activity => activity.id !== id));
  }
  
  return (
    <Box sx={{backgroundColor: '#eeeeee'}}>
      <CssBaseline/>
      <NavBar
        openForm={handleOpenForm}
      />
      <Container maxWidth='xl' sx={{marginTop: 3}}>
        <ActivityDashboard 
          activities={activities} 
          selectedActivity={selectedActivity} 
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          deleteActivity={handleDeleteActivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleCloseForm}
          submitForm={handleSubmitForm}
        />
      </Container>
    </Box>
  );
}

export default App;
