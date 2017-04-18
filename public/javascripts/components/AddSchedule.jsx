import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


export default class AddSchedule extends React.Component {

    constructor(props) {
        super(props)
        this.state = { title: '', description: '' }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(name) {
        return(e) => this.setState({[name]: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.handleSubmitSchedule(this.state)
        this.setState({title: '', description: ''})
        $('#Schedule').modal('hide')
    }

    render() {
        return(
        <div className="modal fade" id="Schedule" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" style={{zIndex: 1500}}>
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <form onSubmit={this.handleSubmit}>

            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Schedule</h4>
            </div>

            <div className="modal-body">

                <MuiThemeProvider>
                <TextField fullWidth={true} floatingLabelText={'Title'} value={this.state.title} onChange={this.handleChange("title")} required={true}/>
                </MuiThemeProvider>
                <br />

                <MuiThemeProvider>
                <TextField fullWidth={true} multiLine={true} rows={5} floatingLabelText={'Description'} value={this.state.description} onChange={this.handleChange("description")} required={true}/>
                </MuiThemeProvider>

            </div>

            <div className="modal-footer">
                <MuiThemeProvider>
                <RaisedButton className="button" label="Close" data-dismiss="modal"/>
                </MuiThemeProvider>
                
                <MuiThemeProvider>
                <RaisedButton className="button" label="Add" primary={true} type="submit"/>
                </MuiThemeProvider>

            </div>

            </form>
            </div>
        </div>
        </div>
        )
    }
}