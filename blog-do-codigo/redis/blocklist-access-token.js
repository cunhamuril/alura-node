const redis = require("redis");
const jwt = require("jsonwebtoken");
const { createHash } = require("crypto");

const manipulaLista = require("./manipula-lista");

const blocklist = redis.createClient({
  prefix: "blocklist-access-token:",
  password: "eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81",
});

blocklist.on("error", (err) => console.log("Redis Client Error", err));

const manipulaBlockList = manipulaLista(blocklist);

function geraTokenHash(token) {
  return createHash("sha256").update(token).digest("hex");
}

module.exports = {
  async adiciona(token) {
    const dataExpiracao = jwt.decode(token).exp;
    const tokenHash = geraTokenHash(token);

    manipulaBlockList.adiciona(tokenHash, "", dataExpiracao);
  },
  async contemToken(token) {
    const tokenHash = geraTokenHash(token);

    return manipulaBlockList.contemChave(tokenHash);
  },
};
