import { Scatter, Treemap } from "@ant-design/charts";
import React, { Component, Fragment } from 'react';

export default class Scatterchart extends Component {

    render () {
        var data = this.props.dataProp;
        const config = {
            data,
            xField: "time",
            yField: "score",
            colorField: "type",
            color: [
              "#d62728",
              "#2ca02c",
              "#000000",
              "#9467bd",
              "#ffd500",
              "#1f77b4",
            ],
            pointStyle: { fillOpacity: 1 },
            xAxis: {
              type: 'dateTime',
              tickCount: 5,
            },
            forceFit: true,
            yAxis: {
              min: 0,
              max: 1.2
            }
          };
        return (
            <Fragment>
                <Scatter {...config} />
            </Fragment>
        )
    }
}