import { RingProgress } from "@ant-design/charts";
import React, { Component, Fragment } from 'react';

export default class Ring extends Component {

    render () {
        var percent = parseInt(this.props.percentProp);
        
        const config = {
            width: 35,
            height: 35,
            percent,
            color: ['#30BF78', '#E8EDF3'],
          };
        return (
            <Fragment>
                <RingProgress {...config} />
            </Fragment>
        )
    }
}