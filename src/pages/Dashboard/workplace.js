// Workplace.js
import React, { Component, Fragment } from 'react';
import firebase from './firebase/firebase';
import { Input } from 'antd';
import Scatterchart from './utils/Scatterchart';
import Radarchart from './utils/Radarchart';
import Hostinfo from './utils/Hostinfo';
import { Card } from 'antd';
const { Search } = Input;
const moment = require('moment');

export default class Workplace extends Component {
  state = {
    ip: '',
    query: false,
    scatterData: [],
    raderData: []
  }

  componentDidMount(){

    if(typeof this.props.location.query.ipAddress != 'undefined'){
      console.log('url ip:', this.props.location.query.ipAddress);
      this.setState({ip: this.props.location.query.ipAddress, query: true}, console.log('mount ip:', this.state.ip));
      this.queryHost(this.props.location.query.ipAddress);
    }
    
  }

  handleSearch(ip){
    if((typeof ip != 'undefined') && (ip != '')){
      console.log("hanle ip", ip);
      this.setState({ip});
      this.queryHost(ip);
    }
  }

  queryHost (ip) {
    var rootRef = firebase.database().ref('hosts');
    rootRef.child(`${ip.replace(/\./g,',')}`).on('value', snapshot=>{
      if(snapshot.exists()){
        var raderData = [
          {type: 'EndHost', occurrence: 0},
          {type: 'TCPServer', occurrence: 0},
          {type: 'UDPProxy', occurrence: 0},
          {type: 'UDPServer', occurrence: 0},
          {type: 'TCPProxy', occurrence: 0},
          {type: 'NAT', occurrence: 0}
        ];
        var scatterData = Object.keys(snapshot.val()).map(key => {
         
          switch(snapshot.val()[key].type){
            case 'EndHost':
              raderData[0].occurrence += 1; 
              break;
            case 'TCPServer':
              raderData[1].occurrence += 1; 
              break;
            case 'UDPProxy':
              raderData[2].occurrence += 1; 
              break;
            case 'UDPServer':
              raderData[3].occurrence += 1; 
              break;
            case 'TCPProxy':
              raderData[4].occurrence += 1; 
              break;
            case 'NAT':
              raderData[5].occurrence += 1; 
              break;
          }

          return {
            time: moment.unix(snapshot.val()[key].time).format('DD/MM H:mm'),
            type: snapshot.val()[key].type,
            score: snapshot.val()[key].score
          }
        });
        this.setState({scatterData, raderData});
        console.log("query ip", this.state.ip);
      }else{
        alert("Invalid input or unknown host");
      }
    });
  }
  

  render () {

    return (
      <Fragment>
        {!this.state.query ?<Search placeholder="Host IP Address" onSearch={value => this.handleSearch(value)} style={{ width: 200 }} />:(<span className='badge badge-pill badge-primary'>{this.state.ip}</span>)}
        {/* {this.state.query?<span>true</span>:<span>false</span>} */}
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <Card title="Host Info" bordered={true} style={{ width: '50%'}}>
            <Hostinfo ipProp={this.state.ip}/>
          </Card>
          <Card title="Host Pattern" bordered={true} style={{ width: '50%'}}>
            <Radarchart dataProp={this.state.raderData}/>
          </Card>
        </div>
        <Card title="Host Behaviour" bordered={true}>
          <Scatterchart dataProp={this.state.scatterData} />
        </Card>

      </Fragment>
    )
  }
}
// export default () => {
//     return <p>Workplace Page</p>
//   };
