import React from 'react';
import {GridTile} from 'material-ui/GridList';

export const Image = (props) => {

    const {image, i, handleRemoveImage, type} = props

    const removeIcon = (
        <span onClick={() => handleRemoveImage(image.fileName)} 
              className='remove removeImage glyphicon glyphicon-trash'>
        </span>
    )

    return (
        <GridTile title={'No. ' + (i + 1)} actionIcon={removeIcon}>
            <img src={'uploads/' + type + '/' + image.fileName} />
        </GridTile>
    )
}
