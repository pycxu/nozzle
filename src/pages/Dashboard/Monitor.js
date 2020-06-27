// Monitor.js
import React, { Component, Fragment } from 'react';
import axios from 'axios'

import {
    Label,Area,AreaChart, LineChart, Line, XAxis, Tooltip,
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
                    traffic_rate:val.tr*Math.pow(10,-9),//val.tr/Math.pow(1024,2)
                    hosts: val.host
                }
        })
        // this.setState({traffics: parsedData});
        var qtr = parseInt(parsedData.length * (1/parsedData.length));
         //console.log("ln:",parsedData.length);

        this.interval = setInterval(() => {
            if (this.state.index < parsedData.length){
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
                <div>
                    <p>Number of hosts</p>
                    <LineChart width={1089} height={200} data={this.state.traffics}> 
                        <Tooltip />
                        <Label  dataKey="hosts" position="insideTopLeft"/>
                        <Line type="monotone" dataKey="hosts" stroke="#8884d8" />
                    </LineChart>
                    <p>Traffic volume</p>
                    <AreaChart width={1089} height={300} data={this.state.traffics}>
                        <Tooltip />
                        <XAxis dataKey="time" />
                        <Area type="monotone" dataKey="traffic_rate" stroke="#8884d8" />
                    </AreaChart>
                </div>
                
            </Fragment>
        )
    }
}