import { Navigate, Outlet, useLocation } from "react-router";
import { Typography } from "@mui/material";
import { useAccount } from "../../lib/hooks/useAccount"

export default function RequireAuth() {
  const { isLoadingUserInfo, currentUser } = useAccount();
  const location = useLocation();

  if(isLoadingUserInfo) {
    return (<Typography>Loading...</Typography>);
  }

  if(!currentUser) {
    console.log("RequireAuth", location.pathname);
    return (<Navigate to='/login' state={{from: location}} />);
  }

  return (
    <Outlet />
  )
}
