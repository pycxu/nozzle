import React, { Component, Fragment } from 'react';
import { Popover } from 'antd';
//import rdns from './rdnsExport'
//const rdns = require('./rdnsModule');
//const dns = require('dns');
const whois = require('whois');


export default class Popdomain extends Component {

    state={
        data: [],
    }
    componentDidMount(){
        // dns.reverse(this.props.ipProp, (err, hostnames)=>{
        //     this.setState({domains:hostnames})
        // })

        whois.lookup(this.props.ipProp, (err, info)=>{
            this.setState({data:info});
        })

        // whois(this.props.ipProp, function(info){
        //     console.log("who",info)
        // })
    }

    // reversedns (ip){
    //     // rdns(ip, function(data){
    //     //     //console.log("hostnames", data);
    //     //     this.setState({domains:data})
    //     // })
    //     rdns.hostnames(ip, function(data){
    //         //console.log("hostnames", data);
    //         this.setState({domains:data})
    //     })
    // }

    render(){

        var content = (
            <p>{this.state.info}</p>
        );

        return(
            <Fragment>
                <Popover content={content} title="Info">
                    {this.props.children}
                </Popover>
            </Fragment>
        )
    }
}