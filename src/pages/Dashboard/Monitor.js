// Monitor.js
import React, { Component, Fragment } from 'react';
import * as d3 from 'd3';
import {
    Text, CartesianGrid,Label,Area,AreaChart, LineChart, Line, XAxis,YAxis, Tooltip,
  } from 'recharts';
import DataFormater from './utils/DataFormater';

const moment = require('moment');
const pktAwsUrl = 'https://nozzlehostdata.s3-ap-southeast-2.amazonaws.com/pkt+-+09-03-2020_Packet_Stats.csv';
export default class Monitor extends Component {

    state = {
        traffics: [],
        count:1
    }
    
    componentDidMount(){
    d3.csv(pktAwsUrl, {
        headers: new Headers({
            "Access-Control-Allow-Origin" : "*",
        })}).then((pktInfo)=>{
            console.log("pkt: ",pktInfo);
            var parsedData = pktInfo.map((pkt,index) => {
                return {
                    index: index,
                    time:   moment.unix(pkt['Time']).format('h:mA'),
                    unique_hosts:   pkt['Number_of_unique_hosts'],
                    pkts:   pkt['Packets_Entering_DPDK'],
                    traffic_rate:   pkt['Traffic_Rate']//parseFloat(pkt['Traffic_Rate']*Math.pow(10,-9)).toFixed(4)
                }
            })

            var qtr = parseInt(parsedData.length * (1/parsedData.length)); 
            
            this.interval = setInterval(() => {
                if (this.state.count < parsedData.length){
                    this.setState({traffics: parsedData.slice(0,qtr*this.state.count), count: this.state.count+1}); 
                }           
            }, 100);
        })
  }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render () {
        return (
            <Fragment>
                <div>
                        <LineChart width={1089} height={250} data={this.state.traffics} margin={{ top: 10, right: 0, bottom: 0, left: 0 }}> 
                            <Tooltip wrapperStyle={{backgroundColor: '#ccc' }}/>
                            <XAxis dataKey="time" hide/>
                            <YAxis domain={[dataMax => (dataMax / 2), dataMax => (dataMax * 2)]} tickFormatter={DataFormater} style={{fontSize:10}} label={<Text x={0} y={0} dx={65} dy={30} offset={0} style={{fontSize:10}}>Hosts</Text>}/>
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <Label  dataKey="hosts" position="insideTopLeft"/>
                            <Line type="monotone" dataKey="unique_hosts" stroke="#8884d8" />
                        </LineChart>
                        
                        <LineChart width={1089} height={250} data={this.state.traffics} margin={{ top: 10, right: 0, bottom: 0, left: 0 }}> 
                            <Tooltip wrapperStyle={{backgroundColor: '#ccc' }}/>
                            <XAxis dataKey="time" hide/>
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <YAxis domain={[dataMax => (dataMax / 2), dataMax => (dataMax * 2)]} tickFormatter={DataFormater} style={{fontSize:10}} label={<Text x={0} y={0} dx={65} dy={30} offset={0} style={{fontSize:10}}>Packets</Text>}/>
                            <Label  dataKey="pkts" position="insideTopLeft"/>
                            <Line type="monotone" dataKey="pkts" stroke="#8884d8" />
                        </LineChart>
                        
                        <AreaChart width={1089} height={250} data={this.state.traffics} margin={{ top: 10, right: 0, bottom: 0, left: 0 }}>
                            <Tooltip wrapperStyle={{backgroundColor: '#ccc' }}/>
                            <YAxis domain={[dataMax => (dataMax / 2), dataMax => (dataMax * 2)]} tickFormatter={DataFormater} style={{fontSize:10}} label={<Text x={0} y={0} dx={65} dy={30} offset={0} style={{fontSize:10}}>Traffic rate</Text>}/>
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis style={{fontSize:10}} dataKey="time" domain = {['auto', 'auto']} />
                            <Area type="monotone" dataKey="traffic_rate" stroke="#8884d8" unit={"bps"}/>
                        </AreaChart>
                </div>
                
            </Fragment>
        )
    }
}