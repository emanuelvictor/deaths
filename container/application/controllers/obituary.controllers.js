var http = require('http');

exports.get = async (req, res) => {

    try {

        var request = http.request({
            host: '152.67.60.189',
            port: 80,
            path: '/api/deaths/resume/123/123',
            method: 'GET',
            headers: {
                // headers such as "Cookie" can be extracted from req object and sent to /test
            }
        }, function (response) {
            console.log(response)
            var data = '';
            response.setEncoding('utf8');
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                // res.end('check result: ' + data);
                res.status(200).send(data)
            });
        });
        request.end();

    } catch (e) {
        res.status(500).send('Erro interno')
    }

};