const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: BearerStrategy } = require("passport-http-bearer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Usuario = require("./usuarios-modelo");
const { InvalidArgumentError } = require("../erros");

const blacklist = require("../../redis/manipula-blacklist");

function verificaUsuario(usuario) {
  if (!usuario) {
    throw new InvalidArgumentError("Não existe usuário com esse e-mail.");
  }
}

async function verificaSenha(senha, senhaHash) {
  const senhaValida = await bcrypt.compare(senha, senhaHash);

  if (!senhaValida) {
    throw new InvalidArgumentError("E-mail ou senha inválidos.");
  }
}

async function verificaTokenNaBlacklist(token) {
  const tokenNaBlacklist = await blacklist.contemToken(token);

  if (tokenNaBlacklist) {
    throw new jwt.JsonWebTokenError("Token inválido por logout!");
  }
}

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "senha",
    session: false,
  },
  async (email, senha, done) => {
    try {
      const usuario = await Usuario.buscaPorEmail(email);

      verificaUsuario(usuario);
      await verificaSenha(senha, usuario.senhaHash);

      done(null, usuario);
    } catch (error) {
      done(error);
    }
  }
);

const bearerStrategy = new BearerStrategy(async (token, done) => {
  try {
    await verificaTokenNaBlacklist(token);

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = Usuario.buscaPorId(payload.id);

    done(null, usuario, { token });
  } catch (error) {
    done(error);
  }
});

passport.use(localStrategy);
passport.use(bearerStrategy);
