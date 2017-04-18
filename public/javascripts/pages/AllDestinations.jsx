import React from 'react';
import axios from 'axios'
import { URL_FOR_DESTINATIONS } from '../config.js'
import { Link } from 'react-router';

export default class AllDestinations extends React.Component {

    constructor (props) {
        super(props)
        this.state = { destinations: []}

        this.userID = localStorage.getItem('_id')
        this.getDestinations = this.getDestinations.bind(this)
        this.renderDestinations = this.renderDestinations.bind(this)
        this.handleDeleteDestinationl = this.handleDeleteDestinationl.bind(this)
    }
    
    componentWillMount() {
        this.getDestinations() // Get destinations data to display
    }

    getDestinations() {
        axios.get(URL_FOR_DESTINATIONS + '/all/' + this.userID)
        .then((res) => this.setState({ destinations: res.data }))
    }

    renderDestinations() {
        let destinations = this.state.destinations.map((destination) => {
            return (
                <tr key={destination._id}>
                    <td>{destination.title}</td>
                    <td><Link to={'/dashboard/destination-images/' + destination._id}>Images</Link></td>
                    <td><span onClick={() => this.handleDeleteDestinationl(destination._id)} className='remove glyphicon glyphicon-trash'></span></td>
                    <td><Link to={'/dashboard/edit-destination/' + destination._id} className='edit glyphicon glyphicon-edit'></Link></td>
                </tr>
            )
        })
        return destinations
    }

    handleDeleteDestinationl(id) {
        const confirm = window.confirm("Delete destination?")
        if (confirm) axios.delete(URL_FOR_DESTINATIONS + '/one/' + id)
        .then((res) => this.getDestinations())
    }

    render(){
        return (
        <div className="row">
            <div className="col-xs-7">
                <h3>Destinations <Link to={'/dashboard/new-destination'} className='new-link'><i className='glyphicon glyphicon-plus'></i> New Destination</Link></h3>
                <br/>
                <table className="table table-hover">
                    <tbody>
                        {this.renderDestinations()}
                    </tbody>
                </table>
            </div>           
        </div>
        );
    }
}
