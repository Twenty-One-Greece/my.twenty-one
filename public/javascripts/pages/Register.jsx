import React from "react"
import axios from "axios"
import { URL_FOR_USERS } from '../config.js'
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class Register extends React.Component {

    constructor(props) {
        super(props)
        this.state = { name: '', company: '', username: '', email: '', country: '', city: '', telephone: '', password: '' }

        this.handleChange = this.handleChange.bind(this)
        this.handleSumbit = this.handleSumbit.bind(this)
        this.handleResponse = this.handleResponse.bind(this)
    }

    handleChange(name) {
        return(e) => this.setState({[name]: e.target.value})
    }

    handleSumbit(e) {
        e.preventDefault()
        axios.post(URL_FOR_USERS + "/register", this.state)

        .then((res) => this.handleResponse(res.data))
    }

    handleResponse(data) {
        if (!data.errors) {
            confirm(data.message)
            location.href = '/#/'
        }
        else return alert(data.message)
    }

    render() {
        return (
        <div className="row register">
            <div className="col-xs-offset-3 col-xs-6">

            <form onSubmit={this.handleSumbit}>
            <h1 className="center">Register</h1>

            <MuiThemeProvider>
            <TextField fullWidth={true} floatingLabelText={'Name'} value={this.state.name} onChange={this.handleChange("name")} required={true}/>
            </MuiThemeProvider>

            <MuiThemeProvider>
            <TextField fullWidth={true} floatingLabelText={'Company Name'} value={this.state.company} onChange={this.handleChange("company")} required={true}/>
            </MuiThemeProvider>

            <MuiThemeProvider>
            <TextField fullWidth={true} floatingLabelText={'Userame'} value={this.state.username} onChange={this.handleChange("username")} required={true}/>
            </MuiThemeProvider>

            <MuiThemeProvider>
            <TextField fullWidth={true} floatingLabelText={'Email'} value={this.state.email} onChange={this.handleChange("email")} required={true}/>
            </MuiThemeProvider>

            <MuiThemeProvider>
            <TextField fullWidth={true} floatingLabelText={'Country'} value={this.state.country} onChange={this.handleChange("country")} required={true}/>
            </MuiThemeProvider>

            <MuiThemeProvider>
            <TextField fullWidth={true} floatingLabelText={'City'} value={this.state.city} onChange={this.handleChange("city")} required={true}/>
            </MuiThemeProvider>

            <MuiThemeProvider>
            <TextField fullWidth={true} floatingLabelText={'Telephone'} value={this.state.telephone} onChange={this.handleChange("telephone")} required={true}/>
            </MuiThemeProvider>


            <MuiThemeProvider>
            <TextField fullWidth={true} floatingLabelText={'Password'} value={this.state.password} onChange={this.handleChange("password")} required={true}/>
            </MuiThemeProvider>

            <br/><br/>
            <div className="div-center">
            <MuiThemeProvider>
            <RaisedButton className="button" type="submit" label="Create Account" primary={true}/>
            </MuiThemeProvider>

            <br/><br/>
            <Link to="/"> Login </Link>
            </div>
            
            </form>

            </div>
            
        </div>
        );
    }
}
