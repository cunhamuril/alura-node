const passport = require("passport");

const middlewaresAutenticacao = require("../usuarios/middlewares-autenticacao");
const postsControlador = require("./posts-controlador");

module.exports = (app) => {
  app
    .route("/post")
    .get(postsControlador.lista)
    .post(middlewaresAutenticacao.bearer, postsControlador.adiciona);
};
