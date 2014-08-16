var connect = require('connect');
connect.createServer(
    connect.static('src')
).listen(3030);