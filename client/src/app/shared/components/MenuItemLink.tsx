import { MenuItem } from "@mui/material";
import { ReactNode } from "react";
import { NavLink } from "react-router";

type Props = {
  to: string;
  children: ReactNode;
  [key: string]: unknown;
}

export default function MenuItemLink({to, children,...props}: Props) {
  return (
    <MenuItem 
      {...props}
      component={NavLink} 
      to={to} 
      sx={{
        fontSize: '1.2rem', 
        textTransform: 'uppercase', 
        fontWeight: 'bold',
        color: 'inherit',
        '&.active': {
          color: 'yellow'
        }
      }}
    >
      {children}
    </MenuItem>
  );
}