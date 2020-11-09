if (typeof fetch !== 'function') {
    global.fetch = require('node-fetch-polyfill');
}
var d3 = require("d3");
const NATS = require('nats');
const nc = NATS.connect();

const pktAwsUrl = 'https://nozzlehostdata.s3-ap-southeast-2.amazonaws.com/pkt+-+09-03-2020_Packet_Stats.csv';
const hostAwsUrl = 'https://nozzlehostdata.s3-ap-southeast-2.amazonaws.com/host+-+2020-03-09-result.csv';
nc.on('connect', () => {
    console.log('server connected');
})
async function pubPkt(msg){
    try{
        await nc.publish('pkt',msg);
    }
    catch(e) {
        console.log('Catch an error: ', e)
      }
    
}

async function pubHost(msg){
    try{
        await nc.publish('host',msg);
    }
    catch(e) {
        console.log('Catch an error: ', e)
      }
    
}

d3.csv(pktAwsUrl).then((pktInfo)=>{
        index = -1;
        setInterval(()=>{
            if(index<pktInfo.length){
                pubPkt(JSON.stringify(pktInfo[index++]));
            }else{
                index=-1;
            }
        },6000);
})

d3.csv(hostAwsUrl).then((hostInfo)=>{
    index = -1;
    setInterval(()=>{
        if(index<hostInfo.length){
            pubHost(JSON.stringify(hostInfo[index++]));
        }else{
            index=-1;
        }
    },6000);
})
