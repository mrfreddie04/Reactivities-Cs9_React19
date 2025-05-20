import { Group } from "@mui/icons-material";
import { Box, AppBar, Toolbar, Container, MenuItem, Typography, LinearProgress } from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";
import { useStore } from "../../lib/hooks/useStore";
import { Observer } from "mobx-react-lite";
import { useAccount } from "../../lib/hooks/useAccount";
import UserMenu from "./UserMenu";


export default function NavBar() {
  //const navigate = useNavigate();
  const { uiStore } = useStore();
  const { currentUser } = useAccount();

  //console.log("NavBar");

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
              <MenuItemLink component={NavLink} to='/counter'>
                Counter
              </MenuItemLink>           
              <MenuItemLink component={NavLink} to='/errors'>
                Errors
              </MenuItemLink>                                                   
            </Box>
            <Box  display='flex' alignItems='center'>
              { currentUser ? (
                <UserMenu />                
              ) : (
                <>
                  <MenuItemLink to='/login'>Login</MenuItemLink>
                  <MenuItemLink to='/register'>Register</MenuItemLink>
                </>
              )}
            </Box>
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