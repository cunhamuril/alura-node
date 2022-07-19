const nodemailer = require("nodemailer");

const configuracaoEmailProducao = {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USUARIO,
    pass: process.env.EMAIL_SENHA,
  },
  secure: true,
};

const configuracaoEmailTeste = (contaTeste) => ({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: contaTeste,
});

function criaConfiguraçãoEmail() {
  if (process.env.NODE_ENV === "production") {
    return configuracaoEmailProducao;
  } else {
    return configuracaoEmailTeste({
      user: "802ba43f96b6ac",
      pass: "0f93a369c44a6f",
    });
  }
}

class Email {
  async enviaEmail() {
    const configuracaoEmail = criaConfiguraçãoEmail();

    const transportador = nodemailer.createTransport(configuracaoEmail);

    transportador.sendMail(this);
  }
}

class EmailVerificacao extends Email {
  constructor(usuario, endereco) {
    super();

    this.from = '"Blog do Código" <noreply@blogdocodigo.com.br>';
    this.to = usuario.email;
    this.subject = "Verificação de E-mail";
    this.text = `Olá! Verifique seu e-mail aqui: ${endereco}`;
    this.html = `<h1>Olá</h1> Verifique seu e-mail aqui: <a href="${endereco}">${endereco}</a>`;
  }
}

class EmailRedefinicaoSenha extends Email {
  constructor(usuario, endereco) {
    super();

    this.from = '"Blog do Código" <noreply@blogdocodigo.com.br>';
    this.to = usuario.email;
    this.subject = "Redefinição de Senha";
    this.text = `Olá! Você pediu para redefinir sua senha: ${endereco}`;
    this.html = `<h1>Olá</h1> Você pediu para redefinir sua senha: <a href="${endereco}">${endereco}</a>`;
  }
}

module.exports = { EmailVerificacao, EmailRedefinicaoSenha };
