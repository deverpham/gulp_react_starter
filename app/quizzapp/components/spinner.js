import React from 'react';
import {RingLoader} from 'react-spinners';
export class Spinner extends React.Component {
    render() {
        return (
            <div className='d-flex w-100 justify-content-center align-item-center'>
                <RingLoader
                size ={100}
                sizeUnit = {"px"}
                color  = {'#ff6600'}
                 />
            </div>
        )
    }
}