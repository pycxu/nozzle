// Analysis.js
import React, { Component, Fragment } from 'react';
import Table from 'react-bootstrap/Table';
import * as d3 from 'd3';
import Popscore from './helper/Popscore';
import Popdomain from './helper/Popdomain';
import firebase from './firebase/firebase';
import { Link } from 'umi';

const moment = require('moment');
const hostAwsUrl = 'https://nozzlehostdata.s3-ap-southeast-2.amazonaws.com/host+-+2020-03-09-result.csv';
export default class Analysis extends Component {
    state = {
        data:[],
        score:[],
        index: 0,
        count: 1
    }
    
    componentDidMount () {
        
        d3.csv(hostAwsUrl, {
            headers: new Headers({
                "Access-Control-Allow-Origin" : "*",
            })})
        .then((data)=>{

            data.map(d =>{

                //firebase.database().ref().remove();
                var rootRef = firebase.database().ref('hosts');
                //if((typeof d['Classification'] !== 'undefined') && (d['Classification'] != null))
                    
                    rootRef.child(`${d['IP'].replace(/\./g,',')}`).orderByChild('time').equalTo(`${d['Time']}`).once('value', snapshot => {
                        if((!snapshot.exists()) && (d['Classification'] != '')){
                            
                                var scoreKey = (()=>{
                                    switch(d['Classification']){
                                        case 'EndHost': return 'Endhost';
                                        case 'TCPServer': return 'TCP Server';
                                        case 'UDPProxy': return 'UDP Proxy';
                                        case 'UDPServer': return 'UDP Server';
                                        case 'TCPProxy': return 'TCP Proxy';
                                        case 'NAT': return 'NAT';
                                    }
                                })();

                                rootRef.child(`${d['IP'].replace(/\./g,',')}`).push().set({
                                    time: d['Time'],
                                    type: d['Classification'],
                                    score: d[`${scoreKey}`]
                                });
                            
                        }
                    })
                
          
            });


            var parsedData = data.map((d, index) => {

                var scoreKey = (()=>{
                    switch(d['Classification']){
                        case 'EndHost': return 'Endhost';
                        case 'TCPServer': return 'TCP Server';
                        case 'UDPProxy': return 'UDP Proxy';
                        case 'UDPServer': return 'UDP Server';
                        case 'TCPProxy': return 'TCP Proxy';
                        case 'NAT': return 'NAT';
                    }
                })();
                
                return {
                    index: index,
                    time: moment.unix(d['Time']).format('h:mm:ss'),
                    ip: d['IP'],
                    host_type: d['Classification'],
                    host_score: d[`${scoreKey}`]
                }
            });

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

            var qtr = parseInt(parsedData.length * (1/parsedData.length));

            this.interval = setInterval(() => {
                if (this.state.count < parsedData.length){
                    this.setState({data: parsedData.slice(0,qtr*this.state.count), count: this.state.count+1}); 
                }           
            }, 3000);
        })
    }

    render () {

        return(
            <Fragment>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Host</th>
                            <th>Host Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.reverse().map((d, index)=>
                                
                                <tr key={index}>
                                    <td>{d.time}</td>
                                    {/* <Popdomain ipProp={d.ip}> */}
                                        <td><Link to={`/dashboard/workplace?ipAddress=${d.ip}`} style={{outline: 'none', textDecoration: 'none', border: 0}}>{d.ip}</Link></td>
                                    {/* </Popdomain> */}
                                    <td>
                                        <Popscore scoreProp={this.state.score} indexProp={d.index}>
                                            {d.host_type}  {d.host_score}CL
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
