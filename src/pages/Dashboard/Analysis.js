// Analysis.js
import React, { Component, Fragment } from 'react';
import Table from 'react-bootstrap/Table';
import * as d3 from 'd3';
import { Popover } from 'antd';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
import Popscore from './Popscore'
import Popdomain from './Popdomain'


const dns = require('dns');
const moment = require('moment');
const pktUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRlt6nYbDHAb0xpLGRgsYIxHAX770mt6cnHIodbpqRSg3rBcW_Y_oOHAHvnEiizQNMaMpq2yTgICGHl/pub?gid=1263250549&single=true&output=csv';
const hostUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQCImp2Vur8CYk96EbCMlM0Sjxuou3FQzhOjgoIcXn95inzVWmuj5YYxWnHoxlM9F8-sgXMKQqr85E2/pub?gid=1159639971&single=true&output=csv';
export default class Analysis extends Component {
    state = {
        data:[],
        score:[],
        index: 0,
        count: 1
    }
    
    componentDidMount () {
        // dns.reverse('8.8.8.8', (err, domains)=>{
        //             console.log("domains: ",domains);//
        // })

        d3.csv(pktUrl).then((d)=>{
            console.log("pkt:", d);
        })
        d3.csv(hostUrl)
        .then((data)=>{
            console.log("raw data length:",data.length)
            var parsedData = data.map((d, index) => {
                
                return {
                    index: index,
                    time: moment.unix(d['Time']).format('h:mm:ss'),
                    ip: d['IP'],
                    host_type: d['Classification'],
                    // confidence_level: {
                    //     endhost: d['Endhost'],
                    //     nat: d['NAT'],
                    //     tcp_proxy: d['TCP Proxy'],
                    //     tcp_server: d['TCP Server'],
                    //     udp_proxy: d['UDP Proxy'],
                    //     udp_server: d['UDP Server']
                    // }
                }
            });
            console.log("parsed data length: ",parsedData.length);

            var parseScore = data.map(d =>{
                return ([
                    {type: 'EndHost', score: d['Endhost']},
                    {type: 'NAT', score: d['NAT']},
                    {type: 'TCP Proxy', score: d['TCP Proxy']},
                    {type: 'TCP Server', score: d['TCP Server']},
                    {type: 'UDP Proxy', score: d['UDP Proxy']},
                    {type: 'UDP Server', score: d['UDP Server']} 
                ])
            })
            this.setState({score: parseScore});

            console.log("score: ", parseScore.length);

            //parsedData = parsedData.reverse();

            var qtr = parseInt(parsedData.length * (1/parsedData.length));

            this.interval = setInterval(() => {
                if (this.state.count < parsedData.length){
                    this.setState({data: parsedData.slice(0,qtr*this.state.count), count: this.state.count+1}); 
                }           
            }, 3000);
            //this.setState({data:parsedData})
            //console.log("csv 0:", parsedData[parsedData.length-1]);
        })
    }

    render () {

        return(
            <Fragment>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>IP</th>
                            <th>Classification Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map(d=>
                                
                                <tr>
                                    <td>{d.time}</td>
                                    <Popdomain ipProp={d.ip}>
                                        <td>{d.ip}</td>
                                    </Popdomain>
                                    <td>
                                        <Popscore scoreProp={this.state.score} indexProp={d.index}>
                                            {d.host_type}
                                        </Popscore>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Fragment>
        )
        
    }
}
