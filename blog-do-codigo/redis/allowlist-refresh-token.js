const redis = require("redis");

const manipulaList = require("./manipula-lista");

const allowlist = redis.createClient({
  prefix: "allowlist-refresh-token:",
  password: "eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81",
});

allowlist.on("error", (err) => console.log("Redis Client Error", err));

module.exports = manipulaList(allowlist);
