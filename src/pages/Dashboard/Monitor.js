// Monitor.js
import React, { Component, Fragment } from 'react';
import axios from 'axios'

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

const moment = require('moment');
export default class Monitor extends Component {

    state = {
        traffics: [],
        index:1
    }
    
    componentDidMount(){
    axios.get(`http://localhost:8080`)
    .then(res => {
        var parsedData = res.data.map(val => {
            return {time:moment.unix(val.time).format('h:mA'),
                    traffic_rate:Math.round(val.tr/Math.pow(1024,2))}
        })
        // this.setState({traffics: parsedData});
        var qtr = parseInt(parsedData.length * (1/parsedData.length));
        // console.log(parsedData.length);

        this.interval = setInterval(() => {
            if (this.state.index < 1440){
                this.setState({traffics: parsedData.slice(0,qtr*this.state.index), index: this.state.index+1}); 
            }           
        }, 100);
        // console.log(arr)
    })
  }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render () {

        return (
            <Fragment>
                <LineChart width={1000} height={300} data={this.state.traffics}>
                    <XAxis dataKey="time"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="traffic_rate" dot={false} stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                </LineChart>
            </Fragment>
        )
    }
}