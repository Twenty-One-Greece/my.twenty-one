import React from 'react';
import axios from 'axios'
import { URL_FOR_HOTELS } from '../config.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

export default class EditHotel extends React.Component {

    constructor(props) {
        super(props)
        this.state = { title: '', description: '', featured: false, images: [], userID: localStorage.getItem('_id') }

        this.hotelID = this.props.params.hotelID
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleResponse = this.handleResponse.bind(this)
    }

    componentWillMount() {
        axios.get(URL_FOR_HOTELS + '/one/' + this.hotelID)
        .then((res) => this.setState(res.data))
    }

    handleChange(name) {
        if (name === 'featured') return(e) => this.setState({[name]: !this.state.featured})
        return(e) => this.setState({[name]: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault()
        axios.post(URL_FOR_HOTELS + '/update/' + this.hotelID, this.state)
        .then((res) => this.handleResponse(res.data))
    }

    handleResponse(data) {
        if (data.errors) alert(data.message)
        if (!data.errors) location.href = '#/dashboard/hotels'
    }

    render(){
        return (
        <div className='row'>
            <div className="col-xs-7">
            <h3>New Hotel</h3>
            <form onSubmit={this.handleSubmit}>
                <MuiThemeProvider>
                <TextField fullWidth={true} floatingLabelText={'Title'} value={this.state.title} onChange={this.handleChange("title")} />
                </MuiThemeProvider>
                <br/>

                <MuiThemeProvider>
                <TextField fullWidth={true} floatingLabelText={'Description'} multiLine={true} rows={5} value={this.state.description} onChange={this.handleChange("description")} />
                </MuiThemeProvider>
                <br/>

                <MuiThemeProvider>
                <Checkbox label={'Check if this is a featured hotel'} checked={this.state.featured} onCheck={this.handleChange("featured")}/>
                </MuiThemeProvider>

                <br/><br/>
                <MuiThemeProvider>
                <RaisedButton label="Submit" type="submit" className="button yellow-btn" primary={true}/>
                </MuiThemeProvider>
            </form>
            </div>
        </div>
        );
    }
}
