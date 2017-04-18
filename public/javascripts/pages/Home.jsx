import React from 'react';
import axios from 'axios'
import { URL_FOR_HOME } from '../config.js'
import { Link } from 'react-router';

export default class Home extends React.Component {

    constructor (props) {
        super(props)
        this.state = {}

        this.userID = localStorage.getItem('_id')
        this.handleDeleteDestination = this.handleDeleteDestination.bind(this)
        this.handleDeleteService = this.handleDeleteService.bind(this)
    }
    
    componentWillMount() {
        axios.get(URL_FOR_HOME + '/info/' + this.userID)
        .then((res) => this.setState(res.data))
    }


    handleDeleteDestination(id) {
        const confirm = window.confirm("Delete Destination?")
        if (confirm) axios.delete(URL_FOR_DESTINATIONS + '/one/' + id)
        .then((res) => this.getDestinations())
    }

    handleDeleteService(id) {
        const confirm = window.confirm("Delete Service?")
        if (confirm) axios.delete(URL_FOR_SERVICES + '/one/' + id)
        .then((res) => this.getServices())
    }

    render(){
        return (
        <div className="row">
            <h5>Home Page</h5>

            <div className="col-xs-7">
            <h3><span className="label label-info">{this.state.destinationsCount}</span> &nbsp; Destinations
                <Link to={'/dashboard/new-destination'} className='new-link'>
                <i className='glyphicon glyphicon-plus'></i> New Destination
                </Link>
            </h3>
            <br />

            <h3><span className="label label-info">{this.state.servicesCount}</span> &nbsp; Services
                <Link to={'/dashboard/new-service'} className='new-link'>
                <i className='glyphicon glyphicon-plus'></i> New Service
                </Link>
            </h3>
            <br/>
            
            <h3><span className="label label-info">{this.state.hotelsCount}</span> &nbsp; Hotels 
                <Link to={'/dashboard/new-hotel'} className='new-link'>
                <i className='glyphicon glyphicon-plus'></i> New Hotel
                </Link>
            </h3>
            </div>
        </div>
        );
    }
}
