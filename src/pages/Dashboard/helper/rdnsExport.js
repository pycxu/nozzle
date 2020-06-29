const rdns = {

    hostnames: function(ip, callback){
        var dns = require('dns');
        dns.reverse(ip, function(err, domains){
            console.log("rdns node", domains);
            return callback(domains)
        })
    }
}

export default rdns;