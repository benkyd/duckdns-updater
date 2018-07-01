const request = require('snekfetch');
const fs = require('fs');

let verbose = false;

if (process.argv.indexOf('-v') >= 0 || process.argv.indexOf('--verbose') >= 0) {
  verbose = true;
}

let config = {};
if (!fs.existsSync('./config.json')) {
    config = {
        id: 'DOMAIN (IF MULTIPLE, SEPERATE WITH A COMMA)',
        token: 'TOKEN',
        ip: 'IP TO POINT TO  (LEAVE BLANK IF YOU WANT IT TO POINT TO THIS IP)',
        delay: 120000
    }

    fs.writeFileSync('./config.json', JSON.stringify(config));
    console.log('Edit the newly generated config.json');
    process.exit(-1);
} else {
    config = JSON.parse(fs.readFileSync('./config.json'));
}

if (verbose === true) {
    log(`Delay set to ${config.delay}`);
    if (config.ip) {
      log(`Pointed ip is ${config.ip}`);
    }
    else {
      log('Pointed ip is current ip');
    }
    log('Started in verbose mode');
}

async function update() {
    if (verbose) {
        log('Attempting GET request.');
    }
    try {
        let req = request.get('https://www.duckdns.org/update');
        req.query('domains', config.id);
        req.query('token', config.token);

        if (config.ip !== '') {
            req.query('ip', config.ip);
        }
        
        let res = await req.send();

        if (verbose) {
            log(`Server response : ${Buffer.from(res.body, 'hex').toString()}`);
        }
    } catch (e) {
        if (verbose) {
            console.log(e);
        }
    }
}

function log(message) {
    let date = new Date();
    console.log('[' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '] ' + message);
}

setInterval(update, config.delay);