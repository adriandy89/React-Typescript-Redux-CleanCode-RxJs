import FavoriteIcon from '@mui/icons-material/Favorite';
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { CustomDialog, FavoriteTable } from "..";
import { dialogOpenSubject$ } from "../CustomDialog/CustomDialog";

interface INavBarProps {}

const NavBar: React.FC<INavBarProps> = () => {

  const handleClick = () => {
    dialogOpenSubject$.setSubject = true;
  };

  return (
    <>
      <CustomDialog>
        <FavoriteTable />
      </CustomDialog>    
      <AppBar position="fixed">
        <Toolbar>          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            React App
          </Typography>
          <IconButton color="secondary" aria-label="favorites" component="label" onClick={handleClick}>
            <FavoriteIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
