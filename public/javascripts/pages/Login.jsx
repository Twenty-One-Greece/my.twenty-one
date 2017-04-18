import React from "react"
import axios from "axios"
import { URL_FOR_USERS } from '../config.js'
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = { username: '', password: ''}

        this.handleChange = this.handleChange.bind(this)
        this.handleSumbit = this.handleSumbit.bind(this)
    }

    handleChange(name) {
        return(e) => this.setState({[name]: e.target.value})
    }

    handleSumbit(e) {
        e.preventDefault()
        axios.post(URL_FOR_USERS + '/login', this.state)
        .then((res) => this.handleResponse(res.data))
    }

    handleResponse(data) {
        if (!data.err) {
            const {_id, username, email } = data
            localStorage.setItem("_id", _id);
            localStorage.setItem("username", username);
            localStorage.setItem("email", email);
            location.href = '#/dashboard'
        }

        else alert(data.message)
    }

    render() {
        console.log(URL_FOR_USERS)
        return (
        <div className="row login-area">
            <div className="col-xs-6 black">

                <form className="login" onSubmit={this.handleSumbit}>
                <h1 className="center white">Login Area</h1>

                <div className="col-xs-6 col-xs-offset-3">
                <MuiThemeProvider>
                <TextField fullWidth={true} floatingLabelText={'Username'} value={this.state.username} onChange={this.handleChange("username")} required={true}/>
                </MuiThemeProvider>
                <br />

                <MuiThemeProvider>
                <TextField fullWidth={true} floatingLabelText={'Password'} type={'password'} value={this.state.password} onChange={this.handleChange("password")} required={true}/>
                </MuiThemeProvider>
                </div>

                <div className="div-center">
                <MuiThemeProvider>
                <RaisedButton className="button" type="submit" label="Submit" primary={true}/>
                </MuiThemeProvider>

                {/*<Link to="/register"> Register </Link>*/}
                </div>
                </form>
            </div>
            
            <div className="col-xs-6 black login-image">
                <img className='logo' src="http://twenty-one.co/wp-content/uploads/2017/01/tolg2.png" alt=""/>
            </div>
        </div>
        );
    }
}
