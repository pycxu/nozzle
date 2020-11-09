const NATS = require('nats');
const nc = NATS.connect();

nc.on('connect', () => {
    console.log('api connected');
})

// In lastMsg we store the last message we received.
// Initially we have just an empty message.
let lastMsgPkt = { "message": "" };
let lastMsgHost = { "message": "" };

nc.subscribe('pkt', function(msg){ // listen on 'pkt' channel and fetch msg data
    console.log(msg.length, msg); //  here, the msg data changes every 1 minute

    // We only update the message if it is not empty.
    if(msg.length>0) {
        let newMsgPkt = JSON.parse(msg);
        // We send an event to tell all subscribing clients the message has changed.
        // We could compare the new msg with the last one, to determine which
        // values has actually changed.
        // But we can also send the entire model (like below), and let Resgate
        // compare for any differences.
        nc.publish('event.pkt.change', JSON.stringify({ values: newMsgPkt }));
        // We store away the message for the get.pkt handler.
        lastMsgPkt = newMsgPkt;
    }
});

// The get.pkt will respond with the last message received.
nc.subscribe('get.pkt', (req, reply) => {
    nc.publish(reply, JSON.stringify({ result: { model: lastMsgPkt }}));
});

nc.subscribe('access.pkt', (req, reply) => {
    nc.publish(reply, JSON.stringify({ result: { get: true }}));
});

nc.subscribe('host', function(msg){ 
    if(msg.length>0) {
        let newMsgHost = JSON.parse(msg);
        nc.publish('event.host.change', JSON.stringify({ values: newMsgHost }));
        lastMsgHost = newMsgHost;
    }
});

nc.subscribe('get.host', (req, reply) => {
    nc.publish(reply, JSON.stringify({ result: { model: lastMsgHost }}));
});

nc.subscribe('access.host', (req, reply) => {
    nc.publish(reply, JSON.stringify({ result: { get: true }}));
});