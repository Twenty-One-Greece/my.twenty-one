import React from 'react';
import axios from 'axios'
import { URL, URL_FOR_DESTINATIONS } from '../config.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dropzone from 'react-dropzone';
import {GridList} from 'material-ui/GridList';
import {Image} from '../components/Image.jsx'

export default class ImagesDestination extends React.Component {
    constructor(props) {
        super(props)
        this.state = { title: '', images: [], featuredImage: '', image: null }

        this.destinationID = this.props.routeParams.destinationID
        this.handleDropImage = this.handleDropImage.bind(this)
        this.handleResponse = this.handleResponse.bind(this)
        this.getDestinationInfo =this.getDestinationInfo.bind(this)
        this.renderImages = this.renderImages.bind(this)
        this.handleRemoveImage = this.handleRemoveImage.bind(this)
        this.handleSetFeaturedImage = this.handleSetFeaturedImage.bind(this)
    }

    componentWillMount() {
        this.getDestinationInfo()
    }

    getDestinationInfo() {
        axios.get(URL_FOR_DESTINATIONS + '/one/' + this.destinationID)
        .then((res) => this.setState({ title: res.data.title, featuredImage:res.data.featuredImage, images: res.data.images }))
    }

    renderImages() {
        let images = this.state.images.map((image, i) => {
            return <Image key={i} i={i} type={'destinations'} image={image} handleRemoveImage={this.handleRemoveImage}
            handleSetFeaturedImage={this.handleSetFeaturedImage} featuredImage={this.state.featuredImage} />
        })
        return images
    }

    handleRemoveImage(fileName) {
        axios.delete(URL_FOR_DESTINATIONS + '/one-image/' + this.destinationID + '/' + fileName)
        .then((res) => this.getDestinationInfo())
    }
    
    handleSetFeaturedImage(i) {
        const data = { featuredImage: String(i) }
        axios.post(URL_FOR_DESTINATIONS + '/update-featured-image/' + this.destinationID, data)
        .then((res) => this.getDestinationInfo())
    }

    handleDropImage(files) {
        const file = new FormData();
        file.append('image',files[0]);

        axios.post(URL_FOR_DESTINATIONS + '/new-image/' + this.destinationID, file)
        .then((res) => this.handleResponse(res.data))
    }

    handleResponse(data) {
        if (data.err) alert(data.message)
        this.getDestinationInfo()
    }

    render(){
        return (
        <div className='row'>
            <div className="col-xs-5">
            <h1>Destination Images</h1>
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
