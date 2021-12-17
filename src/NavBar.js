import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material/';
import { makeStyles } from '@mui/styles'
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
    button: {
        "&.active": {
        background:'grey',
        color: 'white'
    }
    },
    root: {
        "&:hover": {
            backgroundColor: 'lightgrey'
        }
    }
});

const NavBar = () => {
    const classes = useStyles();

    return (
        <AppBar position="static" style={{ marginBottom: '1%' }} color="default">
            <Toolbar>
                <Typography variant="h6">
                    <Button className={classes.button} component={NavLink} to="/world" color="inherit" disableRipple={true}>
                        World Cases
                    </Button>
                </Typography>

                <Typography variant="h6">
                    <Button className={classes.button} component={NavLink} to="/covid" color="inherit" disableRipple={true}>
                        World Statistic Table
                    </Button>
                </Typography>

                <Typography variant="h6">
                    <Button className={classes.button} component={NavLink} to="/uscases" color="inherit" disableRipple={true}>
                        US Cases
                    </Button>
                </Typography>

                <Typography variant="h6">
                    <Button className={classes.button} component={NavLink} to="/sources" color="inherit" disableRipple={true}>
                        Sources
                    </Button>
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;