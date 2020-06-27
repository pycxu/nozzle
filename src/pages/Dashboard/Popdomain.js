import React, { Component, Fragment } from 'react';
import { Popover } from 'antd';

const dns = require('dns');

export default class Popdomain extends Component {

    state={
        domains: [],
    }
    componentDidMount(){
        // console.log("ip: ", this.props.ipProp)
        // this.rdns(this.props.ipProp, function(d){
        //     console.log("domain: ", d);
        // });
        // // dns.reverse(`${this.props.ipProp}`, (err, domains)=>{
        // //     console.log("domains: ",domains);
        // //     this.setState({domain:domains})
        // // }
    }

    // rdns(ip, callback){
    //     dns.reverse(`${this.props.ipProp}`, (err, domains)=>{
    //         console.log("domains: ",domains);
    //         fn(domains);
    //     }
    // }

    render(){

        var content = (
            <p>{this.state.domains}</p>
        );

        return(
            <Fragment>
                <Popover content={content} title="Domain">
                    {this.props.children}
                </Popover>
            </Fragment>
        )
    }
}