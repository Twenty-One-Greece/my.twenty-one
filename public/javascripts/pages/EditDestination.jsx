import React from 'react';
import axios from 'axios'
import { URL_FOR_DESTINATIONS } from '../config.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

export default class EditDestination extends React.Component {

    constructor(props) {
        super(props)
        this.state = { title: '', description: '', thingsToDo: '', include: false, featured: false, images: [], userID: localStorage.getItem('_id') }

        this.destinationID = this.props.params.destinationID
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleResponse = this.handleResponse.bind(this)
    }

    componentWillMount() {
        axios.get(URL_FOR_DESTINATIONS + '/one/' + this.destinationID)
        .then((res) => this.setState(res.data))
    }

    handleChange(name) {
        if (name === 'include') return(e) => this.setState({[name]: !this.state.include})
        if (name === 'featured') return(e) => this.setState({[name]: !this.state.featured})
        return(e) => this.setState({[name]: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault()
        axios.post(URL_FOR_DESTINATIONS + '/update/' + this.destinationID, this.state)
        .then((res) => this.handleResponse(res.data))
    }

    handleResponse(data) {
        if (data.errors) alert(data.message)
        if (!data.errors) location.href = '#/dashboard/destinations'
    }

    render(){
        return (
        <div className='row'>
            <form onSubmit={this.handleSubmit}>
            <div className="col-md-6">
            <h3>New Destination</h3>

                <MuiThemeProvider>
                <TextField fullWidth={true} floatingLabelText={'Title'} value={this.state.title} onChange={this.handleChange("title")} required={true}/>
                </MuiThemeProvider>
                <br/>

                <MuiThemeProvider>
                <TextField fullWidth={true} floatingLabelText={'Description'} multiLine={true} rows={5} value={this.state.description} onChange={this.handleChange("description")}/>
                </MuiThemeProvider>
                <br/>

                <MuiThemeProvider>
                <TextField fullWidth={true} floatingLabelText={'Things to do'} multiLine={true} rows={5} value={this.state.thingsToDo} onChange={this.handleChange("thingsToDo")}/>
                </MuiThemeProvider>
            
                <br/><br/>
                <MuiThemeProvider>
                <RaisedButton type="submit" className="button yellow-btn" label="Submit" primary={true}/>
                </MuiThemeProvider>
            </div>

            <div className="col-md-offset-1 col-md-5">
                <br/><br/><br/>
                <MuiThemeProvider>
                <Checkbox label={'Check if you want to include this destination in website'} checked={this.state.include} onCheck={this.handleChange("include")}/>
                </MuiThemeProvider>

                <MuiThemeProvider>
                <Checkbox label={'Check if this is a featured destination'} checked={this.state.featured} onCheck={this.handleChange("featured")}/>
                </MuiThemeProvider>
            </div>
            </form>
        </div>
        );
    }
}
