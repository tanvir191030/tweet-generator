const https = require('https');

const apiKey = "AIzaSyBSXiwvwPQTleh3FfSUkj8IDGbfYRq5Uy0";
const model = "gemini-flash-latest"; // Trying the standard model again

const data = JSON.stringify({
    contents: [{ parts: [{ text: "Respond with 'Key is working'." }] }]
});

const options = {
    hostname: 'generativelanguage.googleapis.com',
    path: `/v1beta/models/${model}:generateContent?key=${apiKey}`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        if (res.statusCode === 200) {
            console.log("SUCCESS: New key is working!");
        } else {
            console.log(`Response: ${body}`);
        }
    });
});

req.write(data);
req.end();
