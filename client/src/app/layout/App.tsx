import { useState } from "react";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useActivities } from "../../lib/hooks/useActivities";

function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);
  const { activities, isPending } = useActivities(); 

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities?.find(activity => activity.id === id));
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

  return (
    <Box sx={{backgroundColor: '#eeeeee', minHeight: '100vh'}}>
      <CssBaseline/>
      <NavBar
        openForm={handleOpenForm}
      />
      <Container maxWidth='xl' sx={{marginTop: 3}}>
        {!activities || isPending ? (
          <Typography>Loading...</Typography>
        ):(
          <ActivityDashboard 
            activities={activities} 
            selectedActivity={selectedActivity} 
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            editMode={editMode}
            openForm={handleOpenForm}
            closeForm={handleCloseForm}
          />
        )}
      </Container>
    </Box>
  );
}

export default App;
