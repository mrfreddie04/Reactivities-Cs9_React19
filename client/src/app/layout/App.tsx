import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet, useLocation } from "react-router";
import HomePage from "../../features/home/HomePage";

function App() {
  const { pathname } = useLocation();
  
  return (
    <Box sx={{backgroundColor: '#eeeeee', minHeight: '100vh'}}>
      <CssBaseline/>
      { pathname === '/' ? (<HomePage/>) : (
        <>
          <NavBar />
          <Container maxWidth='xl' sx={{marginTop: 3}}>
            <Outlet />
          </Container>
        </>
      )}
    </Box>
  );
}

export default App;
