import http from 'http';

const req = http.get('http://localhost:5000', (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (e) => {
    console.error(`ERROR: ${e.message}`);
});
