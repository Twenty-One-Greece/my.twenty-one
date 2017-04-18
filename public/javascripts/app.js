import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Main from "pages/Main.jsx";
import Login from "pages/Login.jsx";
import Home from "pages/Home.jsx";
import Register from "pages/Register.jsx"
import NewService from 'pages/NewService.jsx'
import NewDestination from 'pages/NewDestination.jsx'
import NewHotel from 'pages/NewHotel.jsx'
import AllHotels from 'pages/AllHotels.jsx'
import AllDestinations from 'pages/AllDestinations.jsx'
import AllServices from 'pages/AllServices.jsx'
import ImagesService from 'pages/ImagesService.jsx'
import ImagesDestination from 'pages/ImagesDestination.jsx'
import EditDestination from 'pages/EditDestination.jsx'
import EditService from 'pages/EditService.jsx'
import EditHotel from 'pages/EditHotel.jsx'
import ImagesHotel from 'pages/ImagesHotel.jsx'

// Needed for onTouchTap
injectTapEventPlugin();

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Login}></Route>
        <Route path="/register" component={Register}></Route>

        <Route path="/dashboard" component={Main}>
            <IndexRoute component={Home}/>
            {/* List */}
            <Route path="/dashboard/hotels" component={AllHotels}></Route>
            <Route path="/dashboard/destinations" component={AllDestinations}></Route>
            <Route path="/dashboard/services" component={AllServices}></Route>
            {/* New */}
            <Route path="/dashboard/new-service" component={NewService}></Route>
            <Route path="/dashboard/new-destination" component={NewDestination}></Route>
            <Route path="/dashboard/new-hotel" component={NewHotel}></Route>
            {/* Edit */}
            <Route path="/dashboard/edit-destination/:destinationID" component={EditDestination}></Route>
            <Route path="/dashboard/edit-service/:serviceID" component={EditService}></Route>
            <Route path="/dashboard/edit-hotel/:hotelID" component={EditHotel}></Route>
            {/* Images */}
            <Route path="/dashboard/service-images/:serviceID" component={ImagesService}></Route>
            <Route path="/dashboard/hotel-images/:hotelID" component={ImagesHotel}></Route>
            <Route path="/dashboard/destination-images/:destinationID" component={ImagesDestination}></Route>
        </Route>
    </Router>,
    
    document.getElementById("content")
);
