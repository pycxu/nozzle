import { Radar } from "@ant-design/charts";
import React, { Component, Fragment } from 'react';

export default class Radarchart extends Component {

    render () {
        var data = this.props.dataProp;
        const config = {
            data,
            angleField: 'type',
            radiusField: 'occurrence',
            radiusAxis: {
              grid: {
                alternateColor: ['rgba(0, 0, 0, 0.04)', null],
              },
            },
            area: { visible: true },
            point: { visible: true },
          };
        return (
            <Fragment>
                <Radar {...config} />
            </Fragment>
        )
    }
}