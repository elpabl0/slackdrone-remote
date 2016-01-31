var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var port = process.env.PORT || 8080;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg)
  {
    io.emit('chat message', msg);
  });
});

app.post('/webhook', function(request, response){
  const payload = request.payload;
  //const slashCommand = payload.command.substr('1');
  commands.push(payload);
  io.sockets.emit('chat message', commands);
  response.send(request.payload);    // echo the result back

});

server.listen(port, function(){
  console.log('listening on '+ port);
});
