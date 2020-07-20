import React, { Component, Fragment } from 'react';
import * as d3 from 'd3';
import { JsonToTable } from "react-json-to-table";


export default class Hostinfo extends Component {

    state={
        data: [],
    }

   componentWillReceiveProps(){
    if(this.props.ipProp != ''){
        console.log('ipProp',this.props.ipProp);
        d3.json('http://ip-api.com/json/' + this.props.ipProp).then(data=>{
        
            this.setState({data})
        })
    }
   }

    render(){

        return(
            <Fragment>
                    <JsonToTable striped bordered hover responsive json={this.state.data} />
            </Fragment>
        )
    }
}