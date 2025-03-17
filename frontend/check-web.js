// Simple script to check if the web version is working
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 8081,  // Update this to match the port your Expo web server is running on
  path: '/',
  method: 'GET'
};

console.log('Checking if web version is working...');

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  
  if (res.statusCode === 200) {
    console.log('Web version is working! 🎉');
  } else {
    console.log('Web version returned a non-200 status code.');
  }
  
  res.on('data', () => {});
  
  res.on('end', () => {
    console.log('Response ended');
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.end(); 