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
            pointStyle: { opacity: 1 },
            xAxis: {
              type: 'dateTime',
              visible: true,
              tickCount: 2,
              // tickInterval: 2,
              label: {
                autoHide: true,
              },

            },
            forceFit: true,
            yAxis: {
              min: -0.1,
              max: 1.1,
              tickInterval:0.2,
              label: {
                formatter: (v) => `${((v > 1)||(v<0))?'':v}`,
              }
            },
            interactions: [
              {
                type: 'slider',
                cfg: {
                  start: 0,
                  end: 1,
                },
              },
            ],
            legend: {
              position: 'top'
            }
          };
        return (
            <Fragment>
                <Scatter {...config} />
            </Fragment>
        )
    }
}