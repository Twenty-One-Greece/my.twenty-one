import React from 'react';
import axios from 'axios'
import { URL_FOR_SERVICES } from '../config.js'
import {Image} from '../components/Image.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dropzone from 'react-dropzone';
import IconButton from 'material-ui/IconButton';
import {GridList} from 'material-ui/GridList';


export default class ImagesService extends React.Component {

    constructor(props) {
        super(props)
        this.state = { title: '', images: [], image: null }

        this.serviceID = this.props.routeParams.serviceID
        this.handleDropImage = this.handleDropImage.bind(this)
        this.handleResponse = this.handleResponse.bind(this)
        this.getDestinationInfo =this.getDestinationInfo.bind(this)
        this.renderImages = this.renderImages.bind(this)
        this.handleRemoveImage = this.handleRemoveImage.bind(this)
    }

    componentWillMount () {
        this.getDestinationInfo()
    }

    getDestinationInfo () {
        axios.get(URL_FOR_SERVICES + '/one/' + this.serviceID)
        .then((res) => this.setState({ title: res.data.title, images: res.data.images }))
    }

    renderImages () {
        let images = this.state.images.map((image, i) => {
            return <Image key={i} image={image} i={i} type={'services'} handleRemoveImage={this.handleRemoveImage} />
        })
        return images
    }

    handleRemoveImage (fileName) {
        axios.delete(URL_FOR_SERVICES + '/one-image/' + this.serviceID + '/' + fileName)
        .then((res) => this.getDestinationInfo())
    }

    handleDropImage (files) {
        const file = new FormData();
        file.append('image', files[0]);

        axios.post (URL_FOR_SERVICES + '/new-image/' + this.serviceID, file)
        .then((res) => this.handleResponse(res.data))
    }

    handleResponse (data) {
        if (data.err) alert(data.message)
        this.getDestinationInfo()
    }

    render(){
        return (
        <div className='row'>
            <div className="col-xs-5">
            <h1>Service Images</h1>
            <h3>for {this.state.title}</h3>

            <Dropzone className={'dropzone'} multiple={false} onDrop={this.handleDropImage} >
                <div>
                  <h2>Image Upload </h2>
                  Drop a photo here, or click to select file to upload.
                </div>
                <br/><br/>
                <span className="plus glyphicon glyphicon-plus" aria-hidden="true"></span>
              </Dropzone>
            </div>

            <div className="col-xs-5 col-xs-offset-2 images">
                <MuiThemeProvider>
                <GridList cellHeight={180}>
                    {this.renderImages()}
                </GridList>
                </MuiThemeProvider>
            </div>
        </div>
        );
    }
}
