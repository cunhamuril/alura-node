const http = require("http");

const port = 3000;

const routes = {
  "/": "Curso de Node",
  "/books": "Entrei na página de livros",
  "/authors": "Listagem de autores",
  "/publisher": "Página da editora",
  "/about": "Info sobre projeto",
};

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(routes[req.url]);
});

server.listen(port, () => {
  console.log(`Server listen in http://localhost:${port}`);
});
