// // Analysis.js
import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import Popscore from './utils/Popscore';
import firebase from './firebase/firebase';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Link } from 'umi';
import * as _ from 'lodash'
const moment = require('moment');

const Analysis = () => {
    const [hosts, setHosts] = useState([]);
    const [scores, setScores] = useState([]);
    const [temp, setTemp] = useState(0);
    var scoreKey;
    //firebase.database().ref().remove();
    var rootRef = firebase.database().ref('hosts');

    useEffect(()=>{
    setInterval(()=>{
        setTemp((prevTemp)=>prevTemp+1)
    }, 6000)
    }, [])

    useEffect(()=>{
    fetchData()
    }, [temp])

    const fetchData =  async () => {
        try {
            const response = await  fetch('http://localhost:8080/api/host');
            if (!response.ok) {throw Error(response.statusText);}
            const jsonObj = await response.json();

            var newTraffic = {
                time:   moment.unix(jsonObj['Time']).format('h:mA'),
                unique_hosts:   jsonObj['Number_of_unique_hosts'],
                pkts:   jsonObj['Packets_Entering_DPDK'],
                traffic_rate:   jsonObj['Traffic_Rate']/parseFloat(jsonObj['Traffic_Rate']*Math.pow(10,-9)).toFixed(4)
            }

            if((jsonObj.ID != '') && (jsonObj['Classification'] != '')){
                scoreKey = (()=>{
                    switch(jsonObj['Classification']){
                        case 'EndHost': return 'Endhost';
                        case 'TCPServer': return 'TCP Server';
                        case 'UDPProxy': return 'UDP Proxy';
                        case 'UDPServer': return 'UDP Server';
                        case 'TCPProxy': return 'TCP Proxy';
                        case 'NAT': return 'NAT';
                    }
                })();

                if ((typeof jsonObj[`${scoreKey}`] == 'undefined') || (jsonObj[`${scoreKey}`] == null)){
                    jsonObj[`${scoreKey}`] = 0;
                }

                rootRef.child(`${jsonObj['IP'].replace(/\./g,',')}`).orderByChild('time').equalTo(`${jsonObj['Time']}`).once('value', snapshot => {
                    if(!snapshot.exists()){
                        rootRef.child(`${jsonObj['IP'].replace(/\./g,',')}`).push().set({
                            time: jsonObj['Time'],
                            type: jsonObj['Classification'],
                            score: jsonObj[`${scoreKey}`]
                        });
                    }
                })

                var newHost = {
                        time: moment.unix(jsonObj['Time']).format('h:mm:ss'),
                        ip: jsonObj['IP'],
                        host_type: jsonObj['Classification'],
                        host_score: jsonObj[`${scoreKey}`]
                }

                var newScore = [
                        {type: 'EndHost', score: jsonObj['Endhost']},
                        {type: 'NAT', score: jsonObj['NAT']},
                        {type: 'TCP Proxy', score: jsonObj['TCP Proxy']},
                        {type: 'TCP Server', score: jsonObj['TCP Server']},
                        {type: 'UDP Proxy', score: jsonObj['UDP Proxy']},
                        {type: 'UDP Server', score: jsonObj['UDP Server']} 
                ]

                if(!(_.isEqual(hosts.slice(-1)[0], newHost))){
                    setHosts(hosts => [...hosts, newHost]);
                }

                if(!(_.isEqual(scores.slice(-1)[0], newScore))){
                    setScores(scores => [...scores, newScore]);
                }
            }


        }
        catch (error) {console.log(error);}
    }
    
    return (
            <div>
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
                             hosts.reverse().map((d, index)=>
                                 <tr key={index}>
                                     <td>{d.time}</td>
                                         <td><Link to={`/dashboard/workplace?ipAddress=${d.ip}`} style={{outline: 'none', textDecoration: 'none', border: 0}}>{d.ip}</Link></td>
                                     <td>
                                         <Popscore scoreProp={scores} indexProp={d.index}>
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
            </div>
    );
}

export default Analysis;
