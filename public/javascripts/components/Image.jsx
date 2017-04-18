import React from 'react';
import {GridTile} from 'material-ui/GridList';

export const Image = (props) => {

    const {image, i, handleRemoveImage, featuredImage, handleSetFeaturedImage, type} = props

    const removeIcon = (
        <div>
            <span onClick={() => handleSetFeaturedImage(i)} 
                className='remove removeImage glyphicon glyphicon-star'>
            </span>
            <span onClick={() => handleRemoveImage(image.fileName)} 
                className='remove removeImage glyphicon glyphicon-trash'>
            </span>
        </div>
    )
    
    const featured = (i, featuredImage) => {
        if (String(i) === featuredImage) return 'Featured';
        return '';
    };

    return (
        <GridTile title={'No. ' + (i + 1)} subtitle={featured(i, featuredImage)} actionIcon={removeIcon}>
            <img src={'uploads/' + type + '/' + image.fileName} />
        </GridTile>
    )
}
