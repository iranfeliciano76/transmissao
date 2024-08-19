// server.js

const express = require('express'); // Importa o express
const http = require('http'); // Importa o módulo http
const socketIo = require('socket.io'); // Importa o socket.io

const app = express(); // Cria uma instância do express
const server = http.createServer(app); // Cria o servidor HTTP
const io = socketIo(server); // Integra o Socket.IO ao servidor HTTP

// Define a pasta estática para servir os arquivos HTML
app.use(express.static(__dirname + '/public'));

// Rota principal (carrega o index.html)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Configura o WebSocket com Socket.IO
io.on('connection', (socket) => {
  console.log('Um cliente conectou:', socket.id);

  // Envia a oferta para o cliente
  socket.on('offer', (offer) => {
    console.log('Oferta recebida');
    socket.broadcast.emit('offer', offer);
  });

  // Envia a resposta para o cliente
  socket.on('answer', (answer) => {
    console.log('Resposta recebida');
    socket.broadcast.emit('answer', answer);
  });

  // Envia o candidato ICE para o cliente
  socket.on('candidate', (candidate) => {
    console.log('Candidato ICE recebido');
    socket.broadcast.emit('candidate', candidate);
  });

  // Desconexão do cliente
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// Inicia o servidor na porta 3000
server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
