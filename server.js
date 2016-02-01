var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var port = process.env.PORT || 8080;

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/webhook', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('payload', function(msg)
  {
    io.emit('payload', msg);
  });
});

app.post('/webhook', function(req, res){
  var payload = req.body;
  //const slashCommand = payload.command.substr('1');
  //commands.push(payload);
  io.sockets.emit('payload', payload);
  console.log("Payload = " + payload.text);
  res.end("Message Received...");

    //var botPayload = {
    //  text : 'Hello ' + userName + ', it worked!'
    //};
   //if (userName !== 'slackbot') {
  //   return response.status(200).json(botPayload);
   //} else {
    // return response.status(200).end();
   //}
  //
  //response.send(request);    // echo the result back

});

server.listen(port, function(){
  console.log('listening on '+ port);
});
