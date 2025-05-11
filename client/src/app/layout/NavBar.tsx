import { Group } from "@mui/icons-material";
import { Box, AppBar, Toolbar, Container, MenuItem, Typography, Button, LinearProgress } from "@mui/material";
import { NavLink, useNavigate } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";
import { useStore } from "../../lib/hooks/useStore";
import { Observer } from "mobx-react-lite";


export default function NavBar() {
  const navigate = useNavigate();
   const { uiStore } = useStore();

  return (
    <Box sx={{ flexGrow: 1, position: 'relative' }}>
      <AppBar 
        position="static" 
        sx={{ backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)'}}
      >
        <Container maxWidth='xl'>
          <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box>
              <MenuItem component={NavLink} to='/' sx={{display: 'flex', gap: 2}}>
                <Group fontSize="large"/>
                <Typography variant="h4" fontWeight='bold'>
                  Reactivities
                </Typography>
              </MenuItem>
            </Box>
            <Box sx={{display: 'flex'}}>
              <MenuItemLink component={NavLink} to='/activities'>
                Activities
              </MenuItemLink>
              <MenuItemLink component={NavLink} to='/createActivity'>
                Create Activity
              </MenuItemLink>     
              <MenuItemLink component={NavLink} to='/counter'>
                Counter
              </MenuItemLink>           
              <MenuItemLink component={NavLink} to='/errors'>
                Errors
              </MenuItemLink>                                                   
            </Box>
            <Button 
              size="large" 
              variant="contained" 
              color="warning" 
              onClick={() => {navigate("/createActivity")}}
            >
              User Menu
            </Button>
          </Toolbar>
        </Container>
        <Observer>
          {() => uiStore.isLoading ? (
            <LinearProgress 
              color="secondary" 
              sx={{
                position:"absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 4
              }}
            />
          ) : null }
        </Observer>
      </AppBar>
    </Box>
  )
}