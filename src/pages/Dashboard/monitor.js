// // Monitor.js
import React, {useEffect, useState} from 'react';
import { Line, Area} from '@ant-design/charts';
import { Card } from 'antd';
import DataFormater from './utils/DataFormater';

const moment = require('moment');
import * as _ from 'lodash'

const Monitor = () => {
    const [traffics, setTraffics] = useState([]);
    const [temp, setTemp] = useState(0)

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
            const response = await  fetch('http://localhost:8080/api/pkt');
            if (!response.ok) {throw Error(response.statusText);}
            const jsonObj = await response.json();
            var newTraffic = {
                time:   moment.unix(jsonObj['Time']).format('h:mA'),
                unique_hosts:   jsonObj['Number_of_unique_hosts'],
                pkts:   jsonObj['Packets_Entering_DPDK'],
                traffic_rate:   jsonObj['Traffic_Rate']/parseFloat(jsonObj['Traffic_Rate']*Math.pow(10,-9)).toFixed(4)
            }

            if(!(_.isEqual(traffics.slice(-1)[0], newTraffic))){
                setTraffics(traffics => [...traffics, newTraffic]);
            }
        }
        catch (error) {console.log(error);}
    }

    var lineHostConfig = {
        smooth: true,
        height: 250,
        width: 1089,
        data: traffics,
        padding: 'auto',
        xField: 'time',
        yField: 'unique_hosts',
        yAxis:{
            label:{
                formatter: function formatter(v){
                    if(v > 1000000000){
                      return (v/1000000000).toFixed(3).toString() + 'G';
                    }else if(v > 1000000){
                      return (v/1000000).toFixed(3).toString() + 'M';
                    }else if(v > 1000){
                      return (v/1000).toFixed(3).toString() + 'K';
                    }else{
                      return v.toString();
                    }
                },
            },
        },
    };

    var linePktConfig = {
        smooth: true,
        height: 250,
        width: 1089,
        data: traffics,
        padding: 'auto',
        xField: 'time',
        yField: 'pkts',
        yAxis:{
            label:{
                formatter: function formatter(v){
                    if(v > 1000000000){
                      return (v/1000000000).toFixed(3).toString() + 'G';
                    }else if(v > 1000000){
                      return (v/1000000).toFixed(3).toString() + 'M';
                    }else if(v > 1000){
                      return (v/1000).toFixed(3).toString() + 'K';
                    }else{
                      return v.toString();
                    }
                },
            },
        },
    };

    var areaTrConfig = {
        smooth: true,
        height: 250,
        width: 1089,
        data: traffics,
        xField: 'time',
        yField: 'traffic_rate',
        annotations: [
            {
            type: 'text',
            position: ['min', 'median'],
            content: 'Mean',
            offsetY: -4,
            style: { textBaseline: 'bottom' },
            },
            {
            type: 'line',
            start: ['min', 'median'],
            end: ['max', 'median'],
            style: {
                stroke: 'red',
                lineDash: [2, 2],
            },
            },
        ],
        yAxis:{
            label:{
                formatter: function formatter(v){
                    if(v > 1000000000){
                    return (v/1000000000).toFixed(3).toString() + 'G';
                    }else if(v > 1000000){
                    return (v/1000000).toFixed(3).toString() + 'M';
                    }else if(v > 1000){
                    return (v/1000).toFixed(3).toString() + 'K';
                    }else{
                    return v.toString();
                    }
                },
            },
        },
    };
    
    return (
            <div>
                <Card title="Hosts" bordered={false} >
                    <Line {...lineHostConfig} />
                </Card>
                <Card title="Packets" bordered={false} >
                    <Line {...linePktConfig} />
                </Card>
                <Card title="Traffic rate" bordered={false} >
                    <Area {...areaTrConfig} />
                </Card>  
            </div>
    );
}

export default Monitor;
