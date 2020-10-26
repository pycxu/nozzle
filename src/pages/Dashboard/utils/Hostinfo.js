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
        d3.json('https://api.ipgeolocation.io/ipgeo?apiKey=5e3c80bf331544198986d1fb0457f9f3&ip='+ this.props.ipProp+'&excludes=continent_name,country_code3,country_capital,zipcode,is_eu,calling_code,country_tld,languages,country_flag,geoname_id,connection_type,continent_code,currency,time_zone&include=security' ).then(data=>{
        
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