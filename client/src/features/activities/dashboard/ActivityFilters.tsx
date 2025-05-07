import { FilterList, Event } from "@mui/icons-material";
import { Box, ListItemText, MenuItem, MenuList, Paper, Typography } from "@mui/material";
import Calendar from "react-calendar";
import 'react-calendar/dist/calendar.css';

export default function ActivityFilters() {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 3, borderRadius: 3}}>
      <Paper sx={{padding: 3, borderRadius: 3}}>
        <Box sx={{width: '100%'}}>
          <Typography variant="h6" sx={{display: 'flex', alignItems:'center', marginBottom: 1, color: 'primary.main'}}>
            <FilterList sx={{marginRight:1}}/>
            Filters
          </Typography>
          <MenuList>
            <MenuItem>
              <ListItemText primary='All events'/>
            </MenuItem>
            <MenuItem>
              <ListItemText primary="I'm going"/>
            </MenuItem>
            <MenuItem>
              <ListItemText primary="I'm hosting"/>
            </MenuItem>                        
          </MenuList>
        </Box>
      </Paper>
      <Box component={Paper} sx={{width:'100%', padding: 3, borderRadius: 3}}>
        <Typography variant="h6" sx={{display: 'flex', alignItems: 'center', marginBottom: 1, color: 'primary.main'}}>
          <Event sx={{marginRight: 1}}/> 
          Select date
        </Typography>
        <Calendar />
      </Box>
    </Box>
  )
}