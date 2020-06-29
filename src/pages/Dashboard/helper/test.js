var dns = require('dns');
    dns.reverse('149.171.184.55', function(err, hostnames){
        console.log("dnsreverse", hostnames);
        
    }) 
    dns.lookupService('149.171.184.55', 42483, (err, hostnames, service)=>{
        console.log("dnslookupservice1: ",hostnames);
        console.log("dnslookupservice2: ",service);
    })

var whois = require('whois');

whois.lookup('149.171.184.55', (err, data)=>{
    console.log("whois",data)
})