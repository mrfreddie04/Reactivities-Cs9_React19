import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

type Props = {
  activities: Activity[];
  selectedActivity?: Activity;
  editMode : boolean;
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  deleteActivity: (id: string) => void;
  openForm: (id: string) => void;
  closeForm: () => void;
  submitForm: (activity: Activity) => void;
};

export default function ActivityDashboard({
  activities, selectedActivity, selectActivity, cancelSelectActivity, deleteActivity, editMode, openForm, closeForm, submitForm
}: Props) {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={7}>
        <ActivityList 
          activities={activities} 
          selectActivity={selectActivity}
          deleteActivity={deleteActivity}
        />
      </Grid2>
      <Grid2 size={5}>
        {selectedActivity && !editMode && <ActivityDetails 
          activity={selectedActivity} 
          cancelSelectActivity={cancelSelectActivity}
          openForm={openForm}
        />}
        {editMode && <ActivityForm 
          activity={selectedActivity} 
          closeForm={closeForm}
          submitForm={submitForm}
        />}
      </Grid2>
    </Grid2>
  )
}