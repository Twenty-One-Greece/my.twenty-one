import React from 'react';
import axios from 'axios'
import { URL_FOR_SERVICES, URL_FOR_DESTINATIONS } from '../config.js'
import AddSchedule from '../components/AddSchedule.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import DatePicker from 'material-ui/DatePicker';
import AutoComplete from 'material-ui/AutoComplete';


export default class EditService extends React.Component {

    constructor(props) {
        super(props)
        this.state = { title: '', description: '',  type: '', product: '', category: [], price: '',
            offer: false, featured: false, schedule: [], measurementUnit: '', duration: '',
            includes: '', notIncludes: '', periods: {}, tourLanguage: [], departureDays: [],
            from: '', to: '', startDate: null, endDate: null, langitude: '', longitude: '',
            destinations: [], destination: '', destinationOtagID: '', providerName: '', dataSource: [],
            userID: localStorage.getItem('_id') }

        this.test = []
        this.serviceID = this.props.params.serviceID        
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleResponse = this.handleResponse.bind(this)
        this.handleSubmitSchedule = this.handleSubmitSchedule.bind(this)
        this.renderSchedule = this.renderSchedule.bind(this)
        this.handleRemoveSchedule = this.handleRemoveSchedule.bind(this)
        this.renderDestinations = this.renderDestinations.bind(this)
        this.getServiceInfo = this.getServiceInfo.bind(this)
        this.handleMultipleSelectChange = this.handleMultipleSelectChange.bind(this)
        this.handleUpdateInput = this.handleUpdateInput.bind(this)
        this.selectMatch = this.selectMatch.bind(this)
    }

    componentWillMount() {
        axios.get(URL_FOR_DESTINATIONS + '/all-names/' + this.state.userID)
        .then((res) => {
            this.setState({destinations: res.data})
            this.getServiceInfo()
        })
    }

    getServiceInfo() {
        axios.get(URL_FOR_SERVICES + '/one/' + this.serviceID)
        .then((res) => {
            res.data.startDate = new Date(res.data.startDate)
            res.data.endDate = new Date(res.data.endDate)
            this.setState(res.data)
            this.test = this.state.schedule
        })
    }

    handleChange(name, date) {
        // For checkbox (toggles offer true of false)
        if (name === 'offer') return(e) => this.setState({[name]: !this.state.offer})
        if (name === 'featured') return(e) => this.setState({[name]: !this.state.featured})

        if (name === 'startDate' || name === 'endDate') return this.setState({[name]: date})

        return(e) => {
            // Select comp has e.target.innerText, all others have value
            const value = e.target.innerText || e.target.value 
            this.setState({[name]: value})
        }
    }

    handleMultipleSelectChange(name, values) {
        this.setState({[name]: values})
    }

    handleSubmitSchedule(schedule) {
        this.test.push(schedule)
        this.setState({schedule: this.test})
    }

    renderSchedule() {
        const schedule = this.state.schedule.map((sch, i) => {
            return <ListItem key={i} primaryText={sch.title} secondaryText={sch.description}
                secondaryTextLines={2} rightIcon={
                <span className='remove glyphicon glyphicon-trash' onClick={() => this.handleRemoveSchedule(i)}></span>
                }/>
        })
        return schedule
    }

    renderDestinations() {
        const destinations = this.state.destinations.map((destination) => {
            return <MenuItem key={destination._id} value={destination.title} primaryText={destination.title} />
        })
        return destinations
    }

    handleRemoveSchedule(index) {
        const newSchedule = this.state.schedule
        newSchedule.splice(index, 1)
        this.setState({schedule: newSchedule})
    }

    handleSubmit(e) {
        e.preventDefault()
        axios.post(URL_FOR_SERVICES + '/update/' + this.serviceID, this.state)
        .then((res) => this.handleResponse(res.data))
    }

    handleResponse(data) {
        if (data.errors) alert(data.message)
        if (!data.errors) location.href = '#/dashboard/services'
    }
    
    handleUpdateInput(value, result) {
        axios.get("http://s2.onetourismo.com:8087/production/filos_activities.php?s=" + value)
        .then((res) => {  this.setState({dataSource: res.data}) })
        
        if(result.length) this.setState({
            destination: result[0].otagDestinationCode,
            destinationOtagID: result[0].otagID,
            providerName: result[0].name     
        })
    }
    
    selectMatch(e) {
        this.setState({
            providerName: e.name, 
            destination: e.otagDestinationCode,
            destinationOtagID: e.otagID
        })
    }


    render() {
        if (!this.state.providerName) this.state.providerName = "Match with provider"
        
        return (
        <div>
        <form onSubmit={this.handleSubmit}>
        <div className='row'>
            <div className="col-md-7">
            
            <h3>Edit Service</h3>
            <p>OtagID: {this.state.destinationOtagID} / DestinationID: {this.state.destination}</p>
                <MuiThemeProvider>
                <TextField fullWidth={true} floatingLabelText={'Title'} value={this.state.title} onChange={this.handleChange("title")} required={true}/>
                </MuiThemeProvider>

                <MuiThemeProvider>
                <TextField fullWidth={true} floatingLabelText={'Price'} type={'number'} value={this.state.price} onChange={this.handleChange("price")}  />
                </MuiThemeProvider>
                
                <MuiThemeProvider>
                <AutoComplete fullWidth={true} onNewRequest={(e) => this.selectMatch(e)} filter={AutoComplete.fuzzyFilter} dataSourceConfig={{text: 'name', value: 'otagDestinationCode',}} floatingLabelText={this.state.providerName} dataSource={this.state.dataSource} onUpdateInput={this.handleUpdateInput}  />
                </MuiThemeProvider>

                <div className="no-padding-left col-md-6">
                <MuiThemeProvider>
                <TextField fullWidth={true} floatingLabelText={'Langitude'} type={'number'} value={this.state.langitude} onChange={this.handleChange("langitude")} />
                </MuiThemeProvider>
                <br/><br/>

                <MuiThemeProvider>
                <DatePicker hintText="Start Date" fullWidth={true} autoOk={true} value={this.state.startDate} onChange={(e, date) => this.handleChange('startDate', date)}/>
                </MuiThemeProvider>
                </div>

                <div className="no-padding-right col-md-6">
                <MuiThemeProvider>
                <TextField floatingLabelText={'Longitude'} fullWidth={true} type={'number'} value={this.state.longitude} onChange={this.handleChange("longitude")} />
                </MuiThemeProvider>
                <br/><br/>

                <MuiThemeProvider>
                <DatePicker hintText="End Date" fullWidth={true} autoOk={true} value={this.state.endDate} onChange={(e, date) => this.handleChange("endDate", date)}/>
                </MuiThemeProvider>
                </div>

                <MuiThemeProvider>
                <TextField fullWidth={true} multiLine={true} rows={2} floatingLabelText={'Includes'} value={this.state.includes} onChange={this.handleChange("includes")} />
                </MuiThemeProvider>

                <MuiThemeProvider>
                <TextField fullWidth={true} multiLine={true} rows={2} floatingLabelText={'Not Includes'} value={this.state.notIncludes} onChange={this.handleChange("notIncludes")} />
                </MuiThemeProvider>

                <MuiThemeProvider>
                <TextField fullWidth={true} multiLine={true} rows={8} floatingLabelText={'Desctiption'} value={this.state.description} onChange={this.handleChange("description")} />
                </MuiThemeProvider>

            </div>

            <div className="col-md-offset-1 col-md-4">

                <br/><br/><br/>
                <MuiThemeProvider>
                <SelectField className="select" multiple={true} fullWidth={true} floatingLabelText="Tour Language" value={this.state.tourLanguage} onChange={(event, index, values) => this.handleMultipleSelectChange('tourLanguage', values)} >
                    <MenuItem checked={this.state.tourLanguage && this.state.tourLanguage.includes('English')} value={'English'} primaryText="English" />
                    <MenuItem checked={this.state.tourLanguage && this.state.tourLanguage.includes('Greek')} value={'Greek'} primaryText="Greek" />
                    <MenuItem checked={this.state.tourLanguage && this.state.tourLanguage.includes('Spanish')} value={'Spanish'} primaryText="Spanish" />
                    <MenuItem checked={this.state.tourLanguage && this.state.tourLanguage.includes('German')} value={'German'} primaryText="German" />
                    <MenuItem checked={this.state.tourLanguage && this.state.tourLanguage.includes('Russian')} value={'Russian'} primaryText="Russian" />
                    <MenuItem checked={this.state.tourLanguage && this.state.tourLanguage.includes('Ukrane')} value={'Ukrane'} primaryText="Ukrane" />
                    <MenuItem checked={this.state.tourLanguage && this.state.tourLanguage.includes('Dutch')} value={'Dutch'} primaryText="Dutch" />
                    <MenuItem checked={this.state.tourLanguage && this.state.tourLanguage.includes('Czech')} value={'Czech'} primaryText="Czech" />
                    <MenuItem checked={this.state.tourLanguage && this.state.tourLanguage.includes('Romanian')} value={'Romanian'} primaryText="Romanian" />
                </SelectField>
                </MuiThemeProvider>

                <MuiThemeProvider>
                <SelectField className="select" multiple={true} fullWidth={true} floatingLabelText="Departure Days" value={this.state.departureDays} onChange={(event, index, values) => this.handleMultipleSelectChange('departureDays', values)} >
                    <MenuItem checked={this.state.departureDays && this.state.departureDays.includes('Monday')} value={'Monday'} primaryText="Monday" />
                    <MenuItem checked={this.state.departureDays && this.state.departureDays.includes('Tuesday')} value={'Tuesday'} primaryText="Tuesday" />
                    <MenuItem checked={this.state.departureDays && this.state.departureDays.includes('Wednesday')} value={'Wednesday'} primaryText="Wednesday" />
                    <MenuItem checked={this.state.departureDays && this.state.departureDays.includes('Thursday')} value={'Thursday'} primaryText="Thursday" />
                    <MenuItem checked={this.state.departureDays && this.state.departureDays.includes('Friday')} value={'Friday'} primaryText="Friday" />
                    <MenuItem checked={this.state.departureDays && this.state.departureDays.includes('Saturday')} value={'Saturday'} primaryText="Saturday" />
                    <MenuItem checked={this.state.departureDays && this.state.departureDays.includes('Sunday')} value={'Sunday'} primaryText="Sunday" />
                </SelectField>
                </MuiThemeProvider>

                <MuiThemeProvider>
                <SelectField className="select" fullWidth={true} floatingLabelText="From (Destination)" value={this.state.from} onChange={this.handleChange("from")}>
                    {this.renderDestinations()}
                </SelectField>
                </MuiThemeProvider>

                <MuiThemeProvider>
                <SelectField className="select" fullWidth={true} floatingLabelText="To (Destination)" value={this.state.to} onChange={this.handleChange("to")}>
                    {this.renderDestinations()}
                </SelectField>
                </MuiThemeProvider>

                <MuiThemeProvider>
                <SelectField className="select" fullWidth={true} floatingLabelText="Type" value={this.state.type} onChange={this.handleChange("type")}>
                    <MenuItem value={'Organised'} primaryText="Organised" />
                    <MenuItem value={'Private'} primaryText="Private" />
                </SelectField>
                </MuiThemeProvider>
                
                <MuiThemeProvider>
                <SelectField className="select" fullWidth={true} floatingLabelText="Product" value={this.state.product} onChange={this.handleChange("product")} >
                    <MenuItem value={'Excursion'} primaryText="Excursion" />
                    <MenuItem value={'Package'} primaryText="Package" />
                    <MenuItem value={'Transfer'} primaryText="Transfer" />
                    <MenuItem value={'Accommodation'} primaryText="Accommodation" />
                </SelectField>
                </MuiThemeProvider>
                
                <MuiThemeProvider>
                <SelectField className="select" multiple={true} fullWidth={true} floatingLabelText="Category" value={this.state.category} onChange={(event, index, values) => this.handleMultipleSelectChange('category', values)} >
                    <MenuItem checked={this.state.category && this.state.category.includes('Cruise')} value={'Cruise'} primaryText="Cruise" />
                    <MenuItem checked={this.state.category && this.state.category.includes('Sailing')} value={'Sailing'} primaryText="Sailing" />
                    <MenuItem checked={this.state.category && this.state.category.includes('Couples')} value={'Couples'} primaryText="Couples" />
                    <MenuItem checked={this.state.category && this.state.category.includes('Family')} value={'Family'} primaryText="Family" />
                    <MenuItem checked={this.state.category && this.state.category.includes('Classical')} value={'Classical'} primaryText="Classical" />
                    <MenuItem checked={this.state.category && this.state.category.includes('City Break')} value={'City Break'} primaryText="City Break" />
                    <MenuItem checked={this.state.category && this.state.category.includes('Country Discovery')} value={'Country Discovery'} primaryText="Country Discovery" />
                    <MenuItem checked={this.state.category && this.state.category.includes('Gastronomy and Wine')} value={'Gastronomy and Wine'} primaryText="Gastronomy and Wine" />
                    <MenuItem checked={this.state.category && this.state.category.includes('Spa')} value={'Spa'} primaryText="Spa" />
                    <MenuItem checked={this.state.category && this.state.category.includes('Religious')} value={'Religious'} primaryText="Religious" />
                    <MenuItem checked={this.state.category && this.state.category.includes('Outdoor Activities')} value={'Outdoor Activities'} primaryText="Outdoor Activities" />
                </SelectField>
                </MuiThemeProvider>

                <MuiThemeProvider>
                <SelectField className="select" fullWidth={true} floatingLabelText="Measurement Unit" value={this.state.measurementUnit} onChange={this.handleChange("measurementUnit")}>
                    <MenuItem value={'Person'} primaryText="Person" />
                    <MenuItem value={'Unit'} primaryText="Unit" />
                </SelectField>
                </MuiThemeProvider>

                <MuiThemeProvider>
                <SelectField className="select" fullWidth={true} floatingLabelText="Duration" value={this.state.duration} onChange={this.handleChange("duration")}>
                    <MenuItem value={'Half Day'} primaryText="Half Day" />
                    <MenuItem value={'Full Day'} primaryText="Full Day" />
                    <MenuItem value={'1 day / 0 nights'} primaryText='1 day / 0 nights' />
                    <MenuItem value={'2 day / 1 nights'} primaryText='2 day / 1 nights' />
                    <MenuItem value={'3 day / 2 nights'} primaryText="3 day / 2 nights" />
                    <MenuItem value={'4 day / 3 nights'} primaryText="4 day / 3 nights" />
                    <MenuItem value={'5 day / 4 nights'} primaryText="5 day / 4 nights" />
                    <MenuItem value={'6 day / 5 nights'} primaryText="6 day / 5 nights" />
                    <MenuItem value={'7 day / 6 nights'} primaryText="7 day / 6 nights" />
                    <MenuItem value={'8 day / 7 nights'} primaryText="8 day / 7 nights" />
                    <MenuItem value={'9 day / 8 nights'} primaryText="9 day / 8 nights" />
                    <MenuItem value={'10 day / 9 nights'} primaryText="10 day / 9 nights" />
                    <MenuItem value={'11 day / 10 nights'} primaryText="11 day / 10 nights" />
                    <MenuItem value={'12 day / 11 nights'} primaryText="12 day / 11 nights" />
                    <MenuItem value={'13 day / 12 nights'} primaryText="13 day / 12 nights" />
                    <MenuItem value={'14 day / 13 nights'} primaryText="14 day / 13 nights" />
                </SelectField>
                </MuiThemeProvider>

                <br /><br /><br />

                <MuiThemeProvider>
                <Checkbox label={'Check if this is an offer'} checked={this.state.offer} onCheck={this.handleChange("offer")}/>
                </MuiThemeProvider>
                
                <MuiThemeProvider>
                <Checkbox label={'Check if this is a featured service'} checked={this.state.featured} onCheck={this.handleChange("featured")}/>
                </MuiThemeProvider>
            </div>

            <div className="clearfx"></div>
        </div>

        <div className="row">
            <div className="col-md-7">
                <MuiThemeProvider>
                <RaisedButton className="button yellow-btn" type="submit" label="Submit" primary={true}/>
                </MuiThemeProvider>
            </div>

            <div className="col-md-offset-1 col-md-4 last-div">
                <MuiThemeProvider>
                <List>
                    <h3>Schedule</h3>
                    <p>You can add schedule by pressing the Add Schedule button.</p>
                    {this.renderSchedule()}
                </List>
                </MuiThemeProvider>

                <MuiThemeProvider>
                <RaisedButton className="button yellow-btn" secondary={true} data-toggle="modal" data-target="#Schedule" label="Add Schedule" />
                </MuiThemeProvider>
            </div>
        </div>
        </form>

         {/*Modal*/}
        <AddSchedule handleSubmitSchedule={this.handleSubmitSchedule}/>
        </div>
        );
    }
}
