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

app.route({
    method:'POST',
    path: '/webhook',
    handler: function(request, reply){
      const payload = request.payload;
      const slashCommand = payload.command.substr('1');

      commands.push(slashCommand);
      io.sockets.emit('commands', commands);

      reply();
    }
  });

server.listen(port, function(){
  console.log('listening on '+ port);
});
