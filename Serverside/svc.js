var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
    name:'CyberUp',
    description: 'CyberUp  web server.',
    script: 'C:\\Users\\Administrator\\Desktop\\AngularUp\\cyberUp\\Serverside\\bin\\www'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
    svc.start();
});

svc.install();