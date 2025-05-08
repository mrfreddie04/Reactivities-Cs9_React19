import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/hooks/useStore";
import { Box, Button, ButtonGroup, List, ListItem, Paper, Typography } from "@mui/material";

const Counter = observer(function() {
  const { counterStore } = useStore();

  return (
    <Box display='flex' justifyContent='space-between'>
      <Box sx={{width: '60%'}}>
        <Typography variant="h4" gutterBottom>{counterStore.title}</Typography>
        <Typography variant="h6">The count is: {counterStore.count}</Typography>          
        <ButtonGroup sx={{marginTop:3}}>
          <Button variant="contained" color="error" onClick={() => counterStore.decrement()}>Decrement</Button>
          <Button variant="contained" color="success" onClick={() => counterStore.increment()}>Increment</Button>
          <Button variant="contained" color="primary" onClick={() => counterStore.increment(5)}>Increment by 5</Button>        
        </ButtonGroup>
      </Box>
      <Paper sx={{width: '40%', padding: 3}}>
        <Typography variant="h5">Counter events ({counterStore.eventCount})</Typography>
        <List>
          {counterStore.events.map( (event,index) => (
            <ListItem key={index}>{index+1}: {event}</ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  )
});

export default Counter;