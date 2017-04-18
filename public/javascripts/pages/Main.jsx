import React from "react";
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class Main extends React.Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
      // Redirect if not logged in
      if (!localStorage._id && !localStorage.email) location.href = "#/"
    }

    logout() {
        localStorage.clear()
        location.href = '/'
    }

    render() {
        return (
        <div className="">

            <div className="col-xs-3">
            <MuiThemeProvider>
            <Drawer className="drawer" open={true}>
                <img className="logo-black" src="../uploads/logo-black.jpeg" alt="Logo"/>
                <br/><br/>
                <Link to='/dashboard'><MenuItem>Home</MenuItem></Link>
                <Link to='/dashboard/services'><MenuItem>Services</MenuItem></Link>
                <Link to='/dashboard/destinations'><MenuItem>Destinations</MenuItem></Link>
                <Link to='/dashboard/hotels'><MenuItem>Hotels</MenuItem></Link>
                <Link to='/dashboard/new-destination' onClick={() => this.logout()}><MenuItem>Logout</MenuItem></Link>
            </Drawer>
            </MuiThemeProvider>
            </div>

            <div className="col-xs-9 main-area">
                {this.props.children}
            </div>
        </div>
       );
    }
}
