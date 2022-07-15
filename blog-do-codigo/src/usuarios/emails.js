const nodemailer = require("nodemailer");

class Email {
  async enviaEmail() {
    const transportador = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "802ba43f96b6ac",
        pass: "0f93a369c44a6f",
      },
    });

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

module.exports = { EmailVerificacao };
