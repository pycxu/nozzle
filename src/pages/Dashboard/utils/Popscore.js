import React, { Component, Fragment } from 'react';
import { Popover } from 'antd';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
export default class Popscore extends Component{
    // constructor(props) {
    //     super(props);
    // }
    render (){
        var content = (
            <BarChart
                width={650}
                height={300}
                data={this.props.scoreProp[this.props.indexProp]}
                margin={{
                top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#8884d8" />
            </BarChart>
        );
        return (
            <Fragment>
                <Popover placement="top" content={content} title="Confidence Level">
                    {this.props.children}
                </Popover>
            </Fragment>
        )
    }
}