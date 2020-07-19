// Workplace.js
import React, { Component, Fragment } from 'react';
import firebase from './firebase/firebase';
import { Input } from 'antd';
const { Search } = Input;

export default class Workplace extends Component {
  state = {
    ip: '',
    query: false
  }

  componentDidMount(){

    if(typeof this.props.location.query.ipAddress != 'undefined'){
      this.setState({ip: this.props.location.query.ipAddress, query: true})
      var rootRef = firebase.database().ref('hosts');
      rootRef.child(`${this.props.location.query.ipAddress.replace(/\./g,',')}`).on('value', snapshot=>{
        if(snapshot.exists()){
          console.log('snap:',snapshot.val());
        }
      })
    }

  }

  handleSearch(val){
    var rootRef = firebase.database().ref('hosts');
    rootRef.child(`${val.replace(/\./g,',')}`).on('child_added', snapshot=>{
      if(snapshot.exists()){
        console.log('snap:',snapshot.val());
      }
    })
  }

  render () {
    
    return (
      <Fragment>
        {!this.state.query ?<Search placeholder="input search text" onSearch={value => this.handleSearch(value)} style={{ width: 200 }} />:<h5>{this.state.ip}</h5>} 
      </Fragment>
    )
  }
}
// export default () => {
//     return <p>Workplace Page</p>
//   };