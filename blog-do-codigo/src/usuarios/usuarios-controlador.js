require("dotenv").config();

const { NotFoundError } = require("../erros");

const Usuario = require("./usuarios-modelo");
const tokens = require("./tokens");
const { EmailVerificacao, EmailRedefinicaoSenha } = require("./emails");

function geraEndereco(rota, token) {
  const baseURL = process.env.BASE_URL;

  return `${baseURL}${rota}/${token}`;
}

module.exports = {
  async adiciona(req, res, next) {
    const { nome, email, senha, cargo } = req.body;

    try {
      const usuario = new Usuario({
        nome,
        email,
        emailVerificado: false,
        cargo,
      });

      await usuario.adicionaSenha(senha);
      await usuario.adiciona();

      const token = tokens.verificacaoEmail.cria(usuario.id);
      const endereco = geraEndereco("/usuario/verifica_email", token);
      const emailVerificacao = new EmailVerificacao(usuario, endereco);

      emailVerificacao.enviaEmail().catch(console.log);

      res.status(201).json();
    } catch (erro) {
      next(erro);
    }
  },

  async login(req, res, next) {
    try {
      const accessToken = tokens.access.cria(req.user.id);
      const refreshToken = await tokens.refresh.cria(req.user.id);

      res.set("Authorization", accessToken);
      res.status(200).json({ refreshToken });
    } catch (erro) {
      next(erro);
    }
  },

  async logout(req, res, next) {
    try {
      const token = req.token;

      await tokens.access.invalida(token);

      res.status(204).json();
    } catch (erro) {
      next(erro);
    }
  },

  async lista(req, res, next) {
    try {
      const usuarios = await Usuario.lista();
      res.json(usuarios);
    } catch (erro) {
      next(erro);
    }
  },

  async verificaEmail(req, res, next) {
    try {
      const usuario = req.user;

      await usuario.verificaEmail();

      res.status(200).json();
    } catch (error) {
      next(erro);
    }
  },

  async deleta(req, res, next) {
    try {
      const usuario = await Usuario.buscaPorId(req.params.id);
      await usuario.deleta();
      res.status(200).json();
    } catch (erro) {
      next(erro);
    }
  },

  async esqueciMinhaSenha(req, res, next) {
    const respostaPadrao =
      "Se encontrarmos um usuário com este e-mail, vamos enviar uma mensagem com as instruções para redefinir a senha.";

    try {
      const { email } = req.body;
      const usuario = await Usuario.buscaPorEmail(email);

      const token = tokens.redefinicaoSenha.cria(usuario.id);
      const endereco = geraEndereco("/usuario/redefinir-senha", token);

      const emailRedefinicaoSenha = new EmailRedefinicaoSenha(
        usuario,
        endereco
      );
      await emailRedefinicaoSenha.enviaEmail();

      res.send({ mensagem: respostaPadrao });
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.send({ mensagem: respostaPadrao });

        return;
      }

      next(error);
    }
  },

  async redefineSenha(req, res, next) {
    const { senha, confirmacaoSenha } = req.body;

    if (senha !== confirmacaoSenha) {
      return res.status(401).json({ mensagem: "As senhas não coincidem" });
    }

    try {
      const usuario = req.user;

      await usuario.redefineSenha(senha);

      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  },
};
