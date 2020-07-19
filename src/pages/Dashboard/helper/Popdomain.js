import React, { Component, Fragment } from 'react';
import { Popover } from 'antd';
import * as d3 from 'd3';
import { JsonToTable } from "react-json-to-table";

export default class Popdomain extends Component {

    state={
        data: [],
    }
    // componentDidMount(){
    //     console.log
    //     d3.json('http://ip-api.com/json/' + this.props.ipProp).then(data=>{
            
    //         this.setState({data:data})
    //     })
    // }

    componentWillReceiveProps (){
        d3.json('http://ip-api.com/json/' + this.props.ipProp).then(data=>{
            
            this.setState({data:data})
        })
    }

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