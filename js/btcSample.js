const http = require('http');

const username = 'rpcuser';
const password = 'rpcpassword';
const auth = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');

const options = {
  hostname: 'localhost',
  port: 8332,
  path: '/',
  method: 'POST',
  headers: {
    'Authorization': auth,
    'Content-Type': 'application/json',
  },
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const result = JSON.parse(data);
    console.log(result.result.blocks);
  });
});

const body = JSON.stringify({
  jsonrpc: '2.0',
  method: 'getblockchaininfo',
  params: [],
  id: 1,
});

req.write(body);
req.end();
