const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const url = require('url');
const { parse } = require('path');

http.createServer((req, res) => {

    if(req.method == 'POST' && req.url == '/submit')
        {
            console.log('Request URL:', req.url);
            let inf = '';
            req.on('data', buff =>{
                inf += buff.toString();
            })
    
            req.on('end', () => {
    
                var parseData = querystring.parse(inf);

                var path = 'inf.txt';
                var body = JSON.stringify(parseData, null, 2);

                fs.writeFile(path, body, (err) => {
                    if (err) throw err;
                   
                  }); 

                fs.readFile(path, function(err, data){
                    if(err){
                        console.log(err);
                        res.writeHead(404, { 'Content-Type' : 'text/plain'});
                        res.end('Not Found!');
                    }
                    else{
                       
                        res.writeHead(200, { 'Content-Type' : 'text/txt'});
                        res.write('Success!');
                        console.log(`login: ${parseData.eml}`);
                        console.log(`password: ${parseData.pswrd}`);
                    
                        console.log(`Авторизация выполнена успешно!`);
                        res.end();
                    }
                })
            })
        
    }else
    {
        var path = 'index.html';

        fs.readFile(path, function(err, data){
            if(err){
                console.log(err);
                res.writeHead(404, { 'Content-Type' : 'text/html'});
                res.end('Not Found!');
            }
            else{
                res.writeHead(200, { 'Content-Type' : 'text/html'});
                res.write(data.toString());
                //console.log('data was sent!');
                res.end();
            }
        })
    }


}).listen(8040, function(){
    console.log('Server starting!');
})