import React from 'react';
import axios from 'axios'
import { URL_FOR_HOTELS } from '../config.js'
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

export default class AllHotels extends React.Component {

    constructor (props) {
        super(props)
        this.state = { hotels: [], title: ""}

        this.userID = localStorage.getItem('_id')
        this.getHotels = this.getHotels.bind(this)
        this.renderHotels = this.renderHotels.bind(this)
        this.handleDeleteHotel = this.handleDeleteHotel.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    componentWillMount() {
        this.getHotels() // Get hotels data to display
    }

    getHotels() {
        axios.get(URL_FOR_HOTELS + '/all/' + this.userID)
        .then((res) => this.setState({ hotels: res.data }))
    }

    renderHotels() {
        const { title } = this.state
        let hotels = this.state.hotels.map((hotel) => {
            if (hotel.title.includes(title) || !title) return (
                <tr key={hotel._id}>
                    <td>{hotel.title}</td>
                    <td><Link to={'/dashboard/hotel-images/' + hotel._id}>Images</Link></td>
                    <td><span onClick={() => this.handleDeleteHotel(hotel._id)} className='remove glyphicon glyphicon-trash'></span></td>
                    <td><Link to={'/dashboard/edit-hotel/' + hotel._id} className='edit glyphicon glyphicon-edit'></Link></td>
                </tr>
            )
        })
        return hotels
    }

    handleChange(name) {
        return(e) => {
            const value = e.target.innerText || e.target.value 
            this.setState({[name]: value})
        }
    }

    handleDeleteHotel(id) {
        const confirm = window.confirm("Delete hotel?")
        if (confirm) axios.delete(URL_FOR_HOTELS + '/one/' + id)
        .then((res) => this.getHotels())
    }

    render(){
        return (
        <div className="row">
            <div className="col-xs-7">
                <h3>Hotels <Link to={'/dashboard/new-hotel'} className='new-link'><i className='glyphicon glyphicon-plus'></i> New Hotel</Link></h3>
                <br/>
                <table className="table table-hover">
                    <tbody>
                        {this.renderHotels()}
                    </tbody>
                </table>
            </div>     

            <div className="col-md-offset-1 col-md-3">
                <MuiThemeProvider>
                <TextField fullWidth={true} floatingLabelText={'Filter by Title'} value={this.state.title} onChange={this.handleChange("title")} />
                </MuiThemeProvider>
            </div>      
        </div>
        );
    }
}
