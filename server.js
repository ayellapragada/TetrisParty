const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const UUID = require('node-uuid');
const gameport = process.env.PORT || 3000;
const verbose = false;

http.listen(gameport, () => {
  console.log('\t :: Express :: Train on port ' + gameport);
});


app.get('/*', function(req, res, next) {
  const file = req.params[0];

  if (verbose) console.log(`\t :: Express :: file requested : ` + file);

  res.sendFile(__dirname + '/' + file);
});

io.sockets.on('connection', function(client) {
  client.userid = UUID();
  client.emit('onconnected', { id: client.userid });

  console.log('\t socket.io:: player ' + client.userid + ' connected');

  client.on('disconnect', function() {
    console.log('\t socket.io:: player ' + client.userid + ' disconnected');
  });
});

