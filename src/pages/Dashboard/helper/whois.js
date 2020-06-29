module.exports = function(ip, callback) {

    var whois = require('whois');
    whois.lookup(ip, (err, info)=>{
        console.log("whois",info)
        return callback(info)
    })
 
}