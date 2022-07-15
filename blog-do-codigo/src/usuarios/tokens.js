const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const moment = require("moment");

const allowlistRefreshToken = require("../../redis/allowlist-refresh-token");
const blocklistAccessToken = require("../../redis/blocklist-access-token");

const { InvalidArgumentError } = require("../erros");

/**
 * ACCESS TOKEN
 */
function criaTokenJWT(id, [tempoQuantidade, tempoUnidade]) {
  const payload = { id };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: tempoQuantidade + tempoUnidade,
  });
  return token;
}

async function verificaTokenNaBlocklist(token, nome, blocklist) {
  const tokenNaBlocklist = await blocklist.contemToken(token);
  if (tokenNaBlocklist) {
    throw new jwt.JsonWebTokenError(`${nome} inválido por logout!`);
  }
}

async function verificaTokenJWT(token, nome, blocklist) {
  if (blocklist) {
    await verificaTokenNaBlocklist(token, nome, blocklist);
  }

  const { id } = jwt.verify(token, process.env.JWT_SECRET);

  return id;
}

async function invalidaTokenJWT(token, blocklist) {
  await blocklist.adiciona(token);
}

/**
 * REFRESH TOKEN
 */
async function criaTokenOpaco(id, [tempoQuantidade, tempoUnidade], allowList) {
  const tokenOpaco = crypto.randomBytes(24).toString("hex");
  const dataExpiracao = moment().add(tempoQuantidade, tempoUnidade).unix();

  await allowList.adiciona(tokenOpaco, id, dataExpiracao);

  return tokenOpaco;
}

function verificaTokenEnviado(token, nome) {
  if (!token) {
    throw new InvalidArgumentError(`${nome} não enviado!`);
  }
}

function verificaTokenValido(id, nome) {
  if (!id) {
    throw new InvalidArgumentError(`${nome} é inválido!`);
  }
}

async function verificaTokenOpaco(token, nome, allowlist) {
  verificaTokenEnviado(token, nome);

  const id = await allowlist.buscaValor(token);

  verificaTokenValido(id, nome);

  return id;
}

async function invalidaTokenOpaco(token, nome, allowlist) {
  verificaTokenEnviado(token, nome);

  await allowlist.deleta(token);
}

module.exports = {
  access: {
    nome: "access token",
    lista: blocklistAccessToken,
    expiracao: [15, "m"],

    cria(id) {
      return criaTokenJWT(id, this.expiracao);
    },

    verifica(token) {
      return verificaTokenJWT(token, this.nome, this.lista);
    },

    invalida(token) {
      return invalidaTokenJWT(token, this.lista);
    },
  },

  refresh: {
    nome: "refresh token",
    lista: allowlistRefreshToken,
    expiracao: [5, "d"],

    cria(id) {
      return criaTokenOpaco(id, this.expiracao, this.lista);
    },

    verifica(token) {
      return verificaTokenOpaco(token, this.nome, this.lista);
    },

    invalida(token) {
      return invalidaTokenOpaco(token, this.nome, this.lista);
    },
  },

  verificacaoEmail: {
    nome: "token de verificacao de e-mail",
    expiracao: [1, "h"],

    cria(id) {
      return criaTokenJWT(id, this.expiracao);
    },

    verifica(token) {
      return verificaTokenJWT(token, this.nome);
    },
  },
};
