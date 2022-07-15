module.exports = (client) => {
  if (!client.isReady) client.connect();

  return {
    async adiciona(chave, valor, dataExpiracao) {
      await client.set(chave, valor);
      await client.expireAt(chave, dataExpiracao);
    },

    async buscaValor(chave) {
      return client.get(chave);
    },

    async contemChave(chave) {
      const resultado = await client.exists(chave);

      return resultado === 1;
    },

    async deleta(chave) {
      await client.del(chave);
    },
  };
};
