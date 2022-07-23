import React from 'react';
import classes from './AppHeader.module.css';
import {Link} from "react-router-dom";
import {Button} from "@mui/material";

const AppHeader = () => {
    return (
        <div className={classes.AppHeader}>
            <div className={classes.HeaderLeft}>
                <p>ARP 4 Rental</p>
            </div>
            <div className={classes.HeaderRight}>
                <Link to={"/"}>
                        <Button className={classes.MenuButton} variant={"contained"}>Home</Button>
                </Link>
                <Link to={"/cars"}>
                    <Button className={classes.MenuButton} variant={"contained"}>List</Button>
                </Link>
                <Link to={"/rent"}>
                    <Button className={classes.MenuButton} variant={"contained"}>Form</Button>
                </Link>
            </div>
        </div>
    );
};

export default AppHeader;
