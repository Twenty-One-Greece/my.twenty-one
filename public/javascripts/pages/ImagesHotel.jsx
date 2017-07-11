import React from 'react';
import axios from 'axios'
import { URL, URL_FOR_HOTELS } from '../config.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dropzone from 'react-dropzone';
import { GridList } from 'material-ui/GridList';
import { Image } from '../components/Image.jsx'

export default class ImagesHotel extends React.Component {
    constructor(props) {
        super(props)
        this.state = { title: '', images: [], featuredImage: '', image: null }

        this.hotelID = this.props.routeParams.hotelID
        this.handleDropImage = this.handleDropImage.bind(this)
        this.handleResponse = this.handleResponse.bind(this)
        this.getHotelInfo = this.getHotelInfo.bind(this)
        this.renderImages = this.renderImages.bind(this)
        this.handleRemoveImage = this.handleRemoveImage.bind(this)
        this.handleSetFeaturedImage = this.handleSetFeaturedImage.bind(this)
    }

    componentWillMount() {
        this.getHotelInfo()
    }

    getHotelInfo() {
        axios.get(URL_FOR_HOTELS + '/one/' + this.hotelID)
            .then((res) => this.setState({ title: res.data.title, images: res.data.images, featuredImage: res.data.featuredImage }))
    }

    renderImages() {
        let images = this.state.images.map((image, i) => {
            return <Image key={i} i={i}
                type={'hotels'}
                image={image}
                featuredImage={this.state.featuredImage}
                handleRemoveImage={this.handleRemoveImage}
                handleSetFeaturedImage={this.handleSetFeaturedImage} />
        })
        return images
    }

    handleSetFeaturedImage(i) {
        const data = { featuredImage: String(i) }
        axios.post(URL_FOR_HOTELS + '/update-featured-image/' + this.hotelID, data)
            .then((res) => { console.log(res); this.getHotelInfo() })
    }

    handleRemoveImage(fileName) {
        axios.delete(URL_FOR_HOTELS + '/one-image/' + this.hotelID + '/' + fileName)
            .then((res) => this.getHotelInfo())
    }

    handleDropImage(files) {
        const file = new FormData();
        file.append('image', files[0]);

        axios.post(URL_FOR_HOTELS + '/new-image/' + this.hotelID, file)
            .then((res) => this.handleResponse(res.data))
    }

    handleResponse(data) {
        if (data.err) alert(data.message)
        this.getHotelInfo()
    }

    render() {
        return (
            <div className='row'>
                <div className="col-xs-5">
                    <h1>Hotel Images</h1>
                    <h3>for {this.state.title}</h3>

                    <Dropzone className={'dropzone'} multiple={false} onDrop={this.handleDropImage} >
                        <div>
                            <h2>Image Upload </h2>
                            Drop a photo here, or click to select file to upload.
                        </div>
                        <br /><br />
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
