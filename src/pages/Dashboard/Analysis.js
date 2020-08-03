// Analysis.js
import React, { Component, Fragment } from 'react';
import Table from 'react-bootstrap/Table';
import * as d3 from 'd3';
import Popscore from './utils/Popscore';
import Popdomain from './utils/Popdomain';
import Ring from './utils/Ring';
import firebase from './firebase/firebase';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Link } from 'umi';


const moment = require('moment');
const hostAwsUrl = 'https://nozzlehostdata.s3-ap-southeast-2.amazonaws.com/host+-+2020-03-09-result.csv';
const filteredHost = 'https://nozzlehostdata.s3-ap-southeast-2.amazonaws.com/filteredHost+-+filtered-0310-result.csv';
export default class Analysis extends Component {
    state = {
        data:[],
        score:[],
        index: 0,
        count: 1
    }
    
    componentDidMount () {

        var parsedData = [];
        var parseScore = [];
        var scoreKey;

        d3.csv(filteredHost, {
            headers: new Headers({
                "Access-Control-Allow-Origin" : "*",
            })})
        .then((data)=>{
            //firebase.database().ref().remove();
            var rootRef = firebase.database().ref('hosts');
            
            data.map((d, index) =>{
                
                if((d.ID != '') && (d['Classification'] != '')){

                    scoreKey = (()=>{
                        switch(d['Classification']){
                            case 'EndHost': return 'Endhost';
                            case 'TCPServer': return 'TCP Server';
                            case 'UDPProxy': return 'UDP Proxy';
                            case 'UDPServer': return 'UDP Server';
                            case 'TCPProxy': return 'TCP Proxy';
                            case 'NAT': return 'NAT';
                        }
                    })();

                    if ((typeof d[`${scoreKey}`] == 'undefined') || (d[`${scoreKey}`] == null)){
                        d[`${scoreKey}`] = 0;
                    }

                    rootRef.child(`${d['IP'].replace(/\./g,',')}`).orderByChild('time').equalTo(`${d['Time']}`).once('value', snapshot => {
                        if(!snapshot.exists()){
                            rootRef.child(`${d['IP'].replace(/\./g,',')}`).push().set({
                                time: d['Time'],
                                type: d['Classification'],
                                score: d[`${scoreKey}`]
                            });
                        }
                    })

                    parsedData.push({
                        index: index,
                        time: moment.unix(d['Time']).format('h:mm:ss'),
                        ip: d['IP'],
                        host_type: d['Classification'],
                        host_score: d[`${scoreKey}`]
                    });

                    parseScore.push([
                        {type: 'EndHost', score: d['Endhost']},
                        {type: 'NAT', score: d['NAT']},
                        {type: 'TCP Proxy', score: d['TCP Proxy']},
                        {type: 'TCP Server', score: d['TCP Server']},
                        {type: 'UDP Proxy', score: d['UDP Proxy']},
                        {type: 'UDP Server', score: d['UDP Server']} 
                    ]);
                }    
            });

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
                                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <span style={{width: '65%'}}>{d.host_type}</span>
                                                <div style={{width: '35%'}}>
                                                    <ProgressBar variant={(d.host_score > 0.49)?'success':'danger'} now={d.host_score * 100} /> 
                                                </div>
                                            </div>
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
