import React from 'react';
import axios from 'axios'
import { URL_FOR_SERVICES } from '../config.js'
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class AllServices extends React.Component {

    constructor (props) {
        super(props)
        this.state = { services: [], product: "", title: "", category: []}

        this.userID = localStorage.getItem('_id')
        this.getServices = this.getServices.bind(this)
        this.renderServices = this.renderServices.bind(this)
        this.handleDeleteService = this.handleDeleteService.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleMultipleSelectChange = this.handleMultipleSelectChange.bind(this)
        this.clearFilters = this.clearFilters.bind(this)
    }
    
    componentWillMount() {
        this.getServices() // Get services data to display
    }

    getServices() {
        axios.get(URL_FOR_SERVICES + '/all/' + this.userID)
        .then((res) => this.setState({ services: res.data }))
    }

    renderServices() {
        const { product, title, category } = this.state
        let services = this.state.services.map((service) => {
            if ((product === service.product || !product) &&
                (service.title.toLowerCase().includes(title) || !title) &&
                (service.category.indexOf(category) > -1 || !category.length)) return (

                <tr key={service._id}>
                    <td>{service.title}</td>
                    <td>{service.product}</td>
                    <td>{service.from}</td>
                    <td><Link to={'/dashboard/service-images/' + service._id}>Images</Link></td>
                    <td><span onClick={() => this.handleDeleteService(service._id)} className='remove glyphicon glyphicon-trash'></span></td>
                    <td><Link to={'/dashboard/edit-service/' + service._id} className='edit glyphicon glyphicon-edit'></Link></td>
                </tr>
            )
        })
        return services
    }

    handleChange(name) {
        return(e) => {
            const value = e.target.innerText || e.target.value 
            this.setState({[name]: value})
        }
    }

    handleMultipleSelectChange(name, values) {
        this.setState({[name]: values})
    }

    handleDeleteService(id) {
        const confirm = window.confirm("Delete Service?")
        if (confirm) axios.delete(URL_FOR_SERVICES + '/one/' + id)
        .then((res) => this.getServices())
    }
    
    clearFilters() {
        this.setState({product: "", title: "", category: []})
    }

    render(){
        return (
        <div className="row">
            <div className="col-md-7">
                <h3>Services <Link to={'/dashboard/new-service'} className='new-link'><i className='glyphicon glyphicon-plus'></i> New Service</Link></h3>
                <br/>
                <table className="table table-hover">
                    <tbody>
                        {this.renderServices()}
                    </tbody>
                </table>
            </div>    

            <div className="col-md-offset-1 col-md-3">
                <MuiThemeProvider>
                <TextField fullWidth={true} floatingLabelText={'Filter by Title'} value={this.state.title} onChange={this.handleChange("title")} />
                </MuiThemeProvider>

                <MuiThemeProvider>
                <SelectField className="select" fullWidth={true} floatingLabelText="Filter by Product" value={this.state.product} onChange={this.handleChange("product")}>
                    <MenuItem value={'Excursion'} primaryText="Excursion" />
                    <MenuItem value={'Package'} primaryText="Package" />
                    <MenuItem value={'Transfer'} primaryText="Transfer" />
                    <MenuItem value={'Accommodation'} primaryText="Accommodation" />
                </SelectField>
                </MuiThemeProvider>

                <MuiThemeProvider>
                <SelectField className="select" multiple={false} fullWidth={true} floatingLabelText="Category" value={this.state.category} onChange={(event, index, values) => this.handleMultipleSelectChange('category', values)} >
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

                <br/><br/>
                <MuiThemeProvider>
                <RaisedButton onClick={this.clearFilters} label="Clear Filters" fullWidth={true}/>
                </MuiThemeProvider>
            </div>
        </div>
        );
    }
}
