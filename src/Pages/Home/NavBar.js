import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '../../../node_modules/@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { BrowserRouter as Router, Route, Redirect, withRouter } from "react-router-dom";



const bar_style = {
    background: 'rgba(0, 167, 210, 1)  ',
    boxShadow: '0.5px 0px 0px 3px rgba(255, 255, 255, .3)'
}

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class MenuAppBar extends React.Component {
    state = {
        loaded_doctors: [],
        anchorEl: null,
        prof:false,
        logout:false,
        home:false
    };

    handleChange = event => {
        this.setState({ auth: event.target.checked });
    };
    handlehome=event =>{
        this.setState({home:true})
    }
    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null,
            prof: true });
    };
    handleCloser = () => {
        this.setState({ anchorEl: null,
            logout: true });
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        if (this.state.home & window.location.href.split("/")[3]!="Homepage") {return <Redirect to={{ pathname: '/Homepage' }} />}
        if (this.state.logout) {return <Redirect to={{ pathname: '/login' }} />}
        if (this.state.prof && localStorage.getItem('kind') == "patient") {if(window.location.href.split("/")[3]!="PatientProfile") return <Redirect to={{ pathname: '/PatientProfile' }} />}
        if (this.state.prof && localStorage.getItem('kind') == "doctor") {if(window.location.href.split("/")[3]!="Doctor") return <Redirect to={{ pathname: '/Doctor' }} />}
        return (
            <div>
                <div className={classes.root} >
                    <AppBar position='static' style={bar_style}>
                        <Toolbar>
                            <IconButton onClick={this.handlehome} className={classes.menuButton} style={bar_style} color="inherit" aria-label="Menu">
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.grow}>
                                NEDA
                            </Typography>
                            <div>
                                <IconButton style={bar_style}
                                    aria-owns={open ? 'menu-appbar' : false}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color='inherit'
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={this.handleCloser}>Logout</MenuItem>
                                </Menu>
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>
            </div>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);