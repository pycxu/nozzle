import React, { Component, Fragment } from 'react';
import { Popover } from 'antd';
import * as d3 from 'd3';
import { JsonToTable } from "react-json-to-table";
//import rdns from './rdnsExport'
//const rdns = require('./rdnsModule');
//const dns = require('dns');
//const whois = require('whois');


export default class Popdomain extends Component {

    state={
        data: [],
    }
    componentDidMount(){
        // dns.reverse(this.props.ipProp, (err, hostnames)=>{
        //     this.setState({domains:hostnames})
        // })

        // whois.lookup(this.props.ipProp, (err, info)=>{
        //     this.setState({data:info});
        // })

        // whois(this.props.ipProp, function(info){
        //     console.log("who",info)
        // })
        
        d3.json('http://ip-api.com/json/' + this.props.ipProp).then(data=>{
            console.log("json: ",data)
            this.setState({data:data})
        })
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
            <JsonToTable json={this.state.data} />
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