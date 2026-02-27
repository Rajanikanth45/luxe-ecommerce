import http from 'http';

const loginData = JSON.stringify({ email: 'admin@example.com', password: 'password123' }); // Try default passwords

const req = http.request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/users/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(loginData)
    }
}, (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        console.log('Login Result:', rawData);
        if (res.headers['set-cookie']) {
            console.log('Cookies:', res.headers['set-cookie']);
        }
    });
});

req.write(loginData);
req.end();
